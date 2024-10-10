const placeCardTemplate = document.querySelector('#card-template').content;

const placesCardContainer = document.querySelector('.places__list');
const placeCardElement = placeCardTemplate.querySelector('.places__item');

function addCard(cardTitleValue, cardImageLinkValue) {
  const placeCardElementCopy = placeCardElement.cloneNode(true);
  const placeCardTitle = placeCardElementCopy.querySelector('.card__title');
  const placeCardImage = placeCardElementCopy.querySelector('.card__image');
  const placeCardButtonRemove = placeCardElementCopy.querySelector('.card__delete-button');

  placeCardTitle.textContent = cardTitleValue;
  placeCardImage.setAttribute('src', cardImageLinkValue);
  placeCardImage.setAttribute('alt', cardTitleValue);
  
  placeCardButtonRemove.addEventListener('click', function (){
    deleteCard(placeCardElementCopy)
  });
  
  placesCardContainer.append(placeCardElementCopy);
}

const deleteCard = (placeCardElement) => {
  placeCardElement.remove();
};

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});
