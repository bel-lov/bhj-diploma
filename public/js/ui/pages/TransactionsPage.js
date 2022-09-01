/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
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
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const buttonAccount = this.element.querySelector(".remove-account");
    buttonAccount.addEventListener("click", event => {
      event.preventDefault();
      this.removeAccount();      
    });
    this.element.addEventListener("click", event => {
      const transactionId = event.target.closest(".transaction__remove").dataset.id;
      this.removeTransaction(transactionId);
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {

      if (confirm("Вы действительно хотите удалить счёт?")) {
        const accountId = this.lastOptions.account_id;
        Account.remove("id", accountId, (err, response) => {
          if (response.success) {
            this.clear();
            App.update();
          }
        });
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
      if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
        Transaction.remove("id", id, (err, response) => {
          if (response.success) {
            App.update();
          }
        });
      }
    }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      this.lastOptions = options;

      Account.get(User.current(), options.account_id, (err, response) => {
        if (response.success) {
          const findTargetAccount = response.data.filter(account => account.id === options.account_id);
          if (findTargetAccount) {
            this.renderTitle(findTargetAccount[0].name);
          }
        }
      });

      Transaction.list(options, (err, response) => {
        if (response.success) {
          this.renderTransactions(response.data);
        }
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    this.element.querySelector(".content-title").textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const parseDate = new Date(date);
    const arrMonths = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];

    const timeDate = parseDate.getDate() < 10 ? `0${parseDate.getDate()}`: parseDate.getDate();

    const timeMonth = arrMonths[parseDate.getMonth()];

    const timeYear = parseDate.getFullYear();

    const timeHours = parseDate.getHours() < 10 ? `0${parseDate.getHours()}` : parseDate.getHours();

    const timeMinutes = parseDate.getMinutes() < 10 ? `0${parseDate.getMinutes()}` : parseDate.getMinutes();

    return `${timeDate} ${timeMonth} ${timeYear} г. в ${timeHours}:${timeMinutes}`;

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const date = this.formatDate(item.created_at);

    const outputHtml = 
    `<div class="transaction transaction_${(item.type).toLowerCase()} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${date}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        <!--  сумма -->
        ${item.sum}<span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
          <i class="fa fa-trash"></i>  
        </button>
      </div>
    </div>`;

    return outputHtml;      
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    if (data) {
      const transactionsList = this.element.querySelector(".content");
      let outputHtml = "";

      for (let i = 0; i < data.length; i++) {
        outputHtml += this.getTransactionHTML(data[i]);
      }
      transactionsList.innerHTML = outputHtml;
    }
  }
}