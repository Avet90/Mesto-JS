import {openPopup} from './modal.js';
import {deleteCardRequest} from './api.js'


function openPicture(evt, popupPicture) {

    const card = evt.target.closest('.element');
    const namePicture = card.querySelector('.element__title').textContent;
    const linkPicture = card.querySelector('.element__image').src;
    
    popupPicture.querySelector('.image-caption').textContent = namePicture;
    popupPicture.querySelector('.popup-image').src = linkPicture;
    popupPicture.querySelector('.popup-image').alt = namePicture;
    
    openPopup(popupPicture);
}

function deleteCard(evt, card) {
    const cardElement = evt.target.closest('.element');

    deleteCardRequest(card._id)
    .then(()=>{
        cardElement.remove();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
}

function toggleLike(evt) {
    const likeElement = evt.target;
    likeElement.classList.toggle('element__like_active');
}


export function createCard(card, popupPicture, elementsContainer) {
    const cardTemplate = document.querySelector('#element-template');
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);


    cardElement.querySelector('.element__title').textContent = card.name;
    cardElement.querySelector('.element__image').src = card.link;
    cardElement.querySelector('.element__image').alt = card.name;
    cardElement.querySelector('.element__likes-quantity').textContent = card.likes.length;

    if (card.owner._id === "52d1b66af18f037cb2c07796") {
     cardElement.querySelector('.element__trash').classList.add('element__trash-active');   
    }
    
    cardElement

    cardElement.addEventListener('click', function(evt){
       handlerCardElement(evt, popupPicture);
    })

    cardElement.querySelector('.element__trash').addEventListener('click', function(evt){
       deleteCard(evt, card);
    })



    elementsContainer.append(cardElement);
}

function handlerCardElement(evt, popupPicture) {

    if (evt.target.closest('.element__like')) {
        toggleLike(evt);
    }
    if (evt.target.closest('.element__image')) {
        openPicture(evt, popupPicture)
    }
}