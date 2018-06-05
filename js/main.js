import {changeScreen} from './util.js';
import introScreenElement from './intro-module.js';
import greetingScreenElement from './greeting-module.js';

changeScreen(introScreenElement);
document.addEventListener(`click`, (evt) => {
  let target = evt.target;
  let buttonBack = target.closest(`button.back`);

  if (buttonBack) {
    changeScreen(greetingScreenElement);
  }
});