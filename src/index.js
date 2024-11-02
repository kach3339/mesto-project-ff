import './pages/index.css';
import { openModal, closeModal, handleEditProfileFormSubmit, newCardFormSubmit } from './components/modal';
import {deleteCard, renderInitialCards} from './components/card';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
const popupCloseElements = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const editProfileForm = document.forms['edit-profile'];
const creatCardForm = document.forms['new-place'];

export const nameProfile = document.querySelector('.profile__title')
export const occupationProfile = document.querySelector('.profile__description');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const placeNameInput = document.querySelector('.popup__input_type_card-name');
export const placeLinkInput = document.querySelector('.popup__input_type_url');
export const placeCardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
export const placesCardContainer = document.querySelector('.places__list');
export const popupTypeImages = document.querySelector('.popup_type_image');

function setupEventListeners() {
  profileEditButton.addEventListener('click', ()=> {
    nameInput.value = nameProfile.textContent;
    jobInput.value = occupationProfile.textContent;

    openModal(popupTypeEdit);
  });

  profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
  });

  popupCloseElements.forEach((popupCloseElement) => {
    popupCloseElement.addEventListener('click', closeModal);
  });

  popup.forEach((popupElement) => {
    popupElement.addEventListener('mousedown',  (evt) => {
      if (evt.target === evt.currentTarget) {
        closeModal();
      }
    });
  });

  editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

  creatCardForm.addEventListener('submit', newCardFormSubmit);
}

setupEventListeners()
renderInitialCards()
