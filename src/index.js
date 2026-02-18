import './styles/index.css';

const content = document.querySelector('.content');
const profileSection = content.querySelector('.profile');
const elementsContainer = content.querySelector('.elements-container');
const profileAvatarContainer = content.querySelector('.profile__avatar-container');

// Buttons
const addButton = content.querySelector('.profile__add-element-button');
const editProfileButton = content.querySelector('.profile__edit-button');

// Popups
const popupProfile = content.querySelector('#popupProfile');
const popupCard = content.querySelector('#popupCard');
const popupPicture = content.querySelector('#popupPicture');
const popupProfAvatar = content.querySelector('#popupProfileAvatar');


// Forms
const formElement = content.querySelector('#formProfile');
const formCard = content.querySelector('#formCard')
const formProfAvatar = content.querySelector('#formProfileAvatar');

// Imports
import {createCard} from './components/cards.js';
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js'
import {getInitialCards, getInitialUser, patchUser, postCard, patchAvatar} from "./components/api.js";


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
  setButtonSaving(popupCard);
  /// функция изминения название кнопки

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
    setButtonText(formElement);
  })
}


function editProfile(evt){
  evt.preventDefault();

  setButtonSaving(formElement);
  /// функция изминения название кнопки

  const name = formElement.querySelector('.profile-name-input').value;
  const about = formElement.querySelector('.profile-description-input').value;


  patchUser(name, about)
  .then((updateUser)=>{
    getApiUser(updateUser);
    closePopup(popupProfile);
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(()=>{
    setButtonText(formElement);
  })
}


function setInputValue() {

    formElement.querySelector('.profile-name-input').value = profileSection.querySelector('.profile__name').textContent;
    formElement.querySelector('.profile-description-input').value = profileSection.querySelector('.profile__description').textContent;

}

function changeAvatar(evt){
  evt.preventDefault();

  setButtonSaving(formProfAvatar);

  const avatar = formProfAvatar.querySelector('.profile__avatar-url-input').value;

  patchAvatar(avatar)
  .then((updateUser)=>{
    getApiUser(updateUser);
    closePopup(popupProfAvatar);
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(()=>{
    setButtonText(formProfAvatar);
  })
}

const setButtonSaving = (form)=>{
  if (form === formCard) {
    form.querySelector('.form__submit').textContent = 'Создание...';
  }else{
    form.querySelector('.form__submit').textContent = 'Сохранение...';
  }
}

const setButtonText = (form)=>{
  if(form === formCard){
    form.querySelector('.form__submit').textContent = 'Создать';
  }else{
    form.querySelector('.form__submit').textContent = 'Сохранить';
  }
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

    if (evt.target === profileAvatarContainer) {
      openPopup(popupProfAvatar);
      clearValidation(formProfAvatar, validationConfig);
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

formProfAvatar.addEventListener('submit', changeAvatar);

