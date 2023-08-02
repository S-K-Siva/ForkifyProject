import View from './View.js';
import * as model from '../model.js';
import icons from '../../img/icons.svg'; // running parcel 1.
import icons from 'url:../../img/icons.svg'; // running parcel 2.
class resultView extends View{
    _parentElement = document.querySelector(".results");

    _generateMarkUp(){
        console.log("Executing...");
        console.log(model.state);
        console.log(this.data);
        return this.data.map(element => `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${element.id}">
              <figure class="preview__fig">
                <img src="${element.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${element.title}</h4>
                <p class="preview__publisher">${element.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
          `).join('');
    }
}

export default new resultView();