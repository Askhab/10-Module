"use strict";
// 1 - при первой загрузке страницы в блоке с текстом отображается текст по умолчанию (любой);
// Объявление переменных
let text = document.querySelector("#textNote"),
    textChangeHistory = document.querySelector("#textNoteHistory"),
    changeHistoryArray = [],
    localStorageArray = [],
    option = document.createElement("option"),
    edit = document.querySelector(".editBtn"),
    save = document.querySelector(".saveBtn"),
    cancel = document.querySelector(".cancelBtn");

// Обработчики событий
window.addEventListener("DOMContentLoaded", getTextHistoryList);
edit.addEventListener("click", editTextNote);
save.addEventListener("click", saveTextChanges);
cancel.addEventListener("click", cancelTextChanges);
textChangeHistory.addEventListener("click", getSavedText);

// Функции

/* 2 - при нажатии на кнопку «Редактировать» блок с текстом становится редактируемым (contenteditable=true), кнопки «Сохранить» и «Отмена» становятся активными, а сама кнопка «Редактировать» — неактивной; */

// Функция для кнопки - Редактировать
function editTextNote(event) {
    event.preventDefault();

    text.contentEditable = true;
    edit.disabled = true;
    save.disabled = false;
    cancel.disabled = false;
}

/* 3 - при нажатии на кнопку «Сохранить» содержимое блока с текстом сохраняется в LocalStorage, а режим редактирования отключается (кнопки возвращаются в исходное состояние); */

// Функция для кнопки - Сохранить
function saveTextChanges(event) {
    event.preventDefault();

    // Переменные для определения времени внесения изменений при сохранении текста
    let date = new Date(),
        commit = function() {
            let hour = smallNum(date.getHours());
            let minute = smallNum(date.getMinutes());
            let second = smallNum(date.getSeconds());
            let time = `${hour}:${minute}:${second}`;
            // Тернарный оператор как условие в функции, для добавления знака - 0 перед числами меньше - 10
            function smallNum(num) {
                return (num < 10 ? "0" : "") + num;
        }
            return time;
        };

    // Объект передаваемый в массив
    let obj = {
        id: commit(),
        text: text.textContent.trim(),
    };
    let saveTime = document.createElement("option");
    saveTime.textContent = obj.id;
    textChangeHistory.prepend(saveTime);

    // Переменные значения которых приведены к форматы JSON и переданы в LS
    let key = JSON.stringify(obj.id);
    let value = JSON.stringify(obj.text);
    localStorage.setItem(key, value);
    
    text.contentEditable = false;
    edit.disabled = false;
    save.disabled = true;
    cancel.disabled = true;
}

/* 4 - при нажатии на кнопку «Отмена» содержимое блока с текстом заменяется на последний сохраненный вариант изLocalStorage, режим редактирования отключается; */

// Функция для кнопки - Отмена
function cancelTextChanges() {
    // Сработает только при наличии объектов в массиве полученном из LS
    if(localStorageArray.length > 0) {
        let lastEdit = localStorageArray.slice(-1);
        text.textContent = lastEdit[0].text;
    }

    text.contentEditable = false;
    edit.disabled = false;
    save.disabled = true;
    cancel.disabled = true;
}
// Функция для получения данных в список изменений при первой загрузке/перезагрузке страницы
function getTextHistoryList() {
    // Сработает только при наличии объектов в LS
    if(localStorage.length > 0) {
        getArrayFromLS();
        for (let item of localStorageArray) {
            option.textContent = item.id;
            textChangeHistory.prepend(option);
        }
        let lastEdit = localStorageArray.slice(-1);
        text.textContent = lastEdit[0].text;
    }
}

// Функция для получения сохраненных состояний текста из LS
function getSavedText(event) {
    let time = event.target.closest("option");
    let key = time.textContent;

    getArrayFromLS();
    for (let item of localStorageArray) {
        if(key === item.id) {
            text.textContent = item.text;
        } else if(key === origin) {
            text.textContent = item.content;
        }
    }
}

// Функция для получения объектов из LS и преобразования их в элементы массива
function getArrayFromLS() {
    // Обнуляем массив
    localStorageArray = [];
    // Создаем объект и вносим текст из редактора в него если LS пуст
    if(localStorage.length === 0) {
        let original = {
            title: origin,
            content: text.textContent
        };
    
        localStorageArray.push(original);
    } else {
        // Получем данные из LS и внедряем в массив
        for(let i = 0; i < localStorage.length; i++) {
            let id = localStorage.key(i),
                value = localStorage.getItem(id),
                obj = {};
            if(id !== null && text !== null) {
                obj = {
                    id: id.replace(/"/g, ""), // методом replace() удаляем кавычки
                    text: value.replace(/"/g, "") 
                };
            }
            localStorageArray.push(obj);
        }
    }
}

/* 5 - При следующих перезагрузках страницы содержимое блока с текстом автоматически подтягивается из LocalStorage (последний сохраненный вариант). */