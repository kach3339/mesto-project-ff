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
const popupTypeImages = document.querySelector('.popup_type_image');
const popupTypeCardDelete = document.querySelector('.popup_type_card-delete');
const editProfileForm = document.forms['edit-profile'];
const createCardForm = document.forms['new-place'];
const deleteCardForm = document.forms['delete-card'];

const nameProfile = document.querySelector('.profile__title')
const occupationProfile = document.querySelector('.profile__description');
const imageProfile = document.querySelector('.profile__image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');
const placesCardContainer = document.querySelector('.places__list');
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

const submitUserInfo = (nameInputText,jobInputText) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'a5b41191-4295-4942-b6d9-1f6a428d0b55',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInputText,
      about: jobInputText
    })
  })
    .then(res => res.json());
}

const submitNewCard = (cardName, cardLink) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards', {
    method: 'POST',
    headers: {
      authorization: 'a5b41191-4295-4942-b6d9-1f6a428d0b55',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
    .then(res => res.json());
}

const deleteCardById = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'a5b41191-4295-4942-b6d9-1f6a428d0b55',
      'Content-Type': 'application/json'
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

const openCardDeleteModal = (cardId) => {
  const submitButton = popupTypeCardDelete.querySelector('.popup__button');
  submitButton.dataset.cardId = cardId;

  openModal(popupTypeCardDelete);
}

const handleEditProfileFormSubmit = evt => {
  evt.preventDefault();

  submitUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      renderUser(user);
    });

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

  submitNewCard(placeNameInput.value, placeLinkInput.value)
    .then(card => {
      const placeCardElement = createCard(
        {
          cardData: card,
          showRemoveButton: true,
          eventListeners: {
            openFullImage,
            deleteClick: openCardDeleteModal,
            likeClick
          }
        }
      );

      prependCard(placeCardElement);
    });

  placeNameInput.value = '';
  placeLinkInput.value = '';

  closeModal(popupTypeNewCard);
};

const deleteCardFormSubmit = evt => {
  evt.preventDefault();

  const submitButton = popupTypeCardDelete.querySelector('.popup__button');
  const cardId = submitButton.dataset.cardId;
  const cardElementToDelete = document.getElementById(cardId);

  deleteCardById(cardId)
    .then(()=> {
      deleteCard(cardElementToDelete);
      closeModal(popupTypeCardDelete);
    });
}

const setupEventListeners = () => {
  profileEditButton.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = occupationProfile.textContent;

    openModal(popupTypeEdit);
    clearValidation(editProfileForm, validationConfig);
  });

  profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);

    createCardForm.reset();
    clearValidation(createCardForm, validationConfig);
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

  createCardForm.addEventListener('submit', newCardFormSubmit);

  deleteCardForm.addEventListener('click', deleteCardFormSubmit);
};

const renderUser = (user) => {
  nameProfile.textContent = user.name;
  occupationProfile.textContent = user.about;
  imageProfile.style.backgroundImage = `url('${user.avatar}')`;
}

const renderCards = (initialCards, user) => {
  initialCards.forEach((cardData) => {
    const showRemoveButton = user._id === cardData.owner._id;
    const placeCardElement = createCard({
      cardData,
      showRemoveButton,
      eventListeners: {
        openFullImage,
        deleteClick: openCardDeleteModal,
        likeClick
      }
    });
    appendCard(placeCardElement);
  });
};

setupEventListeners();

Promise.all([fetchUser(), fetchInitialCards()])
  .then(([user, initialCards]) => {
    renderUser(user);
    renderCards(initialCards, user);
  });

enableValidation(validationConfig);
