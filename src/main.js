// Query Selectors
var bodyInput = document.querySelector('#bodyInput');
var bottomForm = document.querySelector('#bottomForm');
var saveButton = document.querySelector('#saveButton');
var searchButton = document.querySelector('#searchButton');
var searchInput = document.querySelector('#searchInput');
var showStarredButton = document.querySelector('#showButton');
var starImage = document.querySelectorAll('.star');
var titleInput = document.querySelector('#titleInput');
var topForm = document.querySelector('#top');

// Global Variables
var freshIdea;
var ideaCards = [];
var starredIdeasArray = [];
var starSrc;
var starClass;
// Event listeners
window.addEventListener('load', function() {
  saveButton.disabled = true;
  showStorage();
})

topForm.addEventListener('input', checkInputs);
window.addEventListener('click', clickHandler);

searchInput.addEventListener('input', searchIdeas);
searchInput.addEventListener('keyup', clearSearch);
//Functions
function clickHandler(event) {
  event.preventDefault();
  if (event.target.classList.contains('delete-card')) {
    deleteIdea(event);
  } else if (event.target.id === 'saveButton') {
    buildIdeaCard(event);
  } else if (event.target.classList.contains('star')) {
    starIdea(event);
  } else if (event.target.id === 'showButton') {
    showStarredIdeas(event);
  }
}

function checkInputs() {
  if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
  }
}

function buildIdeaCard(event) {
  event.preventDefault();
  freshIdea = new Idea(titleInput.value, bodyInput.value);
  addIdeaCards();
}

function addIdeaCards() {
  ideaCards.push(freshIdea);
  freshIdea.saveToStorage(ideaCards);
  displayCard(ideaCards);
  clearInputs();
  saveButton.disabled = true;
}

function displayCard(array) {
  bottomForm.innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    if (array[i].star) {
      starSrc = './assets/star-active.svg';
      starClass = 'active'
    } else {
      starSrc = './assets/star.svg';
      starClass = 'inactive'
    }
    bottomForm.innerHTML += `
  <article class="saved-card">
    <div class="card-top">
      <img id="${array[i].id}" class= "${starClass} star" type="image" src=${starSrc} alt=${starClass}>
      <input id=${array[i].id} class="delete-card" type="image" src="./assets/delete.svg" name="delete" alt="delete idea"/>
    </div>
    <p class="idea-title">${array[i].title}</p>
    <p class="idea-body"> ${array[i].body}</p>
    <div class="card-bottom">
      <img src="./assets/comment.svg" alt="comment button">
      <label>Comment</label>
    </div>
  </article>
  `;
  }
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}

function updateArray(array) {
  var controller = new Idea();
  for (var i = 0; i < array.length; i++) {
    if (array[i].id === parseInt(event.target.id)) {
      array.splice(i, 1);
      controller.deleteFromStorage(ideaCards);
    }
  }
}

function deleteIdea(event) {
  if (event.target.classList.contains('delete-card')) {
    event.target.closest('article').remove();
  }
  updateArray(ideaCards);
  updateArray(starredIdeasArray);
}

function starIdea(event) {
  if (event.target.classList.contains('inactive')) {
    event.target.src = './assets/star-active.svg';
    event.target.classList.remove('inactive');
    event.target.classList.add('active');
    changeStar(event);
  } else if (event.target.classList.contains('active')) {
    event.target.src = './assets/star.svg';
    event.target.classList.remove('active');
    event.target.classList.add('inactive');
    changeStar(event);
  }
}

function changeStar(event) {
  for (var i = 0; i < ideaCards.length; i++) {
    if (ideaCards[i].id === parseInt(event.target.id)) {
      ideaCards[i].updateIdea();
      ideaCards[i].saveToStorage(ideaCards);
    }
  }
}

function showStorage() {
  var storage = JSON.parse(localStorage.getItem('ideaCard'));
  if (!storage) {
    return;
  }
  for (var i = 0; i < storage.length; i++) {
    ideaCards.push(new Idea(storage[i].title, storage[i].body, storage[i].id, storage[i].star))
  }
  displayCard(ideaCards);
}

function showStarredIdeas(event) {
  for (var i = 0; i < ideaCards.length; i++) {
    if (ideaCards[i].star && !starredIdeasArray.includes(ideaCards[i])) {
      starredIdeasArray.push(ideaCards[i]);
    }
  }
  buttonAction();
}

function buttonAction() {
  if (showStarredButton.innerText === 'Show Starred Ideas') {
    displayCard(starredIdeasArray);
    showStarredButton.innerText = 'Show All Ideas';
  } else {
    showStarredButton.innerText = 'Show Starred Ideas';
    displayCard(ideaCards);
  }
}

function searchIdeas(event) {
  event.preventDefault();
  if (searchInput.value === '') {
    displayCard(ideaCards);
  } else {
    var searchedIdeas = [];
    for (var i = 0; i < ideaCards.length; i++) {
      if (ideaCards[i].body.includes(searchInput.value) || ideaCards[i].title.includes(searchInput.value)) {
        searchedIdeas.push(ideaCards[i]);
      }
    }
    displayCard(searchedIdeas);
  }
}

function clearSearch() {
  if (searchInput.value === '') {
    displayCard(ideaCards);
  }
}
