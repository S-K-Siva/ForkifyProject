
import 'core-js/stable'; //polyfilling everything
import 'regenerator-runtime/runtime'; //pollyfilling async/await functions..
import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
//polyfilling means making sure that our appis working on old browser;
const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if(module.hot){
  module.hot.accept();
}
console.log("Success!");
//loading part...


const showRecipe = async function(){
  
  
  try{
    const id = window.location.hash;
    if(!id) return;
    console.log("ID:",id);
    recipeView.renderSpinner();
  //loading recipe
    await model.loadRecipe(id); // it returns promises
    const {recipe} = model.state;
    console.log(recipe);
    
    // rendering recipe
    recipeView.render(model.state.recipe);
    controllServings();
    //1) Loading Recipe
    //Efficient way to write... without using promises..
    // const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id.slice(1)}`);
    // const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes");
    // const JSONresponse = await response.json();
    // console.log(JSONresponse);
    //Non-Efficient way to write....
    // fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886")
    // .then(res => res.json())
    // .then(data => console.log(data));

    // Taking recipe seperate...


    // let {recipe} = JSONresponse.data;
    // recipe = {
    //   id:recipe.id,
    //   title:recipe.title,
    //   ingredients:recipe.ingredients,
    //   publisher:recipe.publisher,
    //   source_url:recipe.source_url,
    //   image_url:recipe.image_url,
    //   servings:recipe.servings,
    //   cooking_time:recipe.cooking_time,
    // };
    // console.log(recipe);
    //2) Rendering recipe.
    
    // recipeContainer.innerHTML = "";
    // recipeContainer.insertAdjacentHTML('afterbegin',html);
  }catch(err){
    recipeView.renderError(err);
  }
};
const searchRecipe=async function(){
  try{
    resultView.renderSpinner();

    const query = searchView.getQuery();
  console.log(query);
  await model.loadSearchResult(query);
  console.log(model.state.search.query);

  console.log("STATE:",model.state);

  //render results [model.state.search.result.data.recipes]
  const DATA = model.getSearchResultPage(model.state.search.page);
  console.log("paginatino result",DATA)
  resultView.render(DATA);

  paginationView.render(model.state.search);

  }
  catch(err){
    console.log(err);
  }
  
}

const paginationController = async function(){
  console.log(model.state.search.result);
  console.log("CurrentPage:",model.state.search.page);
  resultView.render(model.getSearchResultPage(model.state.search.page));
  paginationView.render(model.state.search);
  console.log("pagination button has been clicked!");
};
let add = 1;
const controllServings= function(condition){
  if(condition){
  add++;
  }else if(condition === false){
    add--;
  }
  if(add === 0){
    add = 1;
  }
  
   model.updateServings(add);
   
  recipeView.render(model.state.recipe);

}

const controlAddBookmark = function(){
  console.log(model.state);
  model.addBookMark(model.state.recipe);
  console.log(model.state.bookmarks);
  if (!model.state.recipeBookMarks.includes(model.state.recipe )){
    model.newlistBookMark(model.state.recipe);
  }else{
    console.log("YES");
  }
      
}

    _overlay = document.querySelector('.overlay');
    _addRecipeWindow = document.querySelector('.add-recipe-window');
    _addRecipeButton = document.querySelector('.nav__btn--add-recipe');
    _closeWindowBtn = document.querySelector('.btn--close-modal');
    _uploadBtn = document.querySelector(".upload__btn");
const init = () => {
recipeView.addBookMarkHandler(controlAddBookmark);
recipeView.addHandlerRender(showRecipe);
recipeView.addServingsHandler(controllServings);

searchView.addEventHandler(searchRecipe);
paginationView.addEventHandler(paginationController);
_closeWindowBtn.addEventListener('click',function(e){
  _addRecipeWindow.classList.toggle("hidden");
  _overlay.classList.toggle('hidden');
})
_uploadBtn.addEventListener("click",async function(e){
  e.preventDefault();
  const data = Object.fromEntries([...new FormData(document.querySelector('.upload'))]);
  try{
  await model.uploadRecipe(data);
  _addRecipeWindow.classList.toggle('hidden');
  _overlay.classList.toggle('hidden');
  }
  catch(err){
    console.error(err);
    recipeView.renderError(err);
  }
})
_addRecipeButton.addEventListener('click',function(e){
            _overlay.classList.toggle("hidden");
           _addRecipeWindow.classList.toggle("hidden");
    
        });
        _closeWindowBtn.addEventListener('click',function(e){
          
            _addRecipeWindow.classList.toggle("hidden");
            _overlay.classList.toggle("hidden");
        })
}
init();