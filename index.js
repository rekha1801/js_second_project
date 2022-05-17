const prompt = require("prompt-sync")({ sigint: true });
console.log("----------------------------------");
console.log("1 - Show ToDos");
console.log("2 - Add to ToDos list");
console.log("3 - Update ToDos list");
console.log("4 - Delete ToDos list");
console.log("5 - Filter all succeeded ToDos");
console.log("6 - Filter all pending ToDos");
console.log("----------------------------------");

let input = prompt("what would you like to do?");
let todos = [
  { id: 1, name: "Do Yoga", status: false },
  { id: 2, name: "Cook for the day", status: false },
  { id: 3, name: "send children to school", status: true },
  { id: 4, name: "Prepare for the class", status: true },
];

while (input !== "quit" && input !== "q") {
  if (input === "1") {
    if (todos.length === 0) {
      console.log("The Todo list is empty!!!!");
    } else {
      console.log("------------------------------------------------------");
      console.table(todos);
      console.log("------------------------------------------------------");
    }
  }
  if (input === "2") {
    const newTodo = prompt("Ok, what is the new todo?");
    addNewItem({ id: todos.length + 1, name: newTodo, status: false });
    console.log(`${newTodo} added to the list`);
  }
  if (input === "3") {
    const updateTodo = prompt("Ok, which todo is done?");
    updateItem({ name: updateTodo, status: false });
    console.log(`${updateTodo} status updated to the list`);
  }
  if (input === "4") {
    const deleteItem = +prompt("Ok, which todo to delete:");
    todos = deletedItem({ id: deleteItem });
    console.log(`${deleteItem} deleted from the list`);
  }
  if (input === "5") {
    console.table(doneTodos());
  }
  if (input === "6") {
    console.table(pendingTodos());
  }
  input = prompt("What would you like to do?");
}

console.log("ok, quit the app");

//To add new item to the todo list
function addNewItem(item) {
  todos.push(item);
  return todos;
}

// update the todo list with the status as true or false
function updateItem(item) {
  const updatedItem = todos.map((obj) =>
    obj.name === item.name ? { ...obj, status: true } : obj
  );
  Object.assign(todos, updatedItem);
  return todos;
}

// remove items from the todo list
function deletedItem(item) {
  const notDeletedItems = todos.filter((obj) => obj.id !== item.id);
  console.log(notDeletedItems);
  for (let i in notDeletedItems) {
    notDeletedItems[i].id = +i + 1;
  }
  return notDeletedItems;
}

// Display all the done todos
function doneTodos() {
  const finishedItems = todos.filter((obj) => obj.status === true);
  console.log(`No. of Done Todos are: ${finishedItems.length}`);
  return finishedItems;
}

// Display all the pending todos.
function pendingTodos() {
  const unfinishedItems = todos.filter((obj) => obj.status === false);
  console.log(`No. of pending Todos are: ${unfinishedItems.length}`);
  return unfinishedItems;
}
