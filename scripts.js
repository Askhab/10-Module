'use strict';

let text = document.querySelector('#textNote'),
    textChangeHistory = document.querySelector('#textNoteHistory'),
    storageArray = [],
    edit = document.querySelector('.editBtn'),
    save = document.querySelector('.saveBtn'),
    cancel = document.querySelector('.cancelBtn');

// Обработчики событий
edit.addEventListener('click', editTextNote);
save.addEventListener('click', saveTextChanges);
cancel.addEventListener('click', cancelTextChanges);
textChangeHistory.addEventListener('onpageload', );

// Функции
function editTextNote(event) {
    text.setAttribute('contenteditable', 'true');
    edit.setAttribute('disabled', 'disabled');
    save.removeAttribute('disabled');
    cancel.removeAttribute('disabled');

    event.preventDefault();
}

function saveTextChanges(event) {
    const option = document.createElement('option');
    const commit = new Date();

    option.textContent = commit;
    textChangeHistory.append(option);
    localStorage.setItem(commit, text.textContent);

    text.removeAttribute('contenteditable');
    edit.removeAttribute('disabled');
    save.setAttribute('disabled', 'disabled');
    cancel.setAttribute('disabled', 'disabled');

    event.preventDefault();
}

function cancelTextChanges(event) {
    edit.setAttribute('disabled', 'disabled');

    event.preventDefault();
}




// 1 - при первой загрузке страницы в блоке с текстом отображается текст по умолчанию (любой);
// 2 - при нажатии на кнопку «Редактировать» блок с текстом становится редактируемым (contenteditable=true), кнопки «Сохранить» и «Отмена» становятся активными, а сама кнопка «Редактировать» — неактивной;
// 3 - при нажатии на кнопку «Сохранить» содержимое блока с текстом сохраняется в LocalStorage, а режим редактирования отключается (кнопки возвращаются в исходное состояние);
// 4 - при нажатии на кнопку «Отмена» содержимое блока с текстом заменяется на последний сохраненный вариант изLocalStorage, режим редактирования отключается;
// 5 - При следующих перезагрузках страницы содержимое блока с текстом автоматически подтягивается из LocalStorage (последний сохраненный вариант).