// @todo: Темплейт карточки
const placeCardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesCardContainer = document.querySelector('.places__list');
const placeCardElement = placeCardTemplate.querySelector('.places__item');



// @todo: Функция создания карточки
function addCard(cardTitleValue, cardImageLinkValue) {
  const placeCardElementCopy = placeCardElement.cloneNode(true);
  const placeCardTitle = placeCardElementCopy.querySelector('.card__title');
  const placeCardImage = placeCardElementCopy.querySelector('.card__image');
  const placeCardButtonRemove = placeCardElementCopy.querySelector('.card__delete-button');

  placeCardTitle.textContent = cardTitleValue;
  placeCardImage.setAttribute('src', cardImageLinkValue);
  placeCardImage.setAttribute('alt', cardTitleValue);

  placesCardContainer.append(placeCardElementCopy);
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});
