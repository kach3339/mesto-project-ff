import {initialCards} from "../cards";
import {placeCardCaption, placeCardImagePopup, placeCardTemplate, placesCardContainer, popupTypeImages} from '../index';
import {openModal} from "./modal";

export function createCard(cardData, eventListeners) {
  const placeCardElement = placeCardTemplate.cloneNode(true);
  const placeCardTitle = placeCardElement.querySelector('.card__title');
  const placeCardImage = placeCardElement.querySelector('.card__image');
  const placeCardButtonRemove = placeCardElement.querySelector('.card__delete-button');
  const likeButton = placeCardElement.querySelector('.card__like-button');

  placeCardTitle.textContent = cardData.name;
  placeCardImage.src = cardData.link;
  placeCardImage.alt = cardData.name;

  placeCardImage.addEventListener('click', () => {
    placeCardImagePopup.forEach((placeCardImg) => {
      placeCardImg.src = cardData.link;
      placeCardImg.alt = cardData.name;
    });
    placeCardCaption.forEach((placeCaption) => {
      placeCaption.textContent = cardData.name;
    });
    eventListeners.openFullImage();
  });

  placeCardButtonRemove.addEventListener('click', function (){
    eventListeners.deleteCard(placeCardElement);
  });

  likeButton.addEventListener('click', function (){
    eventListeners.likeClick(likeButton);
  });

  return placeCardElement;
}

export function prependCard(placeCardElement) {
  placesCardContainer.prepend(placeCardElement);
}

export function appendCard(placeCardElement) {
  placesCardContainer.append(placeCardElement);
}

export const deleteCard = (placeCardElementForDelete) => {
  placeCardElementForDelete.remove();
};

export const openFullImage = (cardData) => {
  openModal(popupTypeImages);
}

export const likeClick = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
};

export const renderInitialCards = () => {
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
