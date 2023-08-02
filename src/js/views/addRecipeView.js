import icons from '../../img/icons.svg'; // running parcel 1.
import icons from 'url:../../img/icons.svg'; // running parcel 2.
// import View from '../views/View.js';
// import * as model from '../model.js'
class addRecipeView{
    _parentElement = document.querySelector('.header');
    _overlay = document.querySelector('.overlay');
    _addRecipeWindow = document.querySelector('.add-recipe-window');
    _addRecipeButton = document.querySelector('.nav__btn--add-recipe');
    _closeWindowBtn = document.querySelector('.btn--close-modal');
    addHandler(handler){
        this._addRecipeButton.addEventListener('click',function(e){
            console.log(e.target.closest('.nav__btn--add-recipe'));
            console.log("HEELO",this._overlay);

            this._overlay.classList.toggle("hidden");
            this._addRecipeWindow.classList.toggle("hidden");
            handler();
        })
        this._closeWindowBtn.addEventListener('click',function(e){
            console.log(e.target);
            console.log(this._addRecipeWindow);
            console.log(this._overlay);
            this._addRecipeWindow.classList.toggle("hidden");
            this._overlay.classList.toggle("hidden");
        })
    }

} 
export default new addRecipeView();