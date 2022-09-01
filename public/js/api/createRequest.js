/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

// const createRequest = (options = {}, callback) => {
//     let xhr = new XMLHttpRequest;
//     let method = options.method;
//     let url;
//     let formData;

//     if (method === 'GET') {

//         if (options.data) {
//             let urlOption = Object.entries(options.data)
//                 .map(([key, value]) => `${key}=${value}`)
//                 .join('&');
//             url = `${options.url}?${urlOption}`;
//         }

//     } else {
//         formData = new FormData();
//         url = options.url;

//         for (let item in options.data) {
//             formData.append(item, options.data[item]);
//         }
//     }

//     xhr.addEventListener('load', function () {
//         if (this.readyState == xhr.DONE) {
//             if (this.status == 200) {
//                 callback(null, JSON.parse(this.responseText));
//             } else {
//                 callback(this.responseType, null);
//             }
//         }
//     });

//     try {
//         xhr.withCredentials = true;
//         xhr.open(method, url);

//         if (formData != undefined) {
//             xhr.send(formData);
//         } else {
//             xhr.send();
//         }
//     }
//     catch (e) {
//         console.log(e);
//         callback(e);
//     }
// };

const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const method = options.method;
    const formData = new FormData();
    let url = options.url;

    xhr.withCredentials = true;
    xhr.responseType = options.responseType;

    if (method === "GET") {

        if (notEmptyObject(options.data)) {
            url = `${url}?` + Object.entries(options.data)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
        }

    } else {

        if (notEmptyObject(options.data)) {
            for (let dataKey in options.data) {
                formData.append(dataKey, options.data[dataKey]);
            }
        }

    }
    try {
        xhr.open(method, url);

        if (options.headers !== undefined) {
            for (let keyHeaders in options.headers) {
                xhr.setRequestHeader(keyHeaders, options.headers[keyHeaders]);
            }
        }

        xhr.onerror = () => {
            options.callback(new Error(`Ошибка соединения: ${xhr.status}`), null);
        };

        xhr.onload = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                options.callback(null, xhr.response);
            } else {
                options.callback(xhr.response, null);
            }
        };

        if (method === "GET") {
            xhr.send();
        } else {
            xhr.send(formData);
        }
    } catch (err) {
        options.callback(err, null);
    }

    return xhr;

};

// Checking for an not empty object
function notEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return true;
        }
    }
} 