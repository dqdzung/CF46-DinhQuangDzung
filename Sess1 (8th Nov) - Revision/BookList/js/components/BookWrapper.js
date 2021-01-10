const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
  <style>
    #container {
      display: flex;
      justify-content: space-between;
      width: 40%;
    }

    #container div {
      width: 300px;
    }
  </style>
  <div id=container>
    <div id="book-title">A Random book</div>
    <div id="book-author">John Smith</div>
    <div id="book-isbn">0-8998-1171-X</div>
  </div>
`;
export default class BookWrapper extends HTMLElement {
  constructor(title, author, isbn) {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$title = this.shadowRoot.getElementById("book-title");
    this.$author = this.shadowRoot.getElementById("book-author");
    this.$isbn = this.shadowRoot.getElementById("book-isbn");

    this.setAttribute("title", title);
    this.setAttribute("author", author);
    this.setAttribute("isbn", isbn);
  }

  static get observedAttributes() {
    return ["title", "author", "isbn"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case "title":
          this.$title.innerHTML = newValue;
        break;
      case "author":
          this.$author.innerHTML = newValue;
        break;
      case "isbn":
          this.$isbn.innerHTML = newValue;
        break;
    }
  }
}

window.customElements.define("book-wrapper", BookWrapper);
