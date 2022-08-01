'use strict'

function onInit() {
  renderTodos()
}

function renderTodos() {
  const todos = getTodosForDisplay()
  var strHTMLs
  if (todos.length > 0) {
    strHTMLs = todos
      .map(
        (todo) =>
          `
        <li onclick="onToggleTodo('${todo.id}')" class="${
            todo.isDone ? 'done' : ''
          }">
            ${todo.txt}, ${new Date(
            todo.createdAt
          ).toLocaleString()}, Importance - ${todo.importance}
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>
        `
      )
      .join('')
  } else {
    if (todos.length === 0 && gFilterBy === 'ALL')
      strHTMLs = `<li>No Todos</li>`
    else if (todos.length === 0 && gFilterBy === 'ACTIVE')
      strHTMLs = `<li>No Active Todos</li>`
    else if (todos.length === 0 && gFilterBy === 'DONE')
      strHTMLs = `<li>No Done Todos</li>`
  }

  document.querySelector('.todo-list').innerHTML = strHTMLs
  document.querySelector('.todo-total-count').innerText = getTotalCount()
  document.querySelector('.todo-active-count').innerText = getActiveCount()
}

function onRemoveTodo(ev, todoId) {
  ev.stopPropagation()
  // console.log('Removing', todoId)
  var deleteForSure = confirm('Are you sure that you want to delete this todo?')
  if (!deleteForSure) return
  removeTodo(todoId)
  renderTodos()
}

function onToggleTodo(todoId) {
  // console.log('Toggling', todoId)
  toggleTodo(todoId)
  renderTodos()
}

function onAddTodo(ev) {
  ev.preventDefault()
  const elTxt = document.querySelector('[name=todo-txt]')
  const elImportance = document.querySelector('[name=todo-importance]')
  // console.log('Adding todo', elTxt.value)

  if (!elTxt.value || !elImportance.value) {
    alert('Please enter todo and importance')
    return
  }
  addTodo(elTxt.value, elImportance.value)
  renderTodos()

  elTxt.value = ''
  elImportance.value = ''
}

function onSetFilter(filterBy) {
  //   console.log('Setting filter', filterBy)

  setFilter(filterBy)

  renderTodos()
}

function onSetSort(sortBy) {
  setSort(sortBy)

  renderTodos()
}
