const content = document.querySelector('.content');
const elementsContainer = content.querySelector('.elements-container');

const addButton = content.querySelector('.profile__add-element-button');

const overlayCard = content.querySelector('#popupOverlayCard');
const submitButton = overlayCard.querySelector('.submit-btn');

const overlayImage = content.querySelector('#popupOverlayImage');


const closeButton = content.querySelector('.close-btn');


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
    const namePicture = overlayCard.querySelector('.placeName');
    const linkPicture = overlayCard.querySelector('.imageUrl');

    createCard(linkPicture.value, namePicture.value);

    linkPicture.value = ''; 
    namePicture.value = '';

    closePopup(overlayCard);
}





// EventListeners

addButton.addEventListener('click', () => openPopup(overlayCard))

// closeButton.addEventListener('click', () => closePopup())

overlayCard.addEventListener('click', function (evt) {

    if (evt.target === overlayCard) {
        closePopup(overlayCard);
    }

    if (evt.target.classList.contains('close-btn')) {
        closePopup(overlayCard);
    }

    if(evt.target === submitButton){
        addCard();
    }
})



