import { textSync } from 'figlet';
import { prompt } from 'inquirer';
import { existsSync, readFileSync, writeFileSync } from 'fs';

async function addTodo() {
  const { newTodo } = await prompt([
    {
      type: 'input',
      message: "New Todo",
      name: 'newTodo'
    }
  ]);
  const todos: string[] = loadTodos();
  todos.push(newTodo);
  writeFileSync('todos.json', JSON.stringify({ todos: todos }));
}

function showTodos() {
  const todos: string[] = loadTodos();

  console.log();
  console.log("Your todos:");
  for (const todo of todos) {
    console.log(todo);
  }
}

function loadTodos() {
  if (existsSync("todos.json")) {
    const file = readFileSync("todos.json").toString();
    const todos = JSON.parse(file);

    return todos.todos;
  } else {
    return [];
  }
}

async function todo() {
  console.log(textSync("Wonderful Kate's TODO App"));

  const { choice } = await prompt([
    {
      type: 'list',
      choices: ['Add todo', 'Show todos'],
      message: "Choose",
      name: 'choice'
    }
  ]);

  console.log("Choice was:", choice);

  if (choice === 'Add todo') {
    await addTodo();
  } else if (choice === 'Show todos') {
    showTodos();
  }
}


(async () => {
  await todo();
})();