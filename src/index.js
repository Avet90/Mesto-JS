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


const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};


// Functions

function addCard(evt) {
    evt.preventDefault();
    const namePicture = popupCard.querySelector('.place-name-input');
    const linkPicture = popupCard.querySelector('.image-url-input');

    createCard(linkPicture.value, namePicture.value, popupPicture, elementsContainer);

    linkPicture.value = ''; 
    namePicture.value = '';

}


function editProfile(evt){
    evt.preventDefault();

    const name = formElement.querySelector('.profile-name-input').value;
    const job = formElement.querySelector('.profile-description-input').value;

    profileSection.querySelector('.profile__name').textContent = name;
    profileSection.querySelector('.profile__description').textContent = job;

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

formElement.addEventListener('submit', (evt) => {
  editProfile(evt);
  closePopup(popupProfile);
}); 

formCard.addEventListener('submit', (evt) => {
  addCard(evt);
  closePopup(popupCard);
}); 

