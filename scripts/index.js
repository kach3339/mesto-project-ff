const placeCardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

const placesCardContainer = document.querySelector('.places__list');

function addCard(cardTitleValue, cardImageLinkValue) {
  const placeCardElement = placeCardTemplate.cloneNode(true);
  const placeCardTitle = placeCardElement.querySelector('.card__title');
  const placeCardImage = placeCardElement.querySelector('.card__image');
  const placeCardButtonRemove = placeCardElement.querySelector('.card__delete-button');

  placeCardTitle.textContent = cardTitleValue;
  placeCardImage.setAttribute('src', cardImageLinkValue);
  placeCardImage.setAttribute('alt', cardTitleValue);
  
  placeCardButtonRemove.addEventListener('click', function (){
    deleteCard(placeCardElement)
  });
  
  placesCardContainer.append(placeCardElement);
}

const deleteCard = (placeCardElementForDelete) => {
  placeCardElementForDelete.remove();
};

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});
