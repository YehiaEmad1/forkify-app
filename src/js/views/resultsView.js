import Views from './Views.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';
class ResultsView extends Views {
  _parentEl = document.querySelector('.results');
  _error = `no recipes found for your query`;
  _generateMarkup() {
    console.log(this._data);
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}
export default new ResultsView();
