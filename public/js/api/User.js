/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  // static unsetCurrent() {
  //   if(localStorage.getItem('user')) {
  //     localStorage.removeItem('user');
  //   }
  // }
  static unsetCurrent() { 
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    } else {
      return undefined;
    }
  }

  // static current() {
  //   return JSON.parse(localStorage.getItem('user'));
  // }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    return createRequest({
      url: this.URL + "/current", 
      data: data,
      method: "GET", 
      responseType: "json",
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback= f => f) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }
  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  
  static register( data, callback = f => f ) {
    return createRequest({
      url: this.URL + "/register",
      data: data,
      method: "POST",
      responseType: "json",
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }
  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    return createRequest({
      url: this.URL + "/logout",
      data: data,
      method: "POST",
      responseType: "json",
      callback: (err, response) => {
        if (response.success) {
          this.unsetCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }
}
User.URL = '/user';
