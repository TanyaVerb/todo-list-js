const addInput = document.querySelector(".add-input");
const addBtn = document.querySelector(".add-btn");
const filterInput = document.querySelector(".filter-input");
const filterBtn = document.querySelector(".filter-btn");
const todoListArea = document.querySelector(".todo-list");

let todoList = [];

addBtn.addEventListener("click", () => {
  addItem(addInput.value);
  addInput.value = "";
  renderItems();
});

todoListArea.addEventListener("click", removeItem);

filterBtn.addEventListener("click", filter);

function addItem(title) {
  if (title) todoList.push({ title, id: new Date().getTime() });
}

function renderItems(filterInputValue) {
  todoListArea.innerHTML = "";

  let itemsArray = [];

  if (filterInputValue) {
    itemsArray = todoList.filter((item) => item.title === filterInputValue);
  } else {
    itemsArray = todoList;
  }

  if (!itemsArray.length) {
    const liElement = document.createElement("li");
    liElement.textContent = "No items";
    todoListArea.insertAdjacentElement("afterbegin", liElement);
    return;
  }

  itemsArray.forEach((item) => {
    const itemHtml = `<li class="todo-list__item">
            <div class="todo-list__item-wrapper">
                <p class="todo-list__item-title">${item.title}</p>
                <button class="todo-list__item-remove-btn btn" data-id="${item.id}">Remove</button>
            </div>
            </li>`;

    todoListArea.insertAdjacentHTML("afterbegin", itemHtml);
  });
}

function removeItem(e) {
  const isRemoveBtn = e.target.classList.contains("todo-list__item-remove-btn");
  if (isRemoveBtn) {
    const id = e.target.dataset.id;
    todoList = todoList.filter((item) => item.id !== parseInt(id));
    renderItems(filterInput.value);
  }
}

function filter() {
  const filterInputValue = filterInput.value;
  renderItems(filterInputValue);
  filterInput.value = "";
}

renderItems();
