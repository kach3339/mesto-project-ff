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
    closeModal();
  }
}

export function openModal (popup){
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleEscKey);

}

export function closeModal (){
  const popup = document.querySelector('.popup_is-opened');
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleEscKey);
}

export function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = jobInput.value;

  closeModal();
}

export function newCardFormSubmit(evt) {
  evt.preventDefault();

  const placeCardElement = createCard({
    name: placeNameInput.value,
    link: placeLinkInput.value,
    openFullImage,
    deleteCard,
    likeClick
  });

  prependCard(placeCardElement);

  placeNameInput.value = ''
  placeLinkInput.value = ''

  closeModal();
}