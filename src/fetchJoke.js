import axios from 'axios';

const fetchJoke = () => {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  axios
    .get('https://icanhazdadjoke.com', config)
    .then((res) => (document.querySelector('#joke').innerHTML = res.data.joke));

  return 'I dont trust stairs. They are always up to sth';
};

export default fetchJoke;
