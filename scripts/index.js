document.addEventListener('DOMContentLoaded', () => {
  // @todo: DOM узлы
  const cardTemplate = document.querySelector('#card-template');
  const cardsContainer = document.querySelector('.places__list');
  const newCardForm = document.forms['new-place'];
  const addButton = document.querySelector('.profile__add-button');
  
  // Проверка наличия DOM элементов
  if (!cardTemplate || !cardsContainer || !newCardForm || !addButton) {
    console.error('Не найдены необходимые DOM элементы!');
    return;
  }

  // @todo: Функции управления попапами (вспомогательные)
  function openPopup(popup) {
    document.querySelectorAll('.popup').forEach(p => p.classList.remove('popup_is-opened'));
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
  }

  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
  }

  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) closePopup(openedPopup);
    }
  }

  // @todo: Функция создания карточки
  function createCard(cardData) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    
    // Заполнение данных карточки
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    // @todo: Функция удаления карточки
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
      cardElement.remove();
    });
    
    // Обработчик лайка
    cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_is-active');
    });
    
    // Открытие попапа с изображением
    cardImage.addEventListener('click', () => {
      const imagePopup = document.querySelector('.popup_type_image');
      if (!imagePopup) return;
      
      imagePopup.querySelector('.popup__image').src = cardData.link;
      imagePopup.querySelector('.popup__caption').textContent = cardData.name;
      openPopup(imagePopup);
    });
    
    return cardElement;
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
    
    cardsContainer.prepend(createCard(newCard));
    newCardForm.reset();
    closePopup(document.querySelector('.popup_type_new-card'));
  }

  // Инициализация обработчиков закрытия попапов
  function setupPopupCloseHandlers() {
    // Закрытие по крестику
    document.querySelectorAll('.popup__close').forEach(btn => {
      btn.addEventListener('click', () => closePopup(btn.closest('.popup')));
    });
    
    // Закрытие по клику на оверлей
    document.querySelectorAll('.popup').forEach(popup => {
      popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup(popup);
      });
    });
  }

  // Инициализация событий
  addButton.addEventListener('click', () => {
    newCardForm.reset();
    openPopup(document.querySelector('.popup_type_new-card'));
  });

  newCardForm.addEventListener('submit', handleNewCardSubmit);
  setupPopupCloseHandlers();
  
  // @todo: Вывести карточки на страницу
  if (initialCards && initialCards.length) {
    initialCards.forEach(card => {
      cardsContainer.append(createCard(card));
    });
  }
});