'use strict';

let text = document.querySelector('#textNote'),
    textChangeHistory = document.querySelector('#textNoteHistory'),
    storageArray = [],
    edit = document.querySelector('.editBtn'),
    save = document.querySelector('.saveBtn'),
    cancel = document.querySelector('.cancelBtn'),
    option = document.createElement('option');

// Обработчики событий
document.addEventListener('DOMContentLoaded', getStorageHistory);
edit.addEventListener('click', editTextNote);
save.addEventListener('click', saveTextChanges);
cancel.addEventListener('click', cancelTextChanges);

// Функции
function editTextNote(event) {
    event.preventDefault();

    text.contentEditable = true;
    edit.disabled = true;
    save.disabled = false;
    cancel.disabled = false;
}

function saveTextChanges(event) {
    event.preventDefault();

    const title = localStorage.length + 1,
          textData = JSON.stringify(text.textContent);

    localStorage.setItem(title, textData);
    option.textContent = JSON.parse(title);
    textChangeHistory.prepend(option);

    text.contentEditable = false;
    edit.disabled = false;
    save.disabled = true;
    cancel.disabled = true;
}

function cancelTextChanges(event) {
    event.preventDefault();

    text.contentEditable = true;
    edit.disabled = true;
    save.disabled = false;
    cancel.disabled = false;

    text.textContent = storageArray.pop();
}

function getStorageHistory(event) {
    event.preventDefault();

    
}

function getItemByName(name) {
    for(let i = 0; i < localStorage.length; i++) {
        if(name === localStorage.key(i)) {
            console.log(localStorage.key(i));
        }
    }
}