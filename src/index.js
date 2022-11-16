// import '../src/styles/style.css'
import '../src/styles/style.scss';

const TEL_INPUT = document.querySelector('#telephone');
const FORM = document.querySelector('form');
const BODY = document.querySelector('body');

TEL_INPUT.addEventListener('keyup', (e) => {
  if (e.target.value === '') {
    showMessage(false);
  }
});

FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.target[0].value);

  if (e.target[0].value === '' || e.target[0].value.length < 11) {
    showMessage(false);
  } else {
    showMessage(true);
    postData(e.target[0].value);
  }
});

const postData = async (data) => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'User Telephone',
      body: data,
      userId: 0,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

const showMessage = (status) => {
  const message = document.createElement('div');

  if (status === false) {
    message.classList.remove('successfull');
    message.classList.add('message', 'warning');
    message.innerText = 'Please, write your telephone number';
  } else if (status === true) {
    message.classList.remove('warning');
    message.classList.add('message', 'successfull');
    message.innerText = 'Your telephone is successfully added';
  }

  BODY.appendChild(message);

  setTimeout(() => {
    BODY.removeChild(message);
  }, 5000);
};
