'use strict';
//teste

let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem ('todo-lists')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todo-lists', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('div');
    item.classList.add('tasklist-item');
    item.innerHTML = `
        <input type="checkbox" name="checkbox" id="checkbox" onclick="${status}" class="checkbox-input">
        <span class="task-name">${tarefa}</span>
    `;
    document.getElementById('todo-lists').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todo-lists');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco(); 
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
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

document.getElementById('taskAdd').addEventListener('keypress', inserirItem);
document.getElementById('todo-lists').addEventListener('click', clickItem);

atualizarTela();