const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
  <style>
    #btn {
        margin: 10px 0px;
        height: 40px;
        width: 100px;
        font-weight: bold;
    }
  </style>
    <button id=btn>A Button</button>
`;
export default class ButtonWrapper extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$btn = this.shadowRoot.getElementById("btn")
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "name") {
        this.$btn.innerHTML = newValue;
    }
  }
}

window.customElements.define("button-wrapper", ButtonWrapper);
