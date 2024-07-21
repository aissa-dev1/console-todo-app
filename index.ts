type Task = {
  content: string;
  completed: boolean;
};

let tasks: Task[] = [];

init();

function init() {
  display("Welcome to the best Todo App in the world");
  displayTasksOptions();
}

function createOption(text: string, key: string): string {
  return `${text}: ${key}`;
}

function displayTasksOptions() {
  const supportedChoices = ["1", "2", "3", "4", "5", "6"];
  const showAllTasksOption = createOption("Show all tasks", "1");
  const createTaskOption = createOption("Create task", "2");
  const updateTaskContentOption = createOption("Update task content", "3");
  const completeTaskOption = createOption("Complete task", "4");
  const uncompleteTaskOption = createOption("Uncomplete task", "5");
  const exitOption = createOption("Exit", "6");
  const options = [
    showAllTasksOption,
    createTaskOption,
    updateTaskContentOption,
    completeTaskOption,
    uncompleteTaskOption,
    exitOption,
  ];

  for (const option of options) {
    display(option);
  }

  const choice = prompt("Choose a number: ")!;

  if (!choice || !supportedChoices.includes(choice)) {
    displayTasksOptions();
    return;
  }

  switch (choice) {
    case "1":
      showAllTasks();
      break;

    case "2":
      createTask();
      break;

    case "3":
      updateTaskContent();
      break;

    case "4":
      completeTask();
      break;

    case "5":
      uncompleteTask();
      break;

    case "6":
      display("Thank you for using owr Todo App");
      process.exit();
  }

  displayTasksOptions();
}

function showAllTasks() {
  display(tasks);
}

function createTask() {
  const taskContent = prompt("Enter a task content: ");

  if (!taskContent) {
    display("A task must have a content.");
    createTask();
    return;
  }

  tasks.push({
    content: taskContent,
    completed: false,
  });
  display(`Task with content '${taskContent}' created successfully.`);
}

function updateTaskContent() {
  const taskIndexText = prompt("Task position (exp: 1): ");

  if (!taskIndexText) {
    completeTask();
    return;
  }

  const taskIndex = parseInt(taskIndexText) - 1;
  const task = tasks[taskIndex];

  if (!task) {
    display("No task found in the current position");
    return;
  }

  const newContent = prompt("New task content: ");

  if (!newContent) {
    updateTaskContent();
    return;
  }

  const updatedTasks = tasks.map((tk) => {
    if (tasks.indexOf(tk) === taskIndex) {
      return { content: newContent, completed: tk.completed };
    }

    return tk;
  });
  tasks = updatedTasks;
  display(`Task in position ${taskIndexText} updated successfully.`);
}

function completeTask() {
  const taskIndexText = prompt("Task position (exp: 1): ");

  if (!taskIndexText) {
    completeTask();
    return;
  }

  const taskIndex = parseInt(taskIndexText) - 1;
  const task = tasks[taskIndex];

  if (!task) {
    display("No task found in the current position");
    return;
  }

  const updatedTasks = tasks.map((tk) => {
    if (tasks.indexOf(tk) === taskIndex) {
      return { content: tk.content, completed: true };
    }

    return tk;
  });
  tasks = updatedTasks;
  display(`Task in position ${taskIndexText} completed successfully.`);
}

function uncompleteTask() {
  const taskIndexText = prompt("Task position (exp: 1): ");

  if (!taskIndexText) {
    completeTask();
    return;
  }

  const taskIndex = parseInt(taskIndexText) - 1;
  const task = tasks[taskIndex];

  if (!task) {
    display("No task found in the current position");
    return;
  }

  const updatedTasks = tasks.map((tk) => {
    if (tasks.indexOf(tk) === taskIndex) {
      return { content: tk.content, completed: false };
    }

    return tk;
  });
  tasks = updatedTasks;
  display(`Task in position ${taskIndexText} uncompleted successfully.`);
}

function display(text: any) {
  console.log(text);
}
