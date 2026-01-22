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
    
    popupPicture.querySelector('.image-caption').textContent = namePicture;
    popupPicture.querySelector('.popup-image').src = linkPicture;
    popupPicture.querySelector('.popup-image').alt = namePicture;
    
    openPopup(popupPicture);
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


function addCard(evt) {
    evt.preventDefault();
    const namePicture = popupCard.querySelector('.placeName');
    const linkPicture = popupCard.querySelector('.imageUrl');

    createCard(linkPicture.value, namePicture.value);

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




function profileForm() {

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
        profileForm();
    }

}

function handlerPopupClose(evt, popupElement) {
    if (evt.target === popupElement || evt.target.classList.contains('close-btn')) {
        closePopup(popupElement);
    }
}

function handlerKey(evt) {
    if (evt.key === 'Escape') {
        closePopup(popupCard);
        closePopup(popupProfile);
        closePopup(popupPicture);
    }

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
    handlerKey(evt);
})

profileSection.addEventListener('click', function (evt) {
    handlerPopupOpen(evt)
})

popupPicture.addEventListener('click', function (evt) {
    handlerPopupClose(evt, popupPicture);
})


formElement.addEventListener('submit', (evt) => {
    editProfile(evt);
    closePopup(popupProfile);
}); 

popupProfile.addEventListener('click', function (evt) {
    handlerPopupClose(evt, popupProfile);
})


formCard.addEventListener('submit', (evt) => {
    addCard(evt);
    closePopup(popupCard);
}); 
popupCard.addEventListener('click', function (evt) {
    handlerPopupClose(evt, popupCard);
})



