import 'bootstrap';
import validateURL from './urlValidator.js';

console.log('Hello World! new String');
const input = document.querySelector('input.email');
console.log(input);
validateURL(input);

console.log('form');
