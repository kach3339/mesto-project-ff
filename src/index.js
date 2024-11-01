import './pages/index.css';
import { initialCards } from "./cards";
import { createCard } from './components/card';
import {openModal, closeModal } from './components/modal';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const placeCardImages = document.querySelector('.card__image');
const popup = document.querySelectorAll('.popup');
const popupCloseElements = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImages = document.querySelectorAll('.popup_type_image');
const formEditProfile = document.forms['edit-profile'];

profileEditButton.addEventListener('click', ()=> {
  openModal(popupTypeEdit)
});
profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard)
});


popupCloseElements.forEach((popupCloseElement) => {
  popupCloseElement.addEventListener('click', closeModal);
});

popup.forEach((popupElement) => {
  popupElement.addEventListener('click',  (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  });
});

document.addEventListener('keydown', (event)=> {
  if (event.key === 'Escape'){
    closeModal();
  }
})
