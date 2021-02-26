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
bottomForm.addEventListener('click', deleteIdea);

//functions
function checkInputs() {
  if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
  }
}

function buildIdeaCard() {
  event.preventDefault();
  freshIdea = new Idea(titleInput.value, bodyInput.value);
  addIdeaCards();
}

function addIdeaCards() {
  ideaCards.push(freshIdea);
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
      <img id="activeStar" class="active-star" src="./assets/star-active.svg" alt="active star">
      <input id="deleteCard" class="delete-card" type="image" src="./assets/delete.svg" name="delete" alt="delete idea"/>
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

function deleteIdea(event) {
  if (event.target.classList.contains('delete-card')) {
    event.target.closest('article').remove();
  }
}

// var savedCard = document.querySelector('.saved-card')

// savedCard.addEventListener('click', function(event) {
//  if (event.target.className === 'delete-card') {
//      event.target.closest('saved-card').remove();
// }
//})


// var delete = document.getElementById('delete-card');
// deleteCard.onclick = function () {
//     document.getElementById('saved-card').remove();
//     this.remove();
// };
