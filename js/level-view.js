import AbstractView from './abstract-view.js';

const GameMode = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3
};
export default class LevelView extends AbstractView {
  constructor(state, level, countOfQuestion) {
    super();
    this.state = state;
    this.level = level;
    this.countOfQuestion = countOfQuestion;
  }
  render() {
    if (this.countOfQuestion === GameMode.DOUBLE) {
      return `
  <div class="game">
    <p class="game__task">${this.state.taskTitle}</p>
    <form class="game__content">
    ${this.state.questions[this.level].imagesPathArray.map((it, index) => `
        <div class="game__option">
        <img src="${it}" alt="Option ${index + 1}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question${index + 1}" type="radio" value="${this.state.buttonsValue[0]}">
          <span>${this.state.buttonsName[0]}</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${index + 1}" type="radio" value="${this.state.buttonsValue[1]}">
          <span>${this.state.buttonsName[1]}</span>
        </label>
      </div>`).join(``)}
    </form>
  </div>`;
    } else if (this.countOfQuestion === GameMode.SINGLE) {
      return `
  <div class="game">
    <p class="game__task">${this.state.taskTitle}</p>
    <form class="game__content  game__content--wide">
    ${this.state.questions[this.level].imagesPathArray.map((it, index) => `
      <div class="game__option">
        <img src="${this.state.questions[this.level].imagesPathArray}" alt="Option ${index + 1}" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question${index + 1}" type="radio" value="${this.state.buttonsValue[0]}">
          <span>${this.state.buttonsName[0]}</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${index + 1}" type="radio" value="${this.state.buttonsValue[1]}">
          <span>${this.state.buttonsName[1]}</span>
        </label>
      </div>`).join(``)}
    </form>
  </div>`;
    } else if (this.countOfQuestion === GameMode.TRIPLE) {
      return `
  <div class="game">
      <p class="game__task">${this.state.taskTitle}</p>
      <form class="game__content  game__content--triple">
      ${this.state.questions[this.level].imagesPathArray.map((it, index) => `
          <div class="game__option">
            <img src="${it}" data-name="image${index + 1}" alt="Option 1" width="304" height="455">
          </div>`).join(``)}
      </form>
   </div>`;
    }
    return null;
  }
  onAnswer() {}
  bind() {
    const showScreenTrigger = this.element.querySelector(`.game__content`);
    let answerValue;
    let answerKey;
    if (this.countOfQuestion === GameMode.TRIPLE) {
      showScreenTrigger.addEventListener(`click`, (evt) => {
        if (evt.target.classList.contains(`game__option`)) {
          answerKey = evt.target.querySelector(`img`).getAttribute(`data-name`);
          answerValue = `paint`;
          this.onAnswer(answerKey, answerValue);
        }
      });
    } else {
      showScreenTrigger.addEventListener(`change`, (evt) => {
        answerKey = evt.target.getAttribute(`name`);
        answerValue = evt.target.value;
        this.onAnswer(answerKey, answerValue);
      });
    }
  }
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`div`);
    this._element.innerHTML = this.render().trim();
    this.bind();
    return this._element;
  }
}
