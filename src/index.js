import 'bootstrap';
import * as yup from 'yup';

console.log('Hello World! new String');

const urlSchema = yup.string().url();
const form = document.querySelector('form.rss');
console.log(form);
