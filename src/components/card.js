const placeCardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

export function createCard({cardData, showRemoveButton, eventListeners}) {
  const placeCardElement = placeCardTemplate.cloneNode(true);
  const placeCardTitle = placeCardElement.querySelector('.card__title');
  const placeCardImage = placeCardElement.querySelector('.card__image');
  const placeCardButtonRemove = placeCardElement.querySelector('.card__delete-button');
  const likeButton = placeCardElement.querySelector('.card__like-button');
  const likesQuantity = placeCardElement.querySelector('.card__like-quantity');

  placeCardElement.id = cardData._id;
  placeCardTitle.textContent = cardData.name;
  placeCardImage.src = cardData.link;
  placeCardImage.alt = cardData.name;
  likesQuantity.textContent = cardData.likes.length;

  if (!showRemoveButton) {
    placeCardButtonRemove.remove();
  }

  placeCardImage.addEventListener('click', () => {
    eventListeners.openFullImage({
      name: cardData.name,
      link: cardData.link
    });
  });

  placeCardButtonRemove.addEventListener('click', function (){
    eventListeners.deleteClick(cardData._id);
  });

  likeButton.addEventListener('click', function (){
    eventListeners.likeClick(likeButton);
  });

  return placeCardElement;
}

export const deleteCard = (placeCardElementForDelete) => {
  placeCardElementForDelete.remove();
};

export const likeClick = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
};

