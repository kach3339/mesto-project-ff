import './pages/index.css';
import { openModal, closeModal } from './components/modal';
import {
  createCard,
  deleteCard,
  likeClick
} from './components/card';
import {enableValidation, clearValidation} from './components/validation'

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  activeErrorClass: 'form__input-error_active'
}

/// api
const fetchUser = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
    headers: {
      authorization: 'a5b41191-4295-4942-b6d9-1f6a428d0b55'
    }
  })
    .then(res => res.json());
}

const fetchInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards', {
    headers: {
      authorization: 'a5b41191-4295-4942-b6d9-1f6a428d0b55'
    }
  })
    .then(res => res.json());
}

const openFullImage = (imagePopupData) => {
  placeCardImagePopup.src = imagePopupData.link;
  placeCardImagePopup.alt = imagePopupData.name;
  placeCardCaption.textContent = imagePopupData.name;

  openModal(popupTypeImages);
}

const handleEditProfileFormSubmit = evt => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = jobInput.value;

  closeModal(popupTypeEdit);
};

const prependCard = placeCardElement => {
  placesCardContainer.prepend(placeCardElement);
};

const appendCard = placeCardElement => {
  placesCardContainer.append(placeCardElement);
};

const newCardFormSubmit = evt => {
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
};

const setupEventListeners = () => {
  profileEditButton.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = occupationProfile.textContent;

    openModal(popupTypeEdit);
    clearValidation(editProfileForm, validationConfig);
  });

  profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);

    creatCardForm.reset();
    clearValidation(creatCardForm, validationConfig);
  });

  popups.forEach((popupElement) => {
    const closeButton = popupElement.querySelector('.popup__close');

    popupElement.classList.add('popup_is-animated');

    closeButton.addEventListener('click', () => {
      closeModal(popupElement);
    });

    popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        closeModal(popupElement);
      }
    });
  });

  editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

  creatCardForm.addEventListener('submit', newCardFormSubmit);
};

const renderInitialUser = (user) => {

}

const renderInitialCards = (initialCards) => {
  initialCards.forEach((cardData) => {
    const placeCardElement = createCard(
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

Promise.all([fetchUser(), fetchInitialCards()])
  .then(([user, initialCards]) => {
    renderInitialUser(user);
    renderInitialCards(initialCards);
  });

enableValidation(validationConfig);
