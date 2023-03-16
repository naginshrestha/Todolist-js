const todoInput = document.querySelector(".todo-input")
const todoBtn = document.querySelector(".todo-btn")
const todoList = document.querySelector(".todo-list")
const filter = document.querySelector("#filter-todo")

document.addEventListener("DOMContentLoaded", getTodos())

todoBtn.addEventListener("click", function addTodo(e) {
  e.preventDefault()
  if (!todoInput.value) {
    return
  }

  // create the todo div
  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")

  //   create li
  const newTodo = document.createElement("li")
  newTodo.innerText = todoInput.value
  newTodo.classList.add("todo-item")
  todoDiv.appendChild(newTodo)

  //   Add todos to localStorage
  saveLocalTodos(todoInput.value)

  // check button
  const completeBtn = document.createElement("button")
  completeBtn.innerHTML = "<i class='fa-solid fa-check'></i>"
  completeBtn.classList.add("complete-btn")
  todoDiv.appendChild(completeBtn)

  // delete button
  const deleteBtn = document.createElement("button")
  deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>"
  deleteBtn.classList.add("delete-btn")
  todoDiv.appendChild(deleteBtn)

  //append to ul
  todoList.appendChild(todoDiv)

  // clear to do input value
  todoInput.value = ""
})

todoList.addEventListener("click", function deleteCheck(e) {
  const item = e.target

  //   DELETE TODO
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement
    todo.remove()
    removeLocalTodos(todo)
  }

  // CHECK TO DO
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement
    todo.classList.toggle("completed")
  }
})

filter.addEventListener("change", function filterTodo(e) {
  const todos = todoList.childNodes

  console.log(todos)
  console.log(e.target.value)

  todos.forEach(function (todo) {
    console.log(todo)
    switch (e.target.value) {
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex"
        } else {
          todo.style.display = "none"
        }
        break

      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex"
        } else {
          todo.style.display = "none"
        }
        break
      default:
        todo.style.display = "flex"
    }
  })
})

function saveLocalTodos(todo) {
  // Check if there is already something in storage

  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
  // Check if there is already something in storage
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.forEach(function (todo) {
    // create the todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //   create li
    const newTodo = document.createElement("li")
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    // check button
    const completeBtn = document.createElement("button")
    completeBtn.innerHTML = "<i class='fa-solid fa-check'></i>"
    completeBtn.classList.add("complete-btn")
    todoDiv.appendChild(completeBtn)
    // delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>"
    deleteBtn.classList.add("delete-btn")
    todoDiv.appendChild(deleteBtn)
    //append to ul
    todoList.appendChild(todoDiv)
  })
}

function removeLocalTodos(todo) {
  // Check if there is already something in storage
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem("todos", JSON.stringify(todos))
}

// const todos = ["apple", "orange", "banana", "mango"]

// console.log(todos.indexOf("banana"))
// const bananaIndex = todos.indexOf("banana")

// todos.splice(bananaIndex, 1)

// console.log(todos)
