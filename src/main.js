// Query Selectors
var bodyInput = document.querySelector('#bodyInput');
var bottomForm = document.querySelector('#bottomForm');
var saveButton = document.querySelector('#saveButton');
var searchButton = document.querySelector('#searchButton');
var searchInput = document.querySelector('#searchInput');
var titleInput = document.querySelector('#titleInput');
var topForm = document.querySelector('#top');

// Global Variables
var ideaCards = [];
var freshIdea;
// Event listeners
window.addEventListener('load', function() {
  saveButton.disabled = true;
  showStorage();
})

topForm.addEventListener('input', checkInputs);
window.addEventListener('click', clickHandler);

//functions
function clickHandler(event) {
  event.preventDefault();
  if (event.target.classList.contains('delete-card')) {
    deleteIdea(event);
    updateArray(event);
  } else if (event.target.id === 'saveButton') {
    buildIdeaCard(event);
  } else if (event.target.classList.contains('star')) {
    starIdea(event);
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
  displayCard();
  clearInputs();
  saveButton.disabled = true;
}

function displayCard() {
  bottomForm.innerHTML = '';
  for (var i = 0; i < ideaCards.length; i++) {
    bottomForm.innerHTML += `
  <article class="saved-card">
    <div class="card-top">
      <img id="inactiveStar" class="inactive star" type="image" src="./assets/star.svg" alt="inactive star">
      <input id=${ideaCards[i].id} class="delete-card" type="image" src="./assets/delete.svg" name="delete" alt="delete idea"/>
    </div>
    <p class="idea-title">${ideaCards[i].title}</p>
    <p class="idea-body"> ${ideaCards[i].body}</p>
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

function updateArray(event) {
  for (var i = 0; i < ideaCards.length; i++) {
    if (ideaCards[i].id === parseInt(event.target.id)) {
      // ideaCards[i].deleteFromStorage(ideaCards);
      ideaCards.splice(i, 1);
      ideaCards[i].deleteFromStorage(ideaCards);
    }
  }
}

function deleteIdea(event) {
  if (event.target.classList.contains('delete-card')) {
    event.target.closest('article').remove();
  }
}

function starIdea(event) {
  if (event.target.classList.contains('inactive')) {
    event.target.src = './assets/star-active.svg';
    event.target.classList.remove('inactive');
    event.target.classList.add('active');
  } else if (event.target.classList.contains('active')) {
    event.target.src = './assets/star.svg';
    event.target.classList.remove('active');
    event.target.classList.add('inactive');
  }
}

function showStorage() {
    var storage = JSON.parse(localStorage.getItem('ideaCard'));
    for(var i = 0; i < storage.length; i++) {
      ideaCards.push(new Idea(storage[i].title, storage[i].body))
    }
    displayCard();
  }
