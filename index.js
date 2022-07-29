window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const newTodoForm = document.querySelector('#taskAdd');
    const inputTask = document.querySelector('#input-taskName');

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();


        const todo = { 
            content: inputTask.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        displayTodos();
	});

    displayTodos();
});

function displayTodos() {
    const todoLists = document.querySelector('#todo-lists');

    todoLists.innerHTML = ''

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('tasklist-item');

        const input = document.createElement('input');
        const span = document.createElement('span');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        input.classList.add('checkbox-input');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        span.innerHTML = `
            <input 
                type="text" 
                value="${todo.content}" 
                class="task-name" 
                style="background-color:rgba(0, 0, 0, 0)"
                readonly
            />`;
        edit.innerHTML = 'Editar';
        deleteButton.innerHTML = 'Deletar';

        todoItem.appendChild(input);
        todoItem.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(actions);
    
        todoLists.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            displayTodos();
        });

        edit.addEventListener('click', e => {
            const input = span.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            });
        });

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        })

    });
}