'use strict';

let text = document.querySelector('#textNote'),
    textChangeHistory = document.querySelector('.textNoteHistory'),
    commit = new Date(),
    edit = document.querySelector('.editBtn'),
    save = document.querySelector('.saveBtn'),
    cancel = document.querySelector('.cancelBtn');

// Обработчики событий
edit.addEventListener('click', editTextNote);
save.addEventListener('click', saveTextChanges);
cancel.addEventListener('click', cancelTextChanges);

// Функции
function editTextNote(event) {
    text.setAttribute('contenteditable', 'true');
    save.removeAttribute('disabled');
    cancel.removeAttribute('disabled');
    
    edit.removeEventListener('click', editTextNote);
    edit.setAttribute('disabled', 'disabled');

    event.preventDefault();
}

function saveTextChanges(event) {
    localStorage.setItem(commit, text.textContent);
    text.removeAttribute('contenteditable');
    edit.removeAttribute('disabled');
    save.setAttribute('disabled', 'disabled');
    cancel.setAttribute('disabled', 'disabled');

    event.preventDefault();
}

function cancelTextChanges(event) {
    edit.setAttribute('disabled', 'disabled');
    text.textContent = localStorage.getItem();

    event.preventDefault();
}

function changeAttribute() {
    edit.setAttribute('disabled');
}