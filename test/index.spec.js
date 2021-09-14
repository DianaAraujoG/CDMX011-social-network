/**
 * @jest-environment jsdom
 */
import './global/firebase.js';
// import './global/firebaseRegister.js';
import { home } from '../src/components/home.js';
import { login } from '../src/components/login.js';
import { register } from '../src/components/register.js';
import { post } from '../src/components/createPost.js';

describe('Coleccion de test sobre HOME', () => { // ----HOME---------------------------------------------------
  const homeRender = home();
  document.body.innerHTML = '<div id="root"></div>';
  test('should render', () => {
    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(homeRender);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
  test('Button register', () => {
    const btnRegister = homeRender.querySelector('#btn-register');
    btnRegister.click();
    expect(btnRegister.outerHTML).toBe('<button class="blue btn-routing" id="btn-register" value="/register">¡Regístrate!</button>');
  });
  test('Icon Burguer', () => {
    const btnIcon = homeRender.querySelector('#users-icon');
    btnIcon.click();
    expect(btnIcon.outerHTML).toBe('<span class="menu-icon" id="users-icon"><img id="img-users" src="img/users.png" alt=""></span>');
  });
  test('Remove show de Icon Burguer', () => {
    const btnIcon = homeRender.querySelector('#users-icon');
    btnIcon.click();
    btnIcon.click();
    expect(btnIcon.outerHTML).toBe('<span class="menu-icon" id="users-icon"><img id="img-users" src="img/users.png" alt=""></span>');
  });
});

describe('Coleccion de test sobre LOGIN', () => { // -------LOGIN----------------------------------------------
  document.body.innerHTML = '<div id="root"></div>';
  const component = login();
  test('should render', () => {
    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(component);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
  test('should logIn user when the submit button is clicked', () => {
    const mockLogin = jest.fn();
    mockLogin.mockImplementation(() => Promise.resolve());

    firebase.auth = jest.fn().mockImplementation(() => ({
      signInWithEmailAndPassword: mockLogin,
    }));
    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(component);

    const email = 'test@laboratoria.la';
    const password = '123456';
    document.getElementById('login-email').value = email;
    document.getElementById('login-password').value = password;

    document.getElementById('form-button-login').click();

    expect(mockLogin).toHaveBeenCalledWith(email, password);
  });
  test('Icon Burguer', () => {
    const btnIcon = component.querySelector('#users-icon');
    btnIcon.click();
    expect(btnIcon.outerHTML).toBe('<span class="menu-icon" id="users-icon"><img id="img-users" src="img/users.png" alt=""></span>');
  });
  test('Remove show de Icon Burguer LOGIN', () => {
    const btnIcon = component.querySelector('#users-icon');
    btnIcon.click();
    expect(btnIcon.outerHTML).toBe('<span class="menu-icon" id="users-icon"><img id="img-users" src="img/users.png" alt=""></span>');
  });
  test('Eyes opened show password', () => {
    const btnEyes = component.querySelector('.eyes-login');
    btnEyes.click();
    expect(btnEyes.outerHTML).toBe(
      `<span class="eyes-login">
       <i id="show3" class="fas fa-eye" style="color: rgb(14, 99, 89); display: none;"></i>
       <i id="hide3" class="fas fa-eye-slash" style="color: rgb(14, 99, 89); display: block;"></i>
       </span>`,
    );
  });
  test('Eyes NO SHOW', () => {
    const btnEyes = component.querySelector('.eyes-login');
    btnEyes.click();
    expect(btnEyes.outerHTML).toBe(
      `<span class="eyes-login">
       <i id="show3" class="fas fa-eye" style="color: rgb(14, 99, 89); display: block;"></i>
       <i id="hide3" class="fas fa-eye-slash" style="color: rgb(14, 99, 89); display: none;"></i>
       </span>`,
    );
  });
});

describe('Coleccion de test soble REGISTER', () => { // -------REGISTER-------------------------------------------
  document.body.innerHTML = '<div id="root"></div>';
  const component = register();
  test('should render', () => {
    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(component);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
  test('should logIn user when the submit button is clicked', () => {
    const mockRegister = jest.fn();
    mockRegister.mockImplementation(() => Promise.resolve());

    firebase.auth = jest.fn().mockImplementation(() => ({
      createUserWithEmailAndPassword: mockRegister,
    }));
    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(component);

    const email = 'test@laboratoria.la';
    const password = '123456';
    const confirmPassword = '123456';
    document.getElementById('user-email').value = email;
    document.getElementById('user-password').value = password;
    document.getElementById('confirm-password').value = confirmPassword;

    document.getElementById('form-button-register').click(); // Aqui llaama al form de Login
    expect(mockRegister).toHaveBeenCalledWith(email, password);
  });
  test('Icon Burguer', () => {
    const btnIcon = component.querySelector('#users-icon');
    btnIcon.click();
    expect(btnIcon.outerHTML).toBe('<span class="menu-icon" id="users-icon"><img id="img-users" src="img/users.png" alt=""></span>');
  });
  test('Remove show de Icon Burguer REGISTER', () => {
    const btnIcon = component.querySelector('#users-icon');
    btnIcon.click();
    console.log(btnIcon.outerHTML);
    expect(btnIcon.outerHTML).toBe('<span class="menu-icon" id="users-icon"><img id="img-users" src="img/users.png" alt=""></span>');
  });
  test('Eyes opened show password 1st', () => {
    const btnEyes = component.querySelector('.eyes');
    btnEyes.click();
    expect(btnEyes.outerHTML).toBe(
      `<span class="eyes">
       <i id="show1" class="fas fa-eye" style="color: rgb(14, 99, 89); display: none;"></i>
       <i id="hide1" class="fas fa-eye-slash" style="color: rgb(14, 99, 89); display: block;"></i>
       </span>`,
    );
  });
  test('Eyes NO SHOW 1st', () => {
    const btnEyes = component.querySelector('.eyes');
    btnEyes.click();
    expect(btnEyes.outerHTML).toBe(
      `<span class="eyes">
       <i id="show1" class="fas fa-eye" style="color: rgb(14, 99, 89); display: block;"></i>
       <i id="hide1" class="fas fa-eye-slash" style="color: rgb(14, 99, 89); display: none;"></i>
       </span>`,
    );
  });
  test('Eyes opened show password confirm', () => {
    const btnEyes = component.querySelector('.eyes-confirm');
    btnEyes.click();
    expect(btnEyes.outerHTML).toBe(
      `<span class="eyes-confirm">
       <i id="show2" class="fas fa-eye" style="color: rgb(14, 99, 89); display: none;"></i>
       <i id="hide2" class="fas fa-eye-slash" style="color: rgb(14, 99, 89); display: block;"></i>
       </span>`,
    );
  });
  test('Eyes NO SHOW confirm', () => {
    const btnEyes = component.querySelector('.eyes-confirm');
    btnEyes.click();
    expect(btnEyes.outerHTML).toBe(
      `<span class="eyes-confirm">
       <i id="show2" class="fas fa-eye" style="color: rgb(14, 99, 89); display: block;"></i>
       <i id="hide2" class="fas fa-eye-slash" style="color: rgb(14, 99, 89); display: none;"></i>
       </span>`,
    );
  });
});

describe('Coleccion de test soble POSTS', () => { // -------POSTS-------------------------------------------
  document.body.innerHTML = '<div id="root"></div>';
  const component = post();
  test('should render', () => {
    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(component);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });

  test('should create a post when clicked button', () => {
    const mockPost = jest.fn();
    mockPost.mockImplementation(() => Promise.resolve());

    firebase.doc = jest.fn().mockImplementation(() => ({
      set: mockPost,
    }));
    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(component);

    const userUid = 'TewHJrnoAJYarLIuRIjl7DrzO2F2';
    const user = 'sparroquin90@gmail.com';
    const topic = 'Reciclaje';
    const idea = 'Esto es una idea.';

    document.getElementById('topic-post').value = topic;
    document.getElementById('idea-post').value = idea;

    document.getElementById('btn-create-post').click(); // Aqui llaama al form de Login
    expect(mockPost).toHaveBeenCalledWith(userUid, user, topic, idea);
  });
});
