import app from './watcher.js';
import 'bootstrap';

const formContainer = document.querySelector('.rss-form');
const modalContainer = document.querySelector('div.modal.fade');
const rssContainer = document.querySelector('.rss-container');
const elements = [formContainer, modalContainer, rssContainer];
console.log(document.outerHTML);
app(elements);
