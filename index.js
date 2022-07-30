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

        const maintask = document.createElement('div');
        maintask.classList.add('main-task')

        const input = document.createElement('input');
        const p = document.createElement('p');
        p.classList.add('task-name')

        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        input.classList.add('checkbox-input');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        p.innerHTML = `${todo.content}`;

        edit.innerHTML = '<img src="./src/assets/edit.svg" />';
        deleteButton.innerHTML = '<img src="./src/assets/trash-alt.svg" />';

        todoItem.appendChild(maintask)
        maintask.appendChild(input);
        maintask.appendChild(p);
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
            editWorking(todo.content)
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        });

        function editWorking(){

            if(todoItem.classList.contains('done')) {
                alert('Não é possível alterar sua tarefa, pois ela está marcada como pronta!')
            } else {
                let editValue = prompt('Edite sua tarefa', todo.content);
                if(editValue !== null) {
                    todo.content = editValue;
                }
            }
        }

        deleteButton.addEventListener('click', e => {

            let confirmDelete = confirm('Você tem certeza que deseja deletar a seguinte tarefa: ' + todo.content)
            if(confirmDelete) {
                todos = todos.filter(t => t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            } 

        })

    });
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

// document.getElementById('taskAdd').addEventListener('keypress', inserirItem);
// document.getElementById('todo-lists').addEventListener('click', clickItem);

// atualizarTela();

console.log(navigator.onLine);

// WHEN CONNECTION IS ONLINE AGAIN
window.addEventListener("online", () => {
    document.querySelector(".status-color").classList.remove("off");
    document.querySelector(".status-color").classList.add("on");
    document.querySelector(".toast-title").innerHTML = "Conexão restaurada";
    document.querySelector(".toast-info").innerHTML = "Seus dados estão salvos offline";
    document.querySelector(".toast").classList.add("active");
    // CLOSING TOAST
    setTimeout(() => {
        // alert(".");
        document.querySelector(".toast").classList.remove("active");
        document.querySelector(".toast").classList.add("off");
    }, 10 * 1000);
});
// WHEN CONNECTION IS OFFLINE
window.addEventListener("offline", () => {
    document.querySelector(".status-color").classList.remove("on");
    document.querySelector(".status-color").classList.add("off");
    document.querySelector(".toast-title").innerHTML = "Conexão perdida";
    document.querySelector(".toast-info").innerHTML = "Seus dados estão salvos offline";
    document.querySelector(".toast").classList.add("active");
    // CLOSING TOAST
    setTimeout(() => {
        // alert(".");
        document.querySelector(".toast").classList.remove("active");
        document.querySelector(".toast").classList.add("off");
    }, 10 * 1000);
});