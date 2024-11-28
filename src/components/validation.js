export const clearValidation = (formElement, config) => {
  const buttonElement = formElement.querySelector(
    config.submitButtonSelector
  );
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError({formElement, inputElement, config});
  });

  toggleButtonState({
    inputList,
    buttonElement,
    inactiveButtonClass: config.inactiveButtonClass
  });
};

const showInputError = ({formElement, inputElement, errorMessage, config}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.activeErrorClass);
};

const hideInputError = ({formElement, inputElement, config}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.activeErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = ({formElement, inputElement, config}) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError({
      formElement,
      inputElement,
      errorMessage: inputElement.validationMessage,
      config
    });
  } else {
    // Если проходит, скроем
    hideInputError({
      formElement,
      inputElement,
      config
    });
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState({
    inputList,
    buttonElement,
    inactiveButtonClass: config.inactiveButtonClass
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity({formElement, inputElement, config});
      toggleButtonState({
        inputList,
        buttonElement,
        inactiveButtonClass: config.inactiveButtonClass
      });
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = ({inputList, buttonElement, inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};
