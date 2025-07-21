const todoData = JSON.parse(localStorage.getItem('tasks')) || {};
let currentDate = null;

const today = dayjs();

const day = today.format('D')
const month = today.format('MMMM');

document.querySelector('.todo-day').innerHTML = month;
document.querySelector('.todo-number').innerHTML = day;

displayList();

function addElementToList () {
    
    const inputtedElement = document.querySelector('.todo-input');
    const todoElement = inputtedElement.value;

    if (todoElement === '') {
        alert('Error - You Must Enter Something');
        return;
    }

    if (!todoData[currentDate]) {
        todoData[currentDate] = [];
    }

    if (todoData[currentDate].length > 5) {
        removeTask(currentDate)
    }

    todoData[currentDate].push(todoElement);
    localStorage.setItem('tasks', JSON.stringify(todoData));

    inputtedElement.value = '';

    displayList();
}

function displayList () {
    let todoListHTML = '';

    const todoList = todoData[currentDate] || [];

    for (let i = 0; i < todoList.length; i++) {
        const todoElement = todoList[i];
        const html = `
            <div class="task-element">
                <p class="task-text">
                - ${todoElement} 
                <button class="todo-remove-task" onclick="
                    removeTask(${i});
                    displayList();
                ">X</button>
                </p>
            </div>
        `;

        todoListHTML += html;
    }

    document.querySelector('.middle-section').innerHTML = todoListHTML;
}

function keyPressed (event) {

    if (event.key === 'Enter') {
        addElementToList();
    } 
}

function removeTask(index) {
    todoData[currentDate].splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(todoData));
    displayList();
}

function triggerDatePicker() {
    const dateInput = document.querySelector('.todo-date-picker');
    dateInput.click(); 
  }

function changeDate () {
    const dateInputElement = document.querySelector('.todo-date-picker');
    const dateElement = dateInputElement.value;

    currentDate = dateElement;

    const splitDate = dateElement.split("-");

    selectMonth(splitDate);
    displayList();
}

function selectMonth(splitDate) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthIndex = parseInt(splitDate[1], 10) - 1;
    const monthName = months[monthIndex];

    document.querySelector('.todo-day').innerHTML = monthName;
    document.querySelector('.todo-number').innerHTML = splitDate[2];
}
