const content = document.querySelector('.content');
const elementsContainer = content.querySelector('.elements-container');

const addButton = content.querySelector('.profile__add-element-button');

const popupOverlay = content.querySelector('.popup-overlay');
const submitButton = popupOverlay.querySelector('.submit-btn');

const closeButton = popupOverlay.querySelector('.close-btn')


// Functions

function openPopup() {
    popupOverlay.classList.add('active');
}

function closePopup() {
    popupOverlay.classList.remove('active');
}

function deleteCard(cardElement) {
    cardElement.remove();
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

    elementsContainer.append(cardElement);
}


function addCard() {
    const namePicture = popupOverlay.querySelector('.placeName');
    const linkPicture = popupOverlay.querySelector('.imageUrl');

    createCard(linkPicture.value, namePicture.value);

    linkPicture.value = ''; 
    namePicture.value = '';

    closePopup();
}





// EventListeners

addButton.addEventListener('click', openPopup)

closeButton.addEventListener('click', closePopup)

popupOverlay.addEventListener('click', function (evt) {

    if (evt.target === popupOverlay) {
        closePopup();
    }

    if(evt.target === submitButton){
        addCard();
    }
})



