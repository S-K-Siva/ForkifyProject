import icons from '../../img/icons.svg'; // running parcel 1.
import icons from 'url:../../img/icons.svg'; // running parcel 2.
import View from './View.js';
import * as model from '../model.js';
class RecipeView extends View{
    _parentElement = document.querySelector('.recipe');
    _data;
    // Subscriber-Publisher Pattern...
   
    addServingsHandler(handler){
      this._parentElement.addEventListener('click',function(e){
        const btn = e.target.closest('.btn--tiny');
        // const btn = e.target;
        console.log(model.state);
        console.log("HELLLLLLLOOOOOO",btn);
        if(btn && btn.classList.contains('btn--increase-servings')){
          handler(true);
        }else{
          handler(false);
        }
        
       
      })
    }
  addBookMarkHandler(handler){
    this._parentElement.addEventListener('click',function(e){
      const btn = e.target.closest('.btn--bookmark');
      
      handler();
    });
  }
  
 addHandlerRender(handler){
        ['hashchange','load'].forEach(element=>window.addEventListener(element,handler));
        
    }
    _generateMarkUp =() => 
        {
       const recipe = this.data;
        var n2f = require("num2fraction");
        if(model.state)
            
    return   `
    <figure class="recipe__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cooking_time}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--decrease-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${model.state.bookmarks.includes(this.data.id) ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(ing => {
            return `
                    <li class="recipe__ingredient">
                      <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                      </svg>
                    <div class="recipe__quantity">${ ing.quantity ?. ing?? n2f(ing.quantity)}</div>
                      <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                      </div>
                    </li>
                    `
          }
          ).join("")};
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
        }
    
}

export default new RecipeView;