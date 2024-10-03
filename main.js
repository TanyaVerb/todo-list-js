const controllers = {
  addInput: ".add-input",
  addBtn: ".add-btn",
  filterInput: ".filter-input",
  filterBtn: ".filter-btn",
  todoListArea: ".todo-list",
};

class Todo {
  constructor(controllers) {
    this.addInput = document.querySelector(controllers.addInput);
    this.addBtn = document.querySelector(controllers.addBtn);
    this.filterInput = document.querySelector(controllers.filterInput);
    this.filterBtn = document.querySelector(controllers.filterBtn);
    this.todoListArea = document.querySelector(controllers.todoListArea);
    this.todoList = [];
    this.initTodo();
  }

  initTodo() {
    this.addBtn.addEventListener("click", () => {
      this.addItem(this.addInput.value);
      this.addInput.value = "";
      this.renderItems();
    });

    this.filterBtn.addEventListener("click", this.filter.bind(this));

    this.todoListArea.addEventListener("click", this.removeItem.bind(this));

    this.renderItems();
  }

  addItem(title) {
    if (title) this.todoList.push({ title, id: new Date().getTime() });
  }

  renderItems(filterInputValue) {
    this.todoListArea.innerHTML = "";

    let itemsArray = [];
    if (filterInputValue) {
      itemsArray = this.todoList.filter(
        (item) => item.title === filterInputValue
      );
    } else {
      itemsArray = this.todoList;
    }
    if (!itemsArray.length) {
      const liElement = document.createElement("li");
      liElement.textContent = "No items";
      this.todoListArea.insertAdjacentElement("afterbegin", liElement);
      return;
    }
    itemsArray.forEach((item) => {
      const itemHtml = `<li class="todo-list__item">
            <div class="todo-list__item-wrapper">
                <p class="todo-list__item-title">${item.title}</p>
                <button class="todo-list__item-remove-btn btn" data-id="${item.id}">Remove</button>
            </div>
            </li>`;

      this.todoListArea.insertAdjacentHTML("afterbegin", itemHtml);
    });
  }
  removeItem(e) {
    const isRemoveBtn = e.target.classList.contains(
      "todo-list_item-remove-btn"
    );
    if (isRemoveBtn) {
      const id = e.target.dataset.id;
      this.todoList = this.todoList.filter((item) => item.id !== parseInt(id));
      this.renderItems(this.filterInput.value);
    }
  }

  filter() {
    const filterInputValue = this.filterInput.value;
    this.renderItems(filterInputValue);
    this.filterInput.value = "";
  }
}

const todo = new Todo(controllers);
//===============================================================
