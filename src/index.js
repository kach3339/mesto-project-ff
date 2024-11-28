import './pages/index.css';
import {openModal, closeModal, startModalSubmitting} from './components/modal';
import {
  createCard,
  deleteCard, getIsCardLiked,
  updateCardLikesData
} from './components/card';
import {enableValidation, clearValidation} from './components/validation'
import {
  deleteCardById,
  fetchInitialCards,
  fetchUser,
  submitUserInfo,
  submitUserAvatar,
  submitNewCard,
  addLikeByCardId,
  deleteLikeByCardId
} from './components/api';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImages = document.querySelector('.popup_type_image');
const popupTypeCardDelete = document.querySelector('.popup_type_card-delete');
const popupTypeAvatarEdit = document.querySelector('.popup_type_avatar');
const editProfileForm = document.forms['edit-profile'];
const createCardForm = document.forms['new-place'];
const deleteCardForm = document.forms['delete-card'];
const editAvatarForm = document.forms['change-avatar'];

const nameProfile = document.querySelector('.profile__title');
const occupationProfile = document.querySelector('.profile__description');
const imageProfile = document.querySelector('.profile__image');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar-url');
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

let currentUserId = '';

const handleCardLikeClick = (cardId, likeButton) => {
  const prevIsLiked = getIsCardLiked(likeButton)
  const nextIsLiked = !prevIsLiked

  const toggleLikePromise = nextIsLiked
    ? addLikeByCardId(cardId)
    : deleteLikeByCardId(cardId)

  toggleLikePromise.then((cardData) => {
    updateCardLikesData(cardData, likeButton)
  })
}

const openFullImageModal = (imagePopupData) => {
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

const handleEditAvatarFormSubmit = evt => {
  evt.preventDefault();

  const { completeModalSubmitting } = startModalSubmitting(popupTypeAvatarEdit);

  submitUserAvatar(avatarUrlInput.value)
    .then((user) => {
      updateUserData(user);

      closeModal(popupTypeAvatarEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      completeModalSubmitting();
    });
};

const handleEditProfileFormSubmit = evt => {
  evt.preventDefault();

  const { completeModalSubmitting } = startModalSubmitting(popupTypeEdit);

  submitUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      updateUserData(user);

      closeModal(popupTypeEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      completeModalSubmitting();
    });
};

const newCardFormSubmit = evt => {
  evt.preventDefault();

  const { completeModalSubmitting } = startModalSubmitting(popupTypeNewCard);

  submitNewCard(placeNameInput.value, placeLinkInput.value)
    .then(card => {
      const placeCardElement = createCard(
        {
          cardData: card,
          currentUserId,
          eventListeners: {
            openFullImage: openFullImageModal,
            deleteClick: openCardDeleteModal,
            likeClick: handleCardLikeClick
          }
        }
      );

      prependCard(placeCardElement);

      placeNameInput.value = '';
      placeLinkInput.value = '';

      closeModal(popupTypeNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      completeModalSubmitting();
    });
};

const deleteCardFormSubmit = evt => {
  evt.preventDefault();

  const submitButton = popupTypeCardDelete.querySelector('.popup__button');
  const cardId = submitButton.dataset.cardId;
  const cardElementToDelete = document.getElementById(cardId);

  const { completeModalSubmitting } = startModalSubmitting(popupTypeCardDelete, 'Удаление...');

  deleteCardById(cardId)
    .then(()=> {
      deleteCard(cardElementToDelete);

      closeModal(popupTypeCardDelete);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      completeModalSubmitting();
    });
}

const prependCard = placeCardElement => {
  placesCardContainer.prepend(placeCardElement);
};

const appendCard = placeCardElement => {
  placesCardContainer.append(placeCardElement);
};

const updateUserData = (user) => {
  currentUserId = user._id;

  nameProfile.textContent = user.name;
  occupationProfile.textContent = user.about;
  imageProfile.style.backgroundImage = `url('${user.avatar}')`;
}

const setupEventListeners = () => {
  imageProfile.addEventListener('click', () => {
    openModal(popupTypeAvatarEdit);

    editAvatarForm.reset();
    clearValidation(editAvatarForm, validationConfig);
  })

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

  editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit);

  editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

  createCardForm.addEventListener('submit', newCardFormSubmit);

  deleteCardForm.addEventListener('click', deleteCardFormSubmit);
};

const renderCards = (initialCards, user) => {
  initialCards.forEach((cardData) => {
    const placeCardElement = createCard({
      cardData,
      currentUserId: user._id,
      eventListeners: {
        openFullImage: openFullImageModal,
        deleteClick: openCardDeleteModal,
        likeClick: handleCardLikeClick
      }
    });
    appendCard(placeCardElement);
  });
};

setupEventListeners();

Promise.all([fetchUser(), fetchInitialCards()])
  .then(([user, initialCards]) => {
    updateUserData(user);
    renderCards(initialCards, user);
  })
  .catch((err) => console.log(err));

enableValidation(validationConfig);
