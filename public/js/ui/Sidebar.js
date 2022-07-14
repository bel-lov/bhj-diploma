/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector('body');
    const buttonSidebar = document.querySelector('a.sidebar-toggle');
    buttonSidebar.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const buttonMenu = document.querySelectorAll('.menu-item');

    for (let i = 0; i < buttonMenu.length; i++) {
      buttonMenu[i].addEventListener('click', (e) => {
        e.preventDefault
        if (buttonMenu[i].classList.contains('menu-item_register')) {
          // const register = document.getElementById('modal-register');
          // const modal = new Modal(register);
          // modal.open(register);
          App.modals.register.open();
        }
        // const login = document.getElementById('modal-login');
        // const modalLogin = new Modal(login);
        App.modals.login.open();
        // modalLogin.open(login);
      })
    }
  }
}