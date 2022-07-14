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
  onSubmit(data) {
    User.register((data)=>{
      console.log(data)
      if (response.success) {
        this.element.reset();

        App.setState('user-logged');
        let modal = new Modal(this.element.closest('.modal fade in'));
        modal.close();
      } else {
        alert(response.error);
        return;
      }
    });
  }
  }
