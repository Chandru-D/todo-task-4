const todoList = document.getElementById('todo-list');
const newTodo = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');

let todos = [];
let checkboxStates = [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    const rowId = document.getElementsByTagName('li').length;
    checkbox.type = "checkbox";
    checkbox.id = "my-checkbox-"+index;
    checkbox.checked = checkboxStates[index];

    
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.innerText = todo;
    todoText.addEventListener('click', () => {
      if(checkbox.checked!=true){
      editTodo(index);
      }
    });

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => {
      editTodo(index);
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1);
      checkboxStates.splice(index, 1);
      renderTodos();
    });


    li.appendChild(checkbox);
    li.appendChild(todoText);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);  
    
    const checkboxId = document.getElementById("my-checkbox-"+index);
    checkboxId.addEventListener("change", () => {
      if (checkboxId.checked) {
        console.log(`Checkbox ${checkboxId.id} is checked`);
        checkboxStates[index] = true;
        checkboxId.nextElementSibling.style = "text-decoration-line: line-through; color : #aaa";
      } else {
        console.log(`Checkbox ${checkboxId.id} is not checked`);
        checkboxStates[index] = false;
        checkboxId.nextElementSibling.style = "text-decoration-line: none; color : #000000";
      }
    }); //closing event listener for checkbox
    const checkboxId_check = document.getElementById("my-checkbox-"+index);
    if (checkbox.checked) {
        checkboxId_check.nextElementSibling.style = "text-decoration-line: line-through; color : #aaa";
      }
  }); //closing todo's for each function
}  //closing render to do function

addTodoButton.addEventListener('click', () => {
  const todoText = newTodo.value.trim();
  if (todoText !== '') {
    todos.push(todoText);
    checkboxStates.push(false); // initialize checkbox state to unchecked
    newTodo.value = '';
    renderTodos();
  }
});

function editTodo(index) {
  const listItem = document.getElementsByTagName('li')[index];
  listItem.classList.add('selected');
  const todoText = todoList.childNodes[index].querySelector('.todo-text');
  const editInput = document.createElement('input');
  editInput.classList.add('edit-input');
  editInput.type = 'text';
  editInput.value = todoText.textContent;
  todoList.childNodes[index].replaceChild(editInput, todoText);
  editInput.focus();

  // Hide Edit and Delete buttons
  const editButton = todoList.childNodes[index].querySelector('button:nth-of-type(1)');
  const deleteButton = todoList.childNodes[index].querySelector('button:nth-of-type(2)');
  editButton.style.display = 'none';
  deleteButton.style.display = 'none';

  // Show Save and Cancel buttons
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save-button');
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.classList.add('cancel-button');
  todoList.childNodes[index].appendChild(saveButton);
  todoList.childNodes[index].appendChild(cancelButton);

  saveButton.addEventListener('click', () => {
  const newTodoText = editInput.value.trim();
  if (newTodoText !== '') {
    todos[index] = newTodoText;
    listItem.classList.remove('selected');
    renderTodos();
    }
  });

  cancelButton.addEventListener('click', () => {
  listItem.classList.remove('selected');
  renderTodos();
  });
}

renderTodos(); // Initial rendering of todos list when page loads.