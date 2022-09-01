/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error("Элемент не существует!");
    } else {
      this.element = element;
      this.registerEvents();
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const buttonIncome = this.element.querySelector(".create-income-button");
    const buttonExpense = this.element.querySelector(".create-expense-button");

    buttonIncome.addEventListener("click",  event => {
      event.preventDefault();
      App.getModal("newIncome").open();
    });

    buttonExpense.addEventListener("click", event => {
      event.preventDefault();
      App.getModal("newExpense").open();
    });
  }
}
