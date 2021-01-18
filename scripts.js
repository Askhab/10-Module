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
    text.setAttribute("contenteditable", "true");
    save.removeAttribute("disabled");
    cancel.removeAttribute("disabled");
    
    changeAttribute();
    event.preventDefault();
}

function saveTextChanges(event) {

    event.preventDefault();
}

function cancelTextChanges(event) {

    event.preventDefault();
}

function changeAttribute() {
    edit.setAttribute("disabled");
}