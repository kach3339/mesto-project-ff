const placeCardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

const placesCardContainer = document.querySelector('.places__list');

function createCard(item) {
  const placeCardElement = placeCardTemplate.cloneNode(true);
  const placeCardTitle = placeCardElement.querySelector('.card__title');
  const placeCardImage = placeCardElement.querySelector('.card__image');
  const placeCardButtonRemove = placeCardElement.querySelector('.card__delete-button');

  placeCardTitle.textContent = item.name;
  placeCardImage.src = item.link;
  placeCardImage.alt = item.name;
  
  placeCardButtonRemove.addEventListener('click', function (){
    deleteCard(placeCardElement)
  });
  
  return placeCardElement;
}

const deleteCard = (placeCardElementForDelete) => {
  placeCardElementForDelete.remove();
};

initialCards.forEach((item) => {
  const placeCardElement  = createCard(item);
  placesCardContainer.append(placeCardElement);
});
