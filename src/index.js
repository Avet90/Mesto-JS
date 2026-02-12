import './styles/index.css';

const content = document.querySelector('.content');
const profileSection = content.querySelector('.profile');
const elementsContainer = content.querySelector('.elements-container');

// Buttons
const addButton = content.querySelector('.profile__add-element-button');
const editProfileButton = content.querySelector('.profile__edit-button');

// Popups
const popupProfile = content.querySelector('#popupProfile');
const popupCard = content.querySelector('#popupCard');
const popupPicture = content.querySelector('#popupPicture');

// Forms
const formElement = content.querySelector('#formProfile');
const formCard = content.querySelector('#formCard')

// Imports
import {createCard} from './components/cards.js';
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js'
import {getInitialCards, getInitialUser, patchUser, postCard} from "./components/api.js";


const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Fetch Functions

Promise.all([getInitialUser(), getInitialCards()])
.then(([user, cards])=>{
  getApiUser(user);
  console.log(user);
  cards.forEach(card => {
        createCard(card, popupPicture, elementsContainer);
    });
})
.catch(err => console.log(`Ошибка: ${err}`))


// Functions

export function getApiUser(user) {
  document.querySelector('.profile__description').textContent = user.about;
  document.querySelector('.profile__avatar').src = user.avatar;
  document.querySelector('.profile__name').textContent = user.name;
}

function addCard(evt) {
  evt.preventDefault();

  const card = {};
  card.name = popupCard.querySelector('.place-name-input').value;
  card.link = popupCard.querySelector('.image-url-input').value;

  postCard(card)
  .then((card)=>{
    createCard(card, popupPicture, elementsContainer);
    closePopup(popupCard);
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(()=>{
    popupCard.querySelector('.place-name-input').value = ''; 
    popupCard.querySelector('.image-url-input').value = '';
  })
}


function editProfile(evt){
  evt.preventDefault();

  const name = formElement.querySelector('.profile-name-input').value;
  const about = formElement.querySelector('.profile-description-input').value;

  patchUser(name, about)
  .then((updateUser)=>{
    getApiUser(updateUser);
    closePopup(popupProfile);
  })
  .catch(err => console.log(`Ошибка: ${err}`))

}


function setInputValue() {

    formElement.querySelector('.profile-name-input').value = profileSection.querySelector('.profile__name').textContent;
    formElement.querySelector('.profile-description-input').value = profileSection.querySelector('.profile__description').textContent;

}


// Hendlers


function handlerPopupOpen(evt){
       
    if(evt.target === addButton){
        clearValidation(formCard, validationConfig);
        openPopup(popupCard);
        enableValidation(validationConfig);

    }
        
    if(evt.target === editProfileButton){
        clearValidation(formElement, validationConfig);
        openPopup(popupProfile);
        setInputValue();
        enableValidation(validationConfig);
    }
}

function handlerKeyOpen(evt) {
    if (evt.key === 'Enter'){
        if (evt.target === popupProfile) {
            editProfile(evt)
        }
        if (evt.target === popupCard) {
            addCard();
        }
    }
}


// EventListeners

content.addEventListener('keydown', (evt)=>{
  handlerKeyOpen(evt);
})

profileSection.addEventListener('click', function (evt) {
  handlerPopupOpen(evt);
})

formElement.addEventListener('submit', editProfile); 

formCard.addEventListener('submit', addCard); 

