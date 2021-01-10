export default class Books {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    saveToLocal() {
        localStorage.setItem(this.title, JSON.stringify(this));
    }
}