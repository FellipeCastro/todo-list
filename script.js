// Seleçao de elementos 
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;
let editedTodo;

// Funções
const saveTodo = (text) => { // Criando elementos dinamicamente
    const todo =  document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerHTML = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();
}

const toggleForms = () => { //esconder um formulario e mostrar outro
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (todo, newText) => {

    const todoTitle = todo.querySelector('h3');
    todoTitle.innerText = newText;
}

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); //Formulário não será enviado

    const inputValue = todoInput.value;
    if (inputValue) { // Se tiver algo no input...
        saveTodo(inputValue);
    }
});

document.addEventListener('click', (e) => {

    const targetEl = e.target; // capturando o botao clicado
    const parentEl = targetEl.closest('div') // Capturando o elemento pai 
    let todoTitle;

    if (parentEl && parentEl.querySelector('h3')) { // se o elemento pai existe e tem um h3 ...
        todoTitle = parentEl.querySelector('h3').innerText;
    }

    if (targetEl.classList.contains('finish-todo')) { // se o botao de finalizar for clicado ... 
        parentEl.classList.toggle('done') // se a classe existe ele tira se nao ele coloca 
    }

    if (targetEl.classList.contains('remove-todo')) { // se o botao de remover for clicado...
        parentEl.remove(); // removendo o elemento pai 
    }

    if (targetEl.classList.contains('edit-todo')) { // se o botao de editar for clicado...
        toggleForms() //esconder um formulario e mostrar outro
        editInput.value = todoTitle; // mudando valor do input
        oldInputValue = todoTitle; // salvando esse valor em uma variável
        editedTodo = parentEl; // armazenado a referencia à tarefa que esta sendo editada
    }
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault(); // nao enviar formulario

    toggleForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value // capturando o novo valor digitado

    if (editInputValue && editedTodo) {
        updateTodo(editedTodo, editInputValue);
    }

    toggleForms();
});