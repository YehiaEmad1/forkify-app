import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    //1) loading recipe
    await model.loadRecipe(id);
    //2) rendering recipe
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmark);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goto) {
  resultsView.render(model.getSearchResultsPage(goto));
  paginationView.render(model.state.search);
};
const controlServings = function (servings) {
  model.updateServings(servings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlBookmark = function () {
  if (!model.state.recipe.bookmark) model.addBookmarks(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmark);
};
const controlHandlerBookmarks = function () {
  bookmarksView.render(model.state.bookmark);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmark);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(() => {
      addRecipeView.toggleWidow();
    }, 1500);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlHandlerBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
