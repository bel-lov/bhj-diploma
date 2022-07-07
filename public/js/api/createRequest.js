/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
// const createRequest = (options = {}) => {

// };


const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://example.com", true);
    xhr.onload = function (options) {
        if (xhr.readyState === 4 || xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.error(xhr.statusText);
        }
    }
};