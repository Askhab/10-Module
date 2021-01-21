'use strict';

let text = document.querySelector('#textNote'),
    textChangeHistory = document.querySelector('#textNoteHistory'),
    storageArray = [],
    edit = document.querySelector('.editBtn'),
    save = document.querySelector('.saveBtn'),
    cancel = document.querySelector('.cancelBtn');

// Обработчики событий
document.addEventListener('DOMContentLoaded', getStorageHistory);
edit.addEventListener('click', editTextNote);
save.addEventListener('click', saveTextChanges);
cancel.addEventListener('click', cancelTextChanges);

// Функции
function editTextNote(event) {
    text.contenteditable = true;
    edit.disabled = true;
    save.disabled = false;
    cancel.disabled = false;

    event.preventDefault();
}

function saveTextChanges(event) {
    const option = document.createElement('option');
    const commit = new Date();

    localStorage.setItem(commit, text.textContent);
    option.textContent = commit;
    textChangeHistory.prepend(option);
    

    text.contenteditable = false;
    edit.disabled = false;
    save.disabled = true;
    cancel.disabled = true;

    event.preventDefault();
}

function cancelTextChanges(event) {
    edit.disabled = true;

    event.preventDefault();
}

function getStorageHistory(event) {
    let key;
    let option = document.createElement('option');

    for(let i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        option.textContent = key;
        textChangeHistory.prepend(option);
    }

    event.preventDefault();
}

// https://learn.javascript.ru/form-elements
// 1 - при первой загрузке страницы в блоке с текстом отображается текст по умолчанию (любой);
// 2 - при нажатии на кнопку «Редактировать» блок с текстом становится
//  редактируемым (contenteditable=true), кнопки «Сохранить» и «Отмена» 
//  становятся активными, а сама кнопка «Редактировать» — неактивной;
// 3 - при нажатии на кнопку «Сохранить» содержимое блока с текстом 
// сохраняется в LocalStorage, а режим редактирования отключается (кнопки 
// возвращаются в исходное состояние);
// 4 - при нажатии на кнопку «Отмена» содержимое блока с текстом заменяется
//  на последний сохраненный вариант изLocalStorage, режим редактирования отключается;
// 5 - При следующих перезагрузках страницы содержимое блока с текстом 
// автоматически подтягивается из LocalStorage (последний сохраненный вариант).