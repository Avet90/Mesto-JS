import {openPopup, closePopup} from './modal.js';
import {deleteCardRequest, putLikeRequest, deleteLikeRequest} from './api.js'


function openPicture(evt, popupPicture) {

    const card = evt.target.closest('.element');
    const namePicture = card.querySelector('.element__title').textContent;
    const linkPicture = card.querySelector('.element__image').src;
    
    popupPicture.querySelector('.image-caption').textContent = namePicture;
    popupPicture.querySelector('.popup-image').src = linkPicture;
    popupPicture.querySelector('.popup-image').alt = namePicture;
    
    openPopup(popupPicture);
}

function checkDelete() {
    const popupCardDelete = document.querySelector('#popupCardDelete');
    openPopup(popupCardDelete);
}

function deleteCard(evt, card) {
    checkDelete();
    const cardElement = evt.target.closest('.element');
    document.querySelector('.btn-card-delete').addEventListener('click', function () {

    deleteCardRequest(card._id)
    .then(()=>{
        cardElement.remove();
        closePopup(popupCardDelete);
    })
    .catch(err => console.log(`Ошибка: ${err}`))


    });
}

function toggleLike(evt, card) {
    const likeElement = evt.target;
    const isLiked = likeElement.classList.contains('element__like_active');
    const likesCounter = likeElement.closest('.element').querySelector('.element__likes-quantity');

    const request = isLiked ? deleteLikeRequest : putLikeRequest;

    request(card._id)
    .then((card)=>{
            likeElement.classList.toggle('element__like_active');
            likesCounter.textContent = card.likes.length;
        })
    .catch(err => console.log(`Ошибка: ${err}`))
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

    cardElement.querySelector('.element__image').addEventListener('click', function(evt){
       openPicture(evt, popupPicture);
    })

    cardElement.querySelector('.element__trash').addEventListener('click', function(evt){
       deleteCard(evt, card);
    })
    
    cardElement.querySelector('.element__like').addEventListener('click', function(evt){
       toggleLike(evt, card);
    })



    elementsContainer.append(cardElement);
}