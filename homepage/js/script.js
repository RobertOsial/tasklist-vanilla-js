{
    let tasks = [];

    const bindEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-delete");

        deleteButtons.forEach((deleteButton, taskIndex) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, { content: newTaskContent },
        ];
        render();
    };

    const deleteTask = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const render = () => {
        let taskListHTMLContent = "";

        for (const task of tasks) {
            taskListHTMLContent += `
            <li class="taskList__item">
              <button class="js-toggleDone taskList__button taskList__button--done">
               ${task.done ? "✓" : ""} 
              </button>
              <span class="taskContent${task.done ? " taskContent--done" : ""}">
                 ${task.content}
              </span>
              <button class="js-delete taskList__button taskList__button--delete">
                 ✗
              </button>
            </li>
          `;
        };

        document.querySelector(".js-taskList").innerHTML = taskListHTMLContent;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}

