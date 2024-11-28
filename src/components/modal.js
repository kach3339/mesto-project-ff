const handleEscKey = (event)=> {
  if (event.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_is-opened');

    closeModal(openedPopup);
  }
};

export function openModal (popup){
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleEscKey);
}

export function closeModal(popup){
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleEscKey);
}

export function startModalSubmitting (popup, submittingText = 'Сохранение...') {
  const submitButton = popup.querySelector('.popup__button');
  const originalCaption = submitButton.textContent;

  submitButton.textContent = submittingText;
  submitButton.disabled = 'true';

  return {
    completeModalSubmitting: () => {
      submitButton.textContent = originalCaption;
      submitButton.disabled = 'false';
    }
  };
}
