const content = document.querySelector('.content');
const element = content.querySelector('.element');

const addButton = content.querySelector('.profile__add-element-button');

const popupOverlay = content.querySelector('.popup-overlay');

const closeButton = popupOverlay.querySelector('.close-btn')


// Functions

function openPopup() {
    popupOverlay.classList.add('active');
}

function closePopup() {
    popupOverlay.classList.remove('active');
}


// EventListeners

addButton.addEventListener('click', openPopup)

closeButton.addEventListener('click', closePopup)

popupOverlay.addEventListener('click', function (evt) {
    if (evt.target === popupOverlay) {
        closePopup();
    }
})

element.addEventListener('click', function(evt){
    if (evt.target.classList.contains('element__like')) {
        evt.target.classList.toggle('element__like_active');
    }
})
