/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}, callback) => {
    let xhr = new XMLHttpRequest;
    let method = options.method;
    let url;
    let formData;

    if (method === 'GET') {

        if (options.data) {
            let urlOption = Object.entries(options.data)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
            url = `${options.url}?${urlOption}`;
        }

    } else {
        formData = new FormData();
        url = options.url;

        for (let item in options.data) {
            formData.append(item, options.data[item]);
        }
    }

    xhr.addEventListener('load', function () {
        if (this.readyState == xhr.DONE) {
            if (this.status == 200) {
                callback(null, JSON.parse(this.responseText));
            } else {
                callback(this.responseType, null);
            }
        }
    });

    try {
        xhr.withCredentials = true;
        xhr.open(method, url);

        if (formData != undefined) {
            xhr.send(formData);
        } else {
            xhr.send();
        }
    }
    catch (e) {
        console.log(e);
        callback(e);
    }
};

// const createRequest = (options = {}, callback) => {
//     const xhr = new XMLHttpRequest;
//     let url;

//     if (options.method === 'GET') {
//         url = `${options.url}?${Object.entries(options.data).map(e => `${e[0]}=${e[1]}`).join('&')}`

//         xhr.open('GET', url)
//         xhr.send()
//     }
//     else if (options.method === 'POST') {
//         const formData = new FormData

//         for (const [key, value] of Object.entries(options.data)) {
//             formData.append(key, value)
//         }

//         xhr.responseType = 'json'
//         xhr.open('POST', options.url)
//         xhr.send(formData)
//     }

//     xhr.onload = () => {
//         if (xhr.status != 200) {
//             console.log(`Error ${xhr.status}: ${xhr.statusText}`)
//         }
//         else {
//             // const json = JSON.parse(xhr.response)
//             // ...работа с данными
//         }

//         options.callback()
//     }
// }

// createRequest({
//     method: 'GET',
//     url: '../db.json',
//     data: {
//         email: 'ivan@poselok.ru',
//         password: 'odinodin'
//     },
//     callback: (err, response) => {
//         console.log(err);
//         console.log(response);
//     }
// })