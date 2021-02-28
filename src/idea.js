class Idea {
  constructor(title, body, id) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.star = false;
  }

  saveToStorage(ideaCards) {
    localStorage.setItem('ideaCard', JSON.stringify(ideaCards));
  }

  deleteFromStorage(ideaCards) {
    if (ideaCards.length > 2) {
      console.log("if greater", ideaCards.length);
      localStorage.setItem('ideaCard', JSON.stringify(ideaCards))
    } else if (ideaCards.length === 1) {
      console.log("equal", ideaCards.length);
      localStorage.removeItem('ideaCard');
    }
  }
  updateIdea() {

  }
}
