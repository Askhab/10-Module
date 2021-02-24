"use strict";

// 1 - при первой загрузке страницы в блоке с текстом отображается текст по умолчанию (любой);
// Объявление переменных
let textArea = document.querySelector("#textNote"),
    textChangeHistory = document.querySelector("#textNoteHistory"),
    edit = document.querySelector(".editBtn"),
    save = document.querySelector(".saveBtn"),
    cancel = document.querySelector(".cancelBtn"),
    option = document.createElement("option");

// Обработчики событий
window.addEventListener("DOMContentLoaded", getTextHistoryList);
edit.addEventListener("click", editTextArea);
save.addEventListener("click", saveTextChanges);
cancel.addEventListener("click", cancelTextChanges);
textChangeHistory.addEventListener("click", getSavedText);

// Функции

/* 2 - при нажатии на кнопку «Редактировать» блок с текстом становится
 редактируемым (contenteditable=true), кнопки «Сохранить» и «Отмена» 
 становятся активными, а сама кнопка «Редактировать» — неактивной; */

// Функция для кнопки - Редактировать
function editTextArea(event) {
    event.preventDefault();

    textArea.contentEditable = true;
    edit.disabled = true;
    save.disabled = false;
    cancel.disabled = false;
}

/* 3 - при нажатии на кнопку «Сохранить» содержимое блока с текстом 
сохраняется в LocalStorage, а режим редактирования отключается (кнопки 
возвращаются в исходное состояние); */

// Функция для кнопки - Сохранить
function saveTextChanges(event) {
    event.preventDefault();

    let date = new Date(),
        commit = function() {
            let hours = smallNum(date.getHours()),
                minutes = smallNum(date.getMinutes()),
                seconds = smallNum(date.getSeconds()),
                time = `${hours}:${minutes}:${seconds}`;

            function smallNum(num) {
                return (num < 10 ? "0" : "") + num;
            }
            return time;
        };
    // Объект передаваемый в массив
    let obj = {
        title: commit(),
        text: textArea.textContent.trim()
    };
    let saveTime = document.createElement("option");
    saveTime.textContent = obj.title;
    textChangeHistory.prepend(saveTime);

    // Вставляем объект в конец массива
    localStorageArray.push(obj);
    // Отправыляем массив в LS
    localStorage.setItem("storyArray", JSON.stringify(localStorageArray));

    textArea.contentEditable = false;
    edit.disabled = false;
    save.disabled = true;
    cancel.disabled = true;
}

/* 4 - при нажатии на кнопку «Отмена» содержимое блока с текстом заменяется на последний сохраненный вариант изLocalStorage, режим редактирования отключается; */

// Функция для кнопки - Отмена
function cancelTextChanges() {
    let lastEdit = localStorageArray.slice(-1);
    textArea.textContent = lastEdit[0].text;

    textArea.contentEditable = false;
    edit.disabled = false;
    save.disabled = true;
    cancel.disabled = true;
}

// Функция для получения данных в список изменений при первой загрузке/перезагрузке страницы
function getTextHistoryList() {
    let localStorageArray = [];
    let obj = {
        title: "Original text",
        text: textArea.textContent
    };
    option.textContent = obj.title;
    textChangeHistory.prepend(option);
    localStorageArray.push(obj);
    localStorage.setItem("storyArray", JSON.stringify(localStorageArray));

    localStorageArray = JSON.parse(localStorage.getItem("storyArray"));
    for (let item of localStorageArray) {
        option.textContent = item.title;
        textChangeHistory.prepend(option);
    }
    let lastEdit = localStorageArray.slice(-1);
    textArea.textContent = lastEdit[0].text;

    console.log(localStorageArray);
}

// Функция для получения сохраненных состояний текста из LS
function getSavedText(event) {
    let time = event.target.closest("option");
    let key = time.textContent;

    for (let item of localStorageArray) {
        if(key === item.title) {
            textArea.textContent = item.text;
        }
    }
}