'use strict';
// 1 - при первой загрузке страницы в блоке с текстом отображается текст по умолчанию (любой);
let text = document.querySelector('#textNote'),
    textChangeHistory = document.querySelector('#textNoteHistory'),
    changeHistoryArray = [],
    historyArrayObject = {},
    date = new Date(),
    option = document.createElement('option'),
    edit = document.querySelector('.editBtn'),
    save = document.querySelector('.saveBtn'),
    cancel = document.querySelector('.cancelBtn');

// Обработчики событий
// window.addEventListener('DOMContentLoaded', );
edit.addEventListener('click', editTextNote);
save.addEventListener('click', saveTextChanges);
cancel.addEventListener('click', cancelTextChanges);

// Функции

// 2 - при нажатии на кнопку «Редактировать» блок с текстом становится редактируемым 
// (contenteditable=true), кнопки «Сохранить» и «Отмена» становятся активными,
//  а сама кнопка «Редактировать» — неактивной;
function editTextNote(event) {
    event.preventDefault();

    text.contentEditable = true;
    edit.disabled = true;
    save.disabled = false;
    cancel.disabled = false;
}

// 3 - при нажатии на кнопку «Сохранить» содержимое блока с текстом сохраняется в LocalStorage,
//  а режим редактирования отключается (кнопки возвращаются в исходное состояние);
function saveTextChanges(event) {
    event.preventDefault();
    let commit = function() {
        let hour = smallNum(date.getHours());
        let minute = smallNum(date.getMinutes());
        let second = smallNum(date.getSeconds());
        let time = `${hour}:${minute}:${second}`;

        function smallNum(num) {
            return (num < 10 ? "0" : "") + num;
        }
        
        return time;
    };

    historyArrayObject = {
        id: commit(),
        text: text.textContent,
    };

    changeHistoryArray.push(historyArrayObject);
    let key = JSON.stringify(historyArrayObject.id);
    let value = JSON.stringify(historyArrayObject.text);
    localStorage.setItem(key, value);
    console.log(changeHistoryArray);
    
    text.contenteditable = false;
    edit.disabled = false;
    save.disabled = true;
    cancel.disabled = true;
}

// 4 - при нажатии на кнопку «Отмена» содержимое блока с текстом заменяется на 
// последний сохраненный вариант изLocalStorage, режим редактирования отключается;
function cancelTextChanges(event) {
    event.preventDefault();
    getArrayFromLS();
    let lastEdit = changeHistoryArray.pop();
    text.textContent = lastEdit.text;

    edit.disabled = true;
}

function getArrayFromLS() {
    for(let i = 0; i < localStorage.length; i++) {
        let title = JSON.parse(localStorage.key(i)),
            content = JSON.parse(localStorage.getItem(title)),
            obj = {
                title: title,
                text: content,
            };

        changeHistoryArray.push(obj);
    }
}

// 5 - При следующих перезагрузках страницы содержимое блока с текстом 
// автоматически подтягивается из LocalStorage (последний сохраненный вариант).