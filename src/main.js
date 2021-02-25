// Query Selectors
var titleInput = document.querySelector('#titleInput');
var bodyInput = document.querySelector('#bodyInput');
var saveButton = document.querySelector('#saveButton');
var searchInput = document.querySelector('#searchInput');
var searchButton = document.querySelector('#searchButton');
var bottomForm = document.querySelector('#bottomForm');


// Global Variables
var ideaCards = [];
var freshIdea;

// Event listeners
saveButton.addEventListener('click', buildIdeaCard);


// functions
function buildIdeaCard() {
  freshIdea = new Idea(titleInput.value, bodyInput.value);
  displayCard();
}

function displayCard() {
  bottomForm.innerHTML += `
  <article class="saved-card">
    <div class="card-top">
      <img class="active-star" src="./assets/star-active.svg" alt="active star">
      <img class="delete-card" src="./assets/delete.svg" alt="delete card">
    </div>
    <p class="idea-title">${freshIdea.title}</p>
    <p class="idea-body"> ${freshIdea.body}</p>
    <div class="card-bottom">
      <img src="./assets/comment.svg" alt="comment button">
      <label>Comment</label>
    </div>
  </article>
  `;
}

// build idea card
// - control flow for input values
// display idea Card if values in each input
// render to dom
// push new card made into ideaCards array
