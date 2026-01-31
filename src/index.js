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
    enableValidation();

}



const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  })
}

const toggleButtonState =(inputList, buttonElement)=>{
  if(hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add('button_inactive');
  }else{
    buttonElement.disabled = false;
    buttonElement.classList.remove('button_inactive');
  }
}

const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};





// Hendlers


function handlerPopupOpen(evt){
       
    if(evt.target === addButton){
        openPopup(popupCard);
        enableValidation();
    }
        
    if(evt.target === editProfileButton){
        openPopup(popupProfile);
        setInputValue();
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

