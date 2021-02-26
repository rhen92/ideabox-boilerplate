// Query Selectors
var titleInput = document.querySelector('#titleInput');
var bodyInput = document.querySelector('#bodyInput');
var saveButton = document.querySelector('#saveButton');
var searchInput = document.querySelector('#searchInput');
var searchButton = document.querySelector('#searchButton');
var bottomForm = document.querySelector('#bottomForm');
var topForm = document.querySelector('#top');

// Global Variables
var ideaCards = [];
var freshIdea;

// Event listeners
window.addEventListener('load', function() {
  saveButton.disabled = true;
})

topForm.addEventListener('input', checkInputs);
saveButton.addEventListener('click', buildIdeaCard);

// functions
// function checkInputs() {
//   if (titleInput.value && bodyInput.value) {
//     saveButton.disabled = false;
//   }
// }

function buildIdeaCard() {
  event.preventDefault();
  freshIdea = new Idea(titleInput.value, bodyInput.value);
  addIdeaCards();
}

function addIdeaCards() {
  ideaCards.push(freshIdea);
  displayCard();
  clearInputs();
  // saveButton.disabled = true;
}

function displayCard() {
  bottomForm.innerHTML = '';
  for (var i = 0; i < ideaCards.length; i++) {
    bottomForm.innerHTML += `
  <article class="saved-card">
    <div class="card-top">
      <img class="active-star" src="./assets/star-active.svg" alt="active star">
      <img class="delete-card" src="./assets/delete.svg" alt="delete card">
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
