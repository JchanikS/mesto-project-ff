import './pages/index.css';
import { createCard, deleteCard, toggleLike } from './scripts/cards.js';
import { openModal, closeModal, setupModalCloseHandlers } from './scripts/modal.js';
import { initialCards } from './scripts/constants.js';  

document.addEventListener('DOMContentLoaded', () => {
  // DOM элементы
  const cardsContainer = document.querySelector('.places__list');
  const newCardForm = document.forms['new-place'];
  const addButton = document.querySelector('.profile__add-button');
  const imageModal = document.querySelector('.popup_type_image');

  // Проверка наличия элементов
  if (!cardsContainer || !newCardForm || !addButton || !imageModal) {
    console.error('Не найдены необходимые DOM элементы!');
    return;
  }

  // Обработчик открытия изображения
  function handleImageClick(cardData) {
    imageModal.querySelector('.popup__image').src = cardData.link;
    imageModal.querySelector('.popup__caption').textContent = cardData.name;
    openModal(imageModal);
  }

  // Обработчик формы добавления карточки
  function handleNewCardSubmit(evt) {
    evt.preventDefault();
    
    const newCard = {
      name: newCardForm.elements['place-name'].value,
      link: newCardForm.elements.link.value
    };
    
    if (!newCard.name || !newCard.link) {
      alert('Заполните все поля!');
      return;
    }
    
    cardsContainer.prepend(
      createCard(newCard, deleteCard, toggleLike, handleImageClick)
    );
    newCardForm.reset();
    closeModal(document.querySelector('.popup_type_new-card'));
  }

  // Инициализация событий
  addButton.addEventListener('click', () => {
    newCardForm.reset();
    openModal(document.querySelector('.popup_type_new-card'));
  });

  newCardForm.addEventListener('submit', handleNewCardSubmit);
  setupModalCloseHandlers();
  
  // Рендер начальных карточек
  initialCards.forEach(card => {
    cardsContainer.append(
      createCard(card, deleteCard, toggleLike, handleImageClick)
    );
  });
});
