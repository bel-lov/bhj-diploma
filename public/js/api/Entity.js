/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback) {
    const listData = createRequest(Object.assign({url: this.URL, method: 'GET'}, { data }), (err, data) => {
      callback(err, data);
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    data = Object.assign({method: 'PUT'}, data);
    const listData = createRequest(Object.assign({url:this.URL, method: 'POST'}, data), (err, data) => {
      callback(err, data);
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    data = Object.assign({method: 'DELETE'}, data);
    const xhr = createRequest(Object.assign({url: this.URL, method: 'POST'}, {data}), (err, data) => {
      callback(err, data);
    });
  }
}
Entity.URL = '';