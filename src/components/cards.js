
import {openPopup} from '../index.js';




function openPicture(evt, popupPicture) {

    const card = evt.target.closest('.element');
    const namePicture = card.querySelector('.element__title').textContent;
    const linkPicture = card.querySelector('.element__image').src;
    
    popupPicture.querySelector('.image-caption').textContent = namePicture;
    popupPicture.querySelector('.popup-image').src = linkPicture;
    popupPicture.querySelector('.popup-image').alt = namePicture;
    
    openPopup(popupPicture);
}


function deleteCard(evt) {
    const cardElement = evt.target.closest('.element'); 
    cardElement.remove();
}

function toggleLike(evt) {
    const likeElement = evt.target;
    likeElement.classList.toggle('element__like_active');
}

export function createCard(linkPicture, namePicture, popupPicture, elementsContainer) {
    const cardTemplate = document.querySelector('#element-template');
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);


    cardElement.querySelector('.element__title').textContent = namePicture;
    cardElement.querySelector('.element__image').src = linkPicture;
    cardElement.querySelector('.element__image').alt = namePicture;
    
    cardElement

    cardElement.addEventListener('click', function(evt){
       handlerCardElement(evt, popupPicture);
    })

    elementsContainer.append(cardElement);
}




function handlerCardElement(evt, popupPicture) {

    if (evt.target.closest('.element__like')) {
        toggleLike(evt);
    }
    if (evt.target.closest('.element__trash')) {
        deleteCard(evt);
    }
    if (evt.target.closest('.element__image')) {
        openPicture(evt, popupPicture)
    }
}