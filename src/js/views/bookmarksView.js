import Views from './Views.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
class BookmarkView extends Views {
  _parentEl = document.querySelector('.bookmarks__list');
  _error = `No bookmarks yet`;
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}
export default new BookmarkView();
