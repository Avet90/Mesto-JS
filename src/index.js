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
    const namePicture = popupCard.querySelector('.placeName');
    const linkPicture = popupCard.querySelector('.imageUrl');

    createCard(linkPicture.value, namePicture.value, popupPicture, elementsContainer);

    linkPicture.value = ''; 
    namePicture.value = '';

}


function editProfile(evt){
    evt.preventDefault();

    const name = formElement.querySelector('.input-name').value;
    const job = formElement.querySelector('.input-job').value;

    profileSection.querySelector('.profile__name').textContent = name;
    profileSection.querySelector('.profile__description').textContent = job;

}


function setInputValue() {

    formElement.querySelector('.input-name').value = profileSection.querySelector('.profile__name').textContent;
    formElement.querySelector('.input-job').value = profileSection.querySelector('.profile__description').textContent;

}

// Hendlers


function handlerPopupOpen(evt){
       
    if(evt.target === addButton){
        openPopup(popupCard);
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

