import {initialCards} from "../cards";
import {openModal} from './modal';

const placeCardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

const placesCardContainer = document.querySelector('.places__list');

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

const deleteCard = (placeCardElementForDelete) => {
  placeCardElementForDelete.remove();
};



initialCards.forEach((cardData) => {
  const placeCardElement  = createCard(cardData);
  placesCardContainer.append(placeCardElement);
});