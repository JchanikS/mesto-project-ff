import './pages/index.css';
import { createCard, deleteCard, toggleLike } from './scripts/cards.js';
import { openModal, closeModal, setupModalCloseHandlers } from './scripts/modal.js';
import { initialCards } from './scripts/constants.js';

document.addEventListener('DOMContentLoaded', () => {
  //  DOM-элементы
  const cardsContainer = document.querySelector('.places__list');
  const newCardForm = document.forms['new-place'];
  const newCardModal = document.querySelector('.popup_type_new-card');
  const addButton = document.querySelector('.profile__add-button');

  const imageModal = document.querySelector('.popup_type_image');
  const popupImage = imageModal?.querySelector('.popup__image');
  const popupCaption = imageModal?.querySelector('.popup__caption');

  const editProfileButton = document.querySelector('.profile__edit-button');
  const editProfileModal = document.querySelector('.popup_type_edit');
  const editProfileForm = document.forms['edit-profile'];
  const nameInput = editProfileForm.elements['name'];
  const descriptionInput = editProfileForm.elements['description'];

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  //  Проверка необходимых элементов
  if (
    !cardsContainer ||
    !newCardForm ||
    !addButton ||
    !imageModal ||
    !popupImage ||
    !popupCaption ||
    !newCardModal ||
    !editProfileButton ||
    !editProfileModal ||
    !editProfileForm ||
    !nameInput ||
    !descriptionInput ||
    !profileTitle ||
    !profileDescription
  ) {
    console.error(' Не найдены необходимые DOM элементы!');
    return;
  }

  //  Обработчик открытия изображения
  function handleImageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imageModal);
  }

  //  Обработчик открытия формы редактирования профиля
  editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editProfileModal);
  });

  //  Обработчик отправки формы профиля
  editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editProfileModal);
  });

  //  Обработчик открытия формы добавления карточки
  addButton.addEventListener('click', () => {
    newCardForm.reset();
    openModal(newCardModal);
  });

  //  Обработчик формы добавления карточки
  newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const newCard = {
      name: newCardForm.elements['place-name'].value,
      link: newCardForm.elements.link.value
    };

    if (!newCard.name || !newCard.link) {
      alert('Заполните все поля!');
      return;
    }

    const cardElement = createCard(newCard, deleteCard, toggleLike, handleImageClick);
    cardsContainer.prepend(cardElement);
    newCardForm.reset();
    closeModal(newCardModal);
  });

  //  Закрытие всех попапов
  setupModalCloseHandlers();

  //  Рендер начальных карточек
  initialCards.forEach(card => {
    const cardElement = createCard(card, deleteCard, toggleLike, handleImageClick);
    cardsContainer.append(cardElement);
  });
});