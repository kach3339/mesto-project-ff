import './pages/index.css';
import { openModal, closeModal } from './components/modal';
import {
  createCard,
  deleteCard,
  likeClick
} from './components/card';
import {initialCards} from "./cards";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupCloseElements = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const editProfileForm = document.forms['edit-profile'];
const creatCardForm = document.forms['new-place'];

const nameProfile = document.querySelector('.profile__title')
const occupationProfile = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');
const placesCardContainer = document.querySelector('.places__list');
const popupTypeImages = document.querySelector('.popup_type_image');
const placeCardImagePopup = document.querySelector('.popup__image');
const placeCardCaption = document.querySelector('.popup__caption');

const openFullImage = (imagePopupData) => {
  placeCardImagePopup.src = imagePopupData.link;
  placeCardImagePopup.alt = imagePopupData.name;
  placeCardCaption.textContent = imagePopupData.name;

  openModal(popupTypeImages);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = jobInput.value;

  closeModal(popupTypeEdit);
}

function prependCard(placeCardElement) {
  placesCardContainer.prepend(placeCardElement);
}

function appendCard(placeCardElement) {
  placesCardContainer.append(placeCardElement);
}

function newCardFormSubmit(evt) {
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

  placeNameInput.value = '';
  placeLinkInput.value = '';

  closeModal(popupTypeNewCard);
}

function setupEventListeners() {
  profileEditButton.addEventListener('click', ()=> {
    nameInput.value = nameProfile.textContent;
    jobInput.value = occupationProfile.textContent;

    openModal(popupTypeEdit);
  });

  profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
  });

  popups.forEach((popupElement) => {
    const closeButton = popupElement.querySelector('.popup__close');

    popupElement.classList.add('popup_is-animated');

    closeButton.addEventListener('click', () => {
      closeModal(popupElement);
    });

    popupElement.addEventListener('mousedown',  (evt) => {
      if (evt.target === evt.currentTarget) {
        closeModal(popupElement);
      }
    });
  });

  editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

  creatCardForm.addEventListener('submit', newCardFormSubmit);
}

const renderInitialCards = () => {
  initialCards.forEach((cardData) => {
    const placeCardElement  = createCard(
      cardData,
      {
        openFullImage,
        deleteCard,
        likeClick
      }
    );
    appendCard(placeCardElement);
  });
};

setupEventListeners();
renderInitialCards();
