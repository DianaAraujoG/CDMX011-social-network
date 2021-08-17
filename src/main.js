import template from './template.js';
// Este es el punto de entrada de tu aplicacion
console.log(template);
const database = firebase.firestore();
console.log(database);

// Routeo ----------------------------------------------------------------------------
const routes = {
  '/': template.home.template,
  '/register': template.register.template,
  '/login': template.login.template
}
const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = routes[pathname];
};
console.log(onNavigate);
// Este ayuda a llamar a la funcion apenas carge la pagina
//window.onload = onNavigate('/');
//window.history.go(1);

window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname];
};

const btnRouting = document.querySelectorAll('.btn-routing');
console.log(btnRouting);
for (let i = 0; i < btnRouting.length; i++) {
  btnRouting[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    onNavigate(btnRouting[i].value);
  });
}
