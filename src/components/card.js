import {initialCards} from "../cards";
import {placeCardTemplate, placesCardContainer} from '../index';
import {openModal} from "./modal";

export function createCard(cardData) {
  const placeCardElement = placeCardTemplate.cloneNode(true);
  const placeCardTitle = placeCardElement.querySelector('.card__title');
  const placeCardImage = placeCardElement.querySelector('.card__image');
  const placeCardButtonRemove = placeCardElement.querySelector('.card__delete-button');
  const popupTypeImages = document.querySelector('.popup_type_image');

  placeCardTitle.textContent = cardData.name;
  placeCardImage.src = cardData.link;
  placeCardImage.alt = cardData.name;

  placeCardImage.addEventListener('click', () => {
    openModal(popupTypeImages);
  })

  placeCardButtonRemove.addEventListener('click', function (){
    deleteCard(placeCardElement)
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

export const renderInitialCards = () => {
  initialCards.forEach((cardData) => {
    const placeCardElement  = createCard(cardData);
    appendCard(placeCardElement);
  });
}
