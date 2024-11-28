const placeCardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
const placeCardIsActiveClassName = 'card__like-button_is-active'

const toggleCardLikeClassName = (likeButton) => {
  likeButton.classList.toggle(placeCardIsActiveClassName);
}

export function createCard({cardData, currentUserId, eventListeners}) {
  const placeCardElement = placeCardTemplate.cloneNode(true);
  const placeCardTitle = placeCardElement.querySelector('.card__title');
  const placeCardImage = placeCardElement.querySelector('.card__image');
  const placeCardButtonRemove = placeCardElement.querySelector('.card__delete-button');
  const likeButton = placeCardElement.querySelector('.card__like-button');
  const likesQuantity = placeCardElement.querySelector('.card__like-quantity');

  const isLikedByCurrentUser = cardData.likes.some((like) => {
    return like._id === currentUserId;
  });
  const showRemoveButton = currentUserId === cardData.owner._id;

  placeCardElement.id = cardData._id;
  placeCardTitle.textContent = cardData.name;
  placeCardImage.src = cardData.link;
  placeCardImage.alt = cardData.name;
  likesQuantity.textContent = cardData.likes.length;

  if (isLikedByCurrentUser) {
    toggleCardLikeClassName(likeButton);
  }

  if (showRemoveButton) {
    placeCardButtonRemove.addEventListener('click', function () {
      eventListeners.deleteClick(cardData._id);
    });
  } else {
    placeCardButtonRemove.remove();
  }

  placeCardImage.addEventListener('click', () => {
    eventListeners.openFullImage({
      name: cardData.name,
      link: cardData.link
    });
  });

  likeButton.addEventListener('click', function (){
    eventListeners.likeClick(
      cardData._id,
      likeButton
    )
  });

  return placeCardElement;
}

export const getIsCardLiked = (likeButton) => {
  return likeButton.classList.contains(placeCardIsActiveClassName)
};

export const updateCardLikesData = (cardData, likeButton) => {
  const placeCardElement = document.getElementById(cardData._id);
  const likesQuantity = placeCardElement.querySelector('.card__like-quantity');

  toggleCardLikeClassName(likeButton);
  likesQuantity.textContent = cardData.likes.length;
}

export const deleteCard = (placeCardElementForDelete) => {
  placeCardElementForDelete.remove();
};
