import * as model from "../model";

class searchView{
    _parentElement = document.querySelector('.search');

    getQuery(){
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearSearchBar();
        return query;
    }

    _clearSearchBar(){
        this._parentElement.querySelector('.search__field').value= '';
        model.state.search.page = 1;
    }

    addEventHandler(handler){
        
        this._parentElement.addEventListener("submit",function(e){
            e.preventDefault();
            console.log(model.state);
            handler();
        });
    }
};

export default new searchView();