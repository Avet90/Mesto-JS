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


// Functions

export function openPopup(popup) {
    popup.classList.add('active');
    document.addEventListener('keydown', (evt) => handlerKeyClose(evt, popup));
    popup.addEventListener('click', (evt) => handlerPopupClose(evt, popup));
}

function closePopup(popup) {
    popup.classList.remove('active');
    document.removeEventListener('keydown', (evt) => handlerKeyClose(evt, popup));
    popup.removeEventListener('click', (evt) => handlerPopupClose(evt, popup));
}



// function openPicture(evt) {

//     const card = evt.target.closest('.element');
//     const namePicture = card.querySelector('.element__title').textContent;
//     const linkPicture = card.querySelector('.element__image').src;
    
//     popupPicture.querySelector('.image-caption').textContent = namePicture;
//     popupPicture.querySelector('.popup-image').src = linkPicture;
//     popupPicture.querySelector('.popup-image').alt = namePicture;
    
//     openPopup(popupPicture);
// }

// function toggleLike(evt) {
//     const likeElement = evt.target;
//     likeElement.classList.toggle('element__like_active');
// }

// function createCard(linkPicture, namePicture, handlerCardElement) {
//     const cardTemplate = document.querySelector('#element-template');
//     const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);


//     cardElement.querySelector('.element__title').textContent = namePicture;
//     cardElement.querySelector('.element__image').src = linkPicture;
//     cardElement.querySelector('.element__image').alt = namePicture;
    
//     cardElement

//     cardElement.addEventListener('click', function(evt){
//        handlerCardElement(evt);
//     })

//     elementsContainer.append(cardElement);
// }


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


// function handlerCardElement(evt) {

//     if (evt.target.closest('.element__like')) {
//         toggleLike(evt);
//     }
//     if (evt.target.closest('.element__trash')) {
//         deleteCard(evt);
//     }
//     if (evt.target.closest('.element__image')) {
//         openPicture(evt)
//     }
// }

function handlerPopupOpen(evt){
       
    if(evt.target === addButton){
        openPopup(popupCard);
    }
        
    if(evt.target === editProfileButton){
        openPopup(popupProfile);
        setInputValue();
    }
}

function handlerPopupClose(evt, popupElement) {
    if (evt.target === popupElement || evt.target.classList.contains('close-btn')) {
        closePopup(popupElement);
    }
}

function handlerKeyClose(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
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

