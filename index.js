const oppoStatus = [
  {
    K_OPPO_STATUS: 1,
    STATUS: "1. Initial Contact",
    SUCCESS: 0,
  },
  {
    K_OPPO_STATUS: 2,
    STATUS: "2. Demonstration",
    SUCCESS: 25,
  },
  {
    K_OPPO_STATUS: 3,
    STATUS: "3. Proposal",
    SUCCESS: 50,
  },
  {
    K_OPPO_STATUS: 4,
    STATUS: "4. Negotiation",
    SUCCESS: 75,
  },
  {
    K_OPPO_STATUS: 5,
    STATUS: "5. Order",
    SUCCESS: 100,
  },
];

const Module = class {
  constructor(data) {
    this.data = data;
    this.form = "form";
    this.input = "input";
    this.select = "select";
    this.option = "option";
  }
  start() {
    const dataArray = this.data;
    const selectElement = this.getHtmlElement(`${this.form} ${this.select}`);
    const inputElement = this.getHtmlElement(`${this.form} ${this.input}`);

    for (let i = 0; i < dataArray.length; i++) {
      // populate select element
      const optionElement = this.createElement(`${this.option}`);
      optionElement.textContent = dataArray[i].STATUS;
      optionElement.value = dataArray[i].SUCCESS;

      selectElement.appendChild(optionElement);

      this.onChangeSelect(selectElement, dataArray, inputElement);
    }
  }

  onExtractNumber(stringArg) {
    return parseInt(stringArg.match(/\d/g).join(""));
  }

  onSubmitForm(data) {
    const outputElement = this.getHtmlElement(".output");
    const form = this.getHtmlElement(`${this.form}`);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const { STATUS, SUCCESS } = data;

      outputElement.innerHTML = JSON.stringify({
        STATUS: this.onExtractNumber(STATUS),
        SUCCESS,
      });
    });
  }

  onChangeSelect(selectElement, dataArray, inputElement) {
    selectElement.onchange = (event) => {
      inputElement.value = event.target.value;

      const selectedNumber = this.onExtractNumber(
        event.target.options[event.target.selectedIndex].innerHTML
      );
      const objectResult = dataArray.find(
        (obj) => obj.K_OPPO_STATUS === selectedNumber
      );

      this.onSubmitForm(objectResult);
    };
  }

  createElement(htmlElement) {
    return document.createElement(htmlElement);
  }

  getHtmlElement(htmlElement) {
    return document.querySelector(htmlElement);
  }
};

const main = new Module(oppoStatus);
main.start();
