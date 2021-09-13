import { signIn, getUser } from '../lib/firebaseClient.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const login = () => {
  const html = `
  <header>
  <a href="/"><img src="img/logo-desktop.png" alt="logotipo" id="logoGF" /></a>
  <span class="menu-icon" id="users-icon"><img id="img-users" src="img/users.png" alt=""></span>
  <div class="div-navegation">
    <ul id="navegacion">
      <li><a><button class="blue btn-routing" id="btn-register" value='/register'>¡Regístrate!</button></a></li>
      <li><a><button class="blue btn-routing" id="btn-login" value='/login'>Iniciar Sesión</button></a></li>
    </ul>
  </div>
</header>
  <div id="login-page">
     <form  id="login-form" class ="form-inicial">
       <h2 class="titles" id="title-form">¡Hola Green Friend!</h2>
       <img id="heart-movil" src="img/heart.png" alt="heart" />
       <label for="email">Correo electrónico</label>
       <input type="email" id="login-email" placeholder='alguien@ejemplo.com'/>
       <label for="password">Contraseña</label>
       <div class = "show-passwords">
       <input type="password" id="login-password" placeholder="******"/>
       <span class = "eyes-login">
       <i id="show3" class="fas fa-eye" style="color: #0e6359;"></i>
       <i id="hide3" class="fas fa-eye-slash" style="color: #0e6359;"></i>
       </span>
       </div>
       <br>
       <p id="error-message"></p>
       <button id="form-button-login" class="submit-btn">Enviar</button>
       <button id="btn-google" class="submit-btn google">Entra con  <img src="img/google.png" alt="google" id="google-icon"></button>
     </form>
     <div class="img-register-desktop">
       <img id="heart" src="img/heart.png" alt="heart" />
     </div>
   </div>
  `;
  const divLogin = document.createElement('div');
  divLogin.innerHTML = html;

  const btnRegister = divLogin.querySelector('#btn-register');
  btnRegister.addEventListener('click', () => onNavigate('/register'));
  const btnLogin = divLogin.querySelector('#btn-login');
  btnLogin.addEventListener('click', () => onNavigate('/login'));

  // -------------------------------icon burguer
  divLogin.querySelector('#users-icon').addEventListener('click', () => {
    const mostrar = divLogin.querySelector('#navegacion').className;
    if (mostrar === '') {
      divLogin.querySelector('#navegacion').setAttribute('class', 'show');
    } else {
      divLogin.querySelector('#navegacion').removeAttribute('class', 'show');
    }
  });

  const loginForm = divLogin.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = divLogin.querySelector('#login-email').value;
    const password = divLogin.querySelector('#login-password').value;

    signIn(email, password)
      .then(() => {
        onNavigate('/wall');
        console.log(getUser());
      })
      .catch((error) => {
        const errorMessage = error.message;
        divLogin.querySelector('#error-message').innerHTML = errorMessage;
      });
  });
  // GOOGLE
  const auth = firebase.auth();
  const btnGoogle = divLogin.querySelector('#btn-google');
  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        console.log('Registro con google', result);
        onNavigate('/wall');
      })
      .catch((err) => { divLogin.querySelector('#error-message').innerHTML = err; });
  });
  // -------------------------------icon mostrar password de login
  divLogin.querySelector('.eyes-login').addEventListener('click', (e) => {
    e.preventDefault();
    const passwordInput = divLogin.querySelector('#login-password');
    const hide = divLogin.querySelector('#hide3');
    const show = divLogin.querySelector('#show3');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      hide.style.display = 'block';
      show.style.display = 'none';
    } else {
      passwordInput.type = 'password';
      hide.style.display = 'none';
      show.style.display = 'block';
    }
  });

  return divLogin;
};
