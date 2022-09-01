/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current()) {
      const accountsList = document.querySelectorAll(".accounts-select");

      Account.list(User.current(), (err, response) => {
        for (let account of accountsList) {
          account.innerHTML = "";
        }
        if (response.success) {
          for (let i = 0; i < response.data.length; i++) {
            let itemData = response.data[i];
            let accountSum = itemData.sum.toLocaleString("ru");
            let accountHtml = `<option value="${itemData.id}">${itemData.name} ${accountSum} ₽</option>`;

            for (let account of accountsList) {
              account.insertAdjacentHTML("beforeEnd", accountHtml);
            }
          }
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(options.data, (err, response) => {
      if (response.success) {
        this.element.reset();
        let type = options.data.type;
        let modalType = "new" + type[0].toUpperCase() + type.slice(1);
        App.getModal(modalType).close();
        App.update();
      }
    });
  }
}

  