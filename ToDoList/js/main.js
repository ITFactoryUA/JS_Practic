

const todosNode = document.querySelector('.js-todos');
const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-btn');

let todos = [];

function nextIndex() {
    let res = 1;
    if (todos.length > 0) {
        res = Math.max(...todos.map(todo => todo.id)) + 1;
    }
    return res;
}

function addTodo(text) {
    let index = nextIndex();
    const todo = {
        id: index,
        text,
        isFinished: false,
    }
    todos.push(todo)
}

function finishTodo(id) {
    todos.forEach(todo => {
        if (todo.id == id ) {
            todo.isFinished = true;
            console.log("Finished: " + todo.id);
        }
    })
}

function render() {
    let html = '';

    todos.forEach(todo => {
        if (todo.isFinished) {
            return;
        }

        html += `
            <div>
                ${todo.text}
                <button data-id='${todo.id}'>Done</button>
            </div>
        `;

    });

    todosNode.innerHTML = html;
}

btnNode.addEventListener('click', ()=>{
    const text = inputNode.value;
    addTodo(text);
    inputNode.value = "";
    render();
});

todosNode.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    const id = event.target.dataset.id;
    finishTodo(id);
    render();
});

render();