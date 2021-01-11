import InputWrapper from "./InputWrapper.js";
import ButtonWrapper from "./ButtonWrapper.js";
import BookWrapper from "./BookWrapper.js";
import Book from "./Books.js";

const $bookContainer = document.getElementById("book-container");
const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
  <style>
    #add-book-form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }

    #add-book-form input-wrapper {
        margin: 5px 0px;
    }

  </style>
    <div id="add-book-form">
        <input-wrapper id="title" name="Title"></input-wrapper>
        <input-wrapper id="author" name="Author"></input-wrapper>
        <input-wrapper id="isbn" name="ISBN"></input-wrapper>       
    </div>
    <button-wrapper id="add-btn" name="Add"></button-wrapper>    
`;
export default class AddBookForm extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$addBookForm = this.shadowRoot.getElementById("add-book-form");
    this.$addBtn = this.shadowRoot.getElementById("add-btn");
    this.$titleInput = this.shadowRoot.getElementById("title");
    this.$authorInput = this.shadowRoot.getElementById("author");
    this.$isbnInput = this.shadowRoot.getElementById("isbn");
  }

  connectedCallback() {
    this.$addBtn.onclick = () => {
      const title = this.$titleInput.value();
      const author = this.$authorInput.value();
      const isbn = this.$isbnInput.value();
      if (title && author && isbn) {
        const book = new Book(title, author, isbn);
        this.renderBook(book);
        book.saveToLocal();
        this.clearForm();
      } else alert("Pls fill all the inputs!");
    };

    window.onload = () => {
      Object.keys(localStorage).forEach((key) => {
        const book = JSON.parse(localStorage.getItem(key));
        this.renderBook(book);
      });
    };
  }
  clearForm() {
    this.$titleInput.clear();
    this.$authorInput.clear();
    this.$isbnInput.clear();
  }

  renderBook(data) {
    const $newBook = new BookWrapper(data.title, data.author, data.isbn);
    $bookContainer.appendChild($newBook);
  }
}

window.customElements.define("add-book-form", AddBookForm);
