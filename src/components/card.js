const placeCardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

const toggleLike = ({
  cardId,
  likeButton,
  likeClick
}) => {
  const activeClass = 'card__like-button_is-active'

  likeButton.classList.toggle(activeClass);

  const isLiked = likeButton.classList.contains(activeClass)

  likeClick(
    cardId,
    isLiked
  );
};

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
    toggleLike({
      cardId: cardData._id,
      likeButton,
      likeClick: eventListeners.likeClick
    })
  });

  return placeCardElement;
}

export const updateCardLikesQuantity = (cardData) => {
  const placeCardElement = document.getElementById(cardData._id);
  const likesQuantity = placeCardElement.querySelector('.card__like-quantity');

  likesQuantity.textContent = cardData.likes.length;
}

export const deleteCard = (placeCardElementForDelete) => {
  placeCardElementForDelete.remove();
};
