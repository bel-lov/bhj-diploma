/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    this.element = element;
    if (element = null) {
      throw new Error('something went wrong')
    }
    this.registerEvents()
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
const buttonDataDismiss = document.querySelectorAll('[data-dismiss="modal"]');

buttonDataDismiss[0].addEventListener('click', ()=>{
  console.log('true');
  onClose();
})
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {

  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
      this.element.style.display = 'block';
  }

  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){

  }
}

let a = 1;
//Где писать код по открытию модальных окон?
//где создать элемент класса Модал?
const buttonMenu = document.querySelectorAll('.menu-item')
console.log(buttonMenu.length)
console.log(buttonMenu)

for (let i = 0; i < buttonMenu.length; i++) {
  buttonMenu[i].addEventListener('click', (e) => {
    e.preventDefault
    const modal = new Modal(a);//когда создается экземпляр класса откуда беруться данные, что туда передавать?
    console.log(modal)
  })
}
