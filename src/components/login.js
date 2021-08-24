import { onNavigate } from '../main.js';

export const login = () => {
  const html = `
  <div id="login-page">
     <form  id="login-form" class ="form-inicial">
       <h2 class="titles" id="title-form">¡Hola Green Friend!</h2>
       <img id="heart-movil" src="img/heart.png" alt="heart" />
       <label for="email">Correo electronico</label>
       <input type="email" id="login-email" />
       <label for="password">Contraseña</label>
       <input type="password" id="login-password" />
       <br>
       <button id="form-button" class="submit-btn">Enviar</button>
       <button id="btn-google"class="submit-btn google"><img src="img/google.png" alt="google" id="google-icon">Login</button>
     </form>
     <div class="img-register-desktop">
       <img id="heart" src="img/heart.png" alt="heart" />
     </div>
   </div>
  `;
  const divLogin = document.createElement('div');
  divLogin.innerHTML = html;
  const loginForm = divLogin.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = divLogin.querySelector('#login-email').value;
    const password = divLogin.querySelector('#login-password').value;
    console.log(email, password);

    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {

        onNavigate('/profile');

      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  })


  return divLogin;
};
