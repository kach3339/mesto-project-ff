const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const placeCardImage = document.querySelector('.card__image');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms['edit-profile'];

export function openModal (popup){
  popup.classList.add('popup_is-opened');
}

export function closeModal (){
  const popup = document.querySelector('.popup_is-opened');
  popup.classList.remove('popup_is-opened');
}