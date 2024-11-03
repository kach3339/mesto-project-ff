import {createCard, deleteCard, likeClick, prependCard, openFullImage} from "./card";
import {
  jobInput,
  nameInput,
  nameProfile,
  occupationProfile,
  placeLinkInput,
  placeNameInput
} from "../index";

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

export function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = jobInput.value;

  const popup = evt.target.closest('.popup_is-opened');

  closeModal(popup);
}

export function newCardFormSubmit(evt) {
  evt.preventDefault();

  const placeCardElement = createCard(
    {
      name: placeNameInput.value,
      link: placeLinkInput.value
    },
    {
      openFullImage,
      deleteCard,
      likeClick
    }
  );

  prependCard(placeCardElement);

  placeNameInput.value = ''
  placeLinkInput.value = ''

  const popup = evt.target.closest('.popup_is-opened');

  closeModal(popup);
}