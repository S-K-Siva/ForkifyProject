import icons from '../../img/icons.svg'; // running parcel 1.
import icons from 'url:../../img/icons.svg'; // running parcel 2.
export default class View{

    render(data){
       
        if(!data || Array.isArray(data.recipes) && data.recipes.length === 0) return this.renderError("No Recipe available to show!");
        this.data = data;
        const markup = this._generateMarkUp();
        console.log("THIIISS",this);
        this._clear();
       
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
        console.log("Element:",this._parentElement);
    }
    renderSpinner(){
  const markup = `
  <div class = "spinner">
  <svg>
    <use href = ${icons}#icon-loader>
    </use>
  </svg>
  </div>
  `;
  this._clear();
  this._parentElement.insertAdjacentHTML('afterbegin',markup);
}
renderError(error){
  const markup = `
  <div class = "error">
  <div>
  <svg>
    <use href = ${icons}#icon-alert-trangle>
    </use>
  </svg>
  </div>
  <p>${error}</p>
  </div>
  `;
  this._clear();
  this._parentElement.insertAdjacentHTML('afterbegin',markup);
}
    _clear(){
        
        this._parentElement.innerHTML = "";
    }
}
