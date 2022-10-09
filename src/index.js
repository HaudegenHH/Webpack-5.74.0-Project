import fetchJoke from './fetchJoke';
import './styles/main.scss';
import laughing from './assets/laughing.svg';

const laughImg = document.querySelector('#laugh-img');
laughImg.src = laughing;

const jokeBtn = document.querySelector('#joke-btn');
jokeBtn.addEventListener('click', fetchJoke);

addEventListener('DOMContentLoaded', fetchJoke);
