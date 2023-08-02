import icons from '../../img/icons.svg'; // running parcel 1.
import icons from 'url:../../img/icons.svg'; // running parcel 2.
import View from '../views/View.js';
import * as model from '../model.js'
class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addEventHandler(handler){

        document.querySelector('.pagination').addEventListener('click',function(e){
            const btnValue = e.target.closest('.btn--inline').dataset.goto;
            if(!btnValue) return;
            model.state.search.page = btnValue;
            handler();
        })
    }
    _generateMarkUp(){
      console.log("HERE:",this.data);
        const numPages = Math.ceil(this.data.result.data.recipes.length / this.data.resultsPerPage);
        //Page1, and there are other pages
        if (Number(this.data.page) === 1 && numPages > 1){
            return `
          <button data-goto=${Number(this.data.page) + 1} class="btn--inline pagination__btn--next">
            <span>${Number(this.data.page) + 1}</span>
            <svg class="search__icon">
              <use href="${icons}"></use>
            </svg>
          </button> `
        }
        //Page 1, and there are no other pages...

        //last page
        if(Number(this.data.page) === numPages){
            return `<button data-goto=${Number(this.data.page) - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}"></use>
            </svg>
            <span>${Number(this.data.page) - 1}</span>
          </button>`;
        }

        //other pages..
        if(Number(this.data.page) < numPages){
            return `<button data-goto=${Number(this.data.page) - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>${Number(this.data.page) - 1}</span>
          </button>
          <button data-goto=${Number(this.data.page)+ 1} class="btn--inline pagination__btn--next">
            <span>${Number(this.data.page) +1}</span>
            <svg class="search__icon">
              <use href="${icons}"></use>
            </svg>
          </button> `
        }

        return "";
    }
} 
export default new PaginationView();