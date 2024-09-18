import icons from 'url:../../img/icons.svg';
export default class Views {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newEl = newDom.querySelectorAll('*');
    const curEl = this._parentEl.querySelectorAll('*');
    newEl.forEach((newEle, i) => {
      const curEle = curEl[i];
      if (
        !newEle.isEqualNode(curEle) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      ) {
        curEle.textContent = newEle.textContent;
      }
      if (!newEle.isEqualNode(curEle)) {
        Array.from(newEle.attributes).forEach(attr =>
          curEle.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  renderSpinner() {
    const markup = `
        <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
        </div>
    
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderError(message = this._error) {
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div> 
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div> 
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
