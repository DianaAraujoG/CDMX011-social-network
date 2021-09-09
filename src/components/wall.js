/* eslint-disable import/no-cycle */
import { signOut, getUser } from '../lib/firebaseClient.js';
import { onNavigate } from '../main.js';
import { edit } from './edit.js';
import {
  getAllPost, getThePost, deletePost, updatePost,
} from '../lib/posts.js';

export const wall = () => {
  const html = `
  <header>
        <a href="/"><img src="img/logo-desktop.png" alt="logotipo" id="logoGF" /></a>
        <span class="menu-icon" id="logout-movil-wall"><img id="img-users" src="img/logout.png" alt="cerrar sesion"></span>
        
        <nav class="div-navegation">
            <button class="btn-roting beige" id="btn-exit-wall">Cerrar sesión</button>
        </nav>
    </header>
    <section id="wall">
      <div id="welcome-wall">
      <img src="img/guacamayo.png" alt="" id="wall-image">
      <p id="message-welcome">Bienvenido <span id='user-email-welcome'></span> !!</p>
      </div>
      <div>
        <button id="btn-post">Crear publicación</button>
      </div>
      <div id="post-container"></div>
    </section>
  `;
  const divWall = document.createElement('div');
  divWall.innerHTML = html;
  // Se puede hacer de otra forma
  /* if (getUser() === null) {
    onNavigate('/');
    alert('Inicia Sesion');
  } else { */
  const emailWelcome = divWall.querySelector('#user-email-welcome');
  emailWelcome.innerHTML = getUser().email;
  // para cerrar sesion
  const btnExit = divWall.querySelector('#btn-exit-wall');
  btnExit.addEventListener('click', (event) => {
    event.preventDefault();
    signOut();
    onNavigate('/');
  });

  const btnExitMovil = divWall.querySelector('#logout-movil-wall');
  btnExitMovil.addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
    onNavigate('/');
  });
  // para botón "crear publicación"
  const btnNewPost = divWall.querySelector('#btn-post');
  btnNewPost.addEventListener('click', (event) => {
    event.preventDefault();
    onNavigate('/post');
  });
  // }
  const postContainer = divWall.querySelector('#post-container');
  // aqui cargan todo lo post
  // onSnapshot para que lo traiga en tiempo real
  getAllPost().onSnapshot((allpost) => {
    const documents = [];
    allpost.forEach((doc) => {
      documents.push({ id: doc.id, infopost: doc.data() });
    });
    // la línea 66 es para que se actualice y no sobreescriba.
    postContainer.innerHTML = '';
    documents.forEach((eachPost) => {
      const {
        topic, idea, user, datePublic, likes,
      } = eachPost.infopost;
      const id = eachPost.id;
      const likesEmail = likes.length;
      postContainer.innerHTML += `<div class="div-post">
        <h3>${user}</h3> 
        <span class="date-public">${datePublic}</span>
        <h4>Temática: ${topic}</h4>
         <p>${idea}</p>
         <div class= "div-editPost">
         <img class="like count-likes" src="img/likes.png" alt="like" data-id="${id}"><span class="like-counter">${likesEmail}  Likes</span>
         <button class ='btn-delete btn-wall' id="${user}" data-id="${id}" >Eliminar</button>
         <button class ='btn-edit btn-wall' id="${user}"  data-id="${id}">Editar</button>
         </div>
         </div>
        `;
    });

    const usermail = getUser().email;

    const btnsDelete = document.querySelectorAll('.btn-delete');

    btnsDelete.forEach((elems) => {
      if (usermail !== elems.id) {
        console.log(usermail);
        console.log(elems.id);
        // eslint-disable-next-line no-param-reassign
        elems.style.visibility = 'hidden';
      }
    });

    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', async (ele) => {
        const result = window.confirm('¿Estás seguro de querer eliminar el post?');
        if (result === true) {
          await deletePost(ele.target.dataset.id);
        }
      });
    });

    const btnsEdit = document.querySelectorAll('.btn-edit');
    const rootDiv = document.getElementById('root');

    btnsEdit.forEach((elems) => {
      if (usermail !== elems.id) {
        // eslint-disable-next-line no-param-reassign
        elems.style.visibility = 'hidden';
      }
    });

    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (ele) => {
        const thePost = await getThePost(ele.target.dataset.id);
        const post = thePost.data();
        console.log(thePost);
        const id = thePost.id;
        while (rootDiv.firstChild) { // Mientras contenga informacion
          rootDiv.removeChild(rootDiv.firstChild);
        }
        rootDiv.appendChild(edit(id, post.topic, post.idea));
        // edit(thePost.data())
      });
    });

    const countLikes = document.querySelectorAll('.count-likes');
    countLikes.forEach((bttn) => {
      bttn.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        getThePost(id)
          .then((doc) => {
            console.log('entre');
            if (doc.data().likes.includes(usermail)) {
              // eslint-disable-next-line no-param-reassign
              // bttn.previousElementSibling.innerText = doc.data().likes.length - 1;
              return updatePost(id, {
                likes: firebase.firestore.FieldValue.arrayRemove(usermail),
              });
            }
            // eslint-disable-next-line no-param-reassign
            // bttn.previousElementSibling.innerText = doc.data().likes.length + 1;
            return updatePost(id, {
              likes: firebase.firestore.FieldValue.arrayUnion(usermail),
            });
          })
          .catch((error) => {
            console.log('Error getting document:', error);
          });

        //   const giveLike = false;
        //   const countLikes = document.querySelectorAll('.count-likes');
        //   countLikes.forEach((btn) => {
        //     btn.addEventListener('click', async (eve) => {
        //       eve.preventDefault();
        //       const id = eve.target.dataset.id;
        //       console.log(giveLike);

        //       await updatePost(id, {
        //         likes: '1',
        //       });

        //       await updatePost(id, {
        //         likes: '0',
        //       });
        //     });
        //   });
        // });
      });
    });
  });
  return divWall;
};
