import Views from './Views.js';
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends Views {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overly = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded';
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWidow() {
    this._overly.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWidow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWidow.bind(this));
    this._overly.addEventListener('click', this.toggleWidow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const datArr = [...new FormData(this)];
      const data = Object.fromEntries(datArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}
export default new AddRecipeView();
