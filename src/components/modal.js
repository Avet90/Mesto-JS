export function openPopup(popup) {
    popup.classList.add('active');
    document.addEventListener('keydown', (evt) => handlerKeyClose(evt, popup));
    popup.addEventListener('click', (evt) => handlerPopupClose(evt, popup));
}

export function closePopup(popup) {
    popup.classList.remove('active');
    document.removeEventListener('keydown', (evt) => handlerKeyClose(evt, popup));
    popup.removeEventListener('click', (evt) => handlerPopupClose(evt, popup));
}


function handlerKeyClose(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

function handlerPopupClose(evt, popupElement) {
    if (evt.target === popupElement || evt.target.classList.contains('close-btn')) {
        closePopup(popupElement);
    }
}
