class Idea {
  constructor(title, body, id, star=false) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.star = star;
  }

  saveToStorage(ideaCards) {
    localStorage.setItem('ideaCard', JSON.stringify(ideaCards));
  }

  deleteFromStorage(ideaCards) {
    this.saveToStorage(ideaCards);
     if(ideaCards.length < 1) {
      localStorage.removeItem('ideaCard');
    }
  }
  
  updateIdea() {
    this.star = !this.star;
  }
}
