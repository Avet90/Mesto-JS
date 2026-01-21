import './styles/index.css';

const content = document.querySelector('.content');
const profileSection = content.querySelector('.profile');
const elementsContainer = content.querySelector('.elements-container');

const addButton = content.querySelector('.profile__add-element-button');
const editProfileButton = content.querySelector('.profile__edit-button');

const popupProfile = content.querySelector('#popupProfile');

const popupCard = content.querySelector('#popupCard');
const submitButton = popupCard.querySelector('.submit-btn');

const overlayImage = content.querySelector('#popupOverlayImage');

// Functions

function openPopup(overlay) {
    overlay.classList.add('active');
}

function closePopup(overlay) {
    overlay.classList.remove('active');
}

function deleteCard(cardElement) {
    cardElement.remove();
}

function passOverlayFromCard(card) {

    const namePicture = card.querySelector('.element__title').textContent;
    const linkPicture = card.querySelector('.element__image').src;
    
    overlayImage.querySelector('.image-caption').textContent = namePicture;
    overlayImage.querySelector('.popup-image').src = linkPicture;
    overlayImage.querySelector('.popup-image').alt = namePicture;

    overlayImage.addEventListener('click', function (evt) {
        if (evt.target === overlayImage) {
        closePopup(overlayImage);
        }

        if (evt.target.classList.contains('close-btn')) {
        closePopup(overlayImage);
    }
    })
    
    openPopup(overlayImage);
}

function createCard(linkPicture, namePicture) {
    const cardTemplate = document.querySelector('#element-template');
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);


    cardElement.querySelector('.element__title').textContent = namePicture;
    cardElement.querySelector('.element__image').src = linkPicture;
    cardElement.querySelector('.element__image').alt = namePicture;


    cardElement.querySelector('.element__like').addEventListener('click', function(evt){
        const likeElement = evt.target;
        likeElement.classList.toggle('element__like_active');
    })

    cardElement.querySelector('.element__trash').addEventListener('click', function(evt){
        deleteCard(cardElement);
    })

    cardElement.querySelector('.element__image').addEventListener('click', function(evt){
        passOverlayFromCard(cardElement)
    })

    elementsContainer.append(cardElement);
}


function addCard() {
    const namePicture = popupCard.querySelector('.placeName');
    const linkPicture = popupCard.querySelector('.imageUrl');

    createCard(linkPicture.value, namePicture.value);

    linkPicture.value = ''; 
    namePicture.value = '';

    closePopup(popupCard);
}

function keyHandler(evt) {
    if (evt.key === 'Escape') {
        closePopup(popupCard);
        closePopup(popupProfile);
    }

    // if (evt.key === 'Enter') {
    //     closePopup(popupElement);
    // }
    
}

function handlerPopupClose(evt, popupElement) {
    if (evt.target === popupElement || evt.target.classList.contains('close-btn')) {
        closePopup(popupElement);
    }
}

function handlerPopupOpen(evt){
       
    if(evt.target === addButton){
        openPopup(popupCard);
    }

        
    if(evt.target === editProfileButton){
        openPopup(popupProfile);
    }

}






// EventListeners

content.addEventListener('keydown', (evt)=>{
    keyHandler(evt);
})

profileSection.addEventListener('click', function (evt) {
    handlerPopupOpen(evt)
})

popupProfile.addEventListener('click', function (evt) {
    handlerPopupClose(evt, popupProfile)
})


popupCard.addEventListener('click', function (evt) {
    handlerPopupClose(evt, popupCard);
    if(evt.target === submitButton){
        addCard();
    }
})



