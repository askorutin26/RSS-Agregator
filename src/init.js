import app from './watcher.js';
import 'bootstrap';

const formContainer = document.querySelector('.rss-form');
const modalContainer = document.querySelector('div.modal.fade');
const rssContainer = document.querySelector('.rss-container');
const elements = [formContainer, modalContainer, rssContainer];
console.log('FORM IN INIT.JS');
console.log(formContainer);
console.log('MODAL');
console.log(modalContainer);
console.log('RSS');
console.log(rssContainer);
console.log('ELEMENTS');
console.log(elements);
app(elements);
