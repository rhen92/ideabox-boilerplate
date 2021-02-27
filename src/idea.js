class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.star = false;
  }

  saveToStorage(ideaCards) {
  localStorage.setItem('ideaCard', JSON.stringify(ideaCards));
  }

  deleteFromStorage() {

  }

  updateIdea() {

  }
}
