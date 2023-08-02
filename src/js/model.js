import { async } from 'regenerator-runtime';
import * as config from './config.js';
import * as helper from './helpers.js';
import recipeView from '../js/views/recipeView.js';
// import icons from '../../img/icons.svg'; // running parcel 1.
import icons from 'url:../img/icons.svg'; // running parcel 2.
// import {addBookMarkInList} from './views/navbar.js'
export const state = {
    recipe:{},
    bookmarks:[],
    recipeBookMarks:[],
    search:{
        query:"",
        result:[],
        resultsPerPage:10,
        page: 1
    }
};

export const loadRecipe = async function(id){
    try{
      const JSONResponse = await helper.getJSON(`${config.API_URL}/${id.slice(1)}`);
      let {recipe} = JSONResponse.data;
        state.recipe = {
      id:recipe.id,
      title:recipe.title,
      ingredients:recipe.ingredients,
      publisher:recipe.publisher,
      source_url:recipe.source_url,
      image_url:recipe.image_url,
      servings:recipe.servings,
      cooking_time:recipe.cooking_time,
    };
}catch(err){
    recipeView.renderError(err);
}

}

export const loadSearchResult = async function(query){
    try{
        console.log("Query:",query);
        state.search.query = query;
        const data = await helper.getJSON(`${config.API_URL}?search=${query}`);
        console.log(data);
        state.search.result = data;
        return data;
    }
    catch(err){
        recipeView.renderError(err);
        throw err;
    }
}

export const getSearchResultPage = function(page = state.search.page){
    console.log("STATES:",state);
    console.log(state.search.page,state.search.resultsPerPage);
    const start = (state.search.page-1)  * state.search.resultsPerPage;
    const end = state.search.page * state.search.resultsPerPage;
    console.log("Start:",start," end:",end);
    try{
        console.log("SLICED DATA",[...state.search.result.data.recipes].slice(start,end));
    return [...state.search.result.data.recipes].slice(start,end);
    }catch(err){
        recipeView.renderError(err);
    }
}

export const updateServings = function(servings){
    if(!state.recipe.ingredients) return;
    [...state.recipe.ingredients].forEach(element => {
        element.quantity = (element.quantity * servings) / state.recipe.servings;
    });
    state.recipe.servings = servings;
};

export const listBookMark = function(recipe = false){
    if(recipe)
        state.recipeBookMarks.push(recipe);
    console.log("Triggered!");
    // const Index = state.recipes.findIndex(rec => rec.id === recipe.id);
    const bookMarkList = document.querySelector('.bookmarks__list');
    console.log(bookMarkList);
    if(state.recipeBookMarks.length !== 0){
        if(bookMarkList.querySelector('.message'))
            bookMarkList.querySelector('.message').style.display = "none";
    }
    const html = [...state.recipeBookMarks].map(recipe =>`<li class="preview">
                    <a class="preview__link" href="#${recipe.id}">
                      <figure class="preview__fig">
                        <img src="${recipe.image_url}" alt="Test" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                            ${recipe.title}
                        </h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                      </div>
                    </a>
                  </li>`
    ).join('');
    console.log(html);
    bookMarkList.insertAdjacentHTML('beforebegin',html);
    
}
export const newlistBookMark = function(recipe = false){
    console.log("Triggered!");
    // const Index = state.recipes.findIndex(rec => rec.id === recipe.id);
    const bookMarkList = document.querySelector('.bookmarks__list');
    console.log(bookMarkList);
    if(state.recipeBookMarks.length !== 0){
        if(bookMarkList.querySelector('.message'))
            bookMarkList.querySelector('.message').style.display = "none";
    }
    if(recipe){
        state.recipeBookMarks.push(recipe);
        const html = `<li class="preview">
                    <a class="preview__link" href="#${recipe.id}">
                      <figure class="preview__fig">
                        <img src="${recipe.image_url}" alt="Test" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                            ${recipe.title}
                        </h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                      </div>
                    </a>
                  </li>`

    bookMarkList.insertAdjacentHTML('beforebegin',html);
        }else{

        

    
    const html = [...state.recipeBookMarks].map(recipe =>`<li class="preview">
                    <a class="preview__link" href="#${recipe.id}">
                      <figure class="preview__fig">
                        <img src="${recipe.image_url}" alt="Test" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                            ${recipe.title}
                        </h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                      </div>
                    </a>
                  </li>`
    ).join('');
    console.log(html);
    bookMarkList.insertAdjacentHTML('beforebegin',html);
    
}
}
export const addBookMark = function(recipe) {
    
  
    if(recipe.id === state.recipe.id && !state.recipe.bookmarked){
        state.recipe.bookmarked = true;
        recipe.bookmarked = true;
        console.log(recipe);
        state.bookmarks.push(recipe.id);
        // state.recipeBookMarks.push(recipe);
        // this.listBookMark(recipe);
        persistBookmarks();
    }
    
}
const persistBookmarks = function(){
    localStorage.setItem('recipeBookMarks',JSON.stringify(state.recipeBookMarks));
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
};

const init = function(){
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if(bookmarks){
        state.bookmarks = bookmarks;
    }
    const recipeBookmarks = JSON.parse(localStorage.getItem('recipeBookMarks'));
    if(recipeBookmarks) state.recipeBookMarks = recipeBookmarks;
    newlistBookMark();
}
init();

export const uploadRecipe = async function(newRecipe){
    try{
    const ingredients = Object.entries(newRecipe).filter(entry=>entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing=>{
        
        if(ing[1].replaceAll(' ','').split(',') > 3){ throw new Error("Wrong ingredient format ! Please use the correct format!")};
        const [quantity,unit,description] = ing[1].replaceAll(' ','').split(',')
        return {quantity : quantity?+quantity:null,unit,description};
    });
    console.log(ingredients);
    console.log(newRecipe);
    const recipe = {
      title:newRecipe.title,
      ingredients,
      publisher:newRecipe.publisher,
      source_url:newRecipe.sourceUrl,
      image_url:newRecipe.image,
      servings:newRecipe.servings,
      cooking_time:newRecipe.cookingTime,
      key:config.API_KEY,
};
console.log(recipe);
console.log("NEW RECIPE :",recipe);
const data = await helper.sendJSON(`${config.API_URL}?key=${config.API_KEY}`,recipe);
const sendRecipe = {
     id : data.data.recipe.id,
      title:data.data.recipe.title,
      ingredients: data.data.recipe.ingredients,
      publisher:data.data.recipe.publisher,
      source_url:data.data.recipe.sourceUrl,
      image_url:data.data.recipe.image,
      servings:data.data.recipe.servings,
      cooking_time:data.data.recipe.cookingTime,
      key:data.data.recipe.key,
};
console.log(sendRecipe);
if(!state.bookmarks.includes(sendRecipe.id))
{
state.bookmarks.push(sendRecipe.id);
addBookMark(sendRecipe);

newlistBookMark(sendRecipe);
}
}catch(err){
    throw err;
}

}