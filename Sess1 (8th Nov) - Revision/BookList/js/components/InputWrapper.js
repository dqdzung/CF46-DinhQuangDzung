const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
  <style>
      #input {
          width: 100%;
      }
  </style>
    <input id="input" type="text"/>
`;
export default class InputWrapper extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$input = this.shadowRoot.getElementById("input")
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "name") {
        this.$input.setAttribute("placeholder",newValue);
    }
  }

  value() {
      return this.$input.value;
  }

  clear() {
      this.$input.value = "";
  }
}

window.customElements.define("input-wrapper", InputWrapper);
