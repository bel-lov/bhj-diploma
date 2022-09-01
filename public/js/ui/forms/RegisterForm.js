/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(options.data, (err, response) => {
      if (response.success) {
        this.element.reset();
        App.setState("user-logged");
        App.getModal("register").close();
      } else {
        console.log(`Ошибка регистрации: ${err}`);
      }
    });
  }
  }
  