'use strict'

var gTodos
var gFilterBy = 'ALL'
var gSortBy = 'txt'
_createTodos()

function getTodosForDisplay() {
  var todos = gTodos
  if (gFilterBy !== 'ALL') {
    todos = gTodos.filter(
      (todo) =>
        (gFilterBy === 'DONE' && todo.isDone) ||
        (gFilterBy === 'ACTIVE' && !todo.isDone)
    )
  }

  if (gSortBy === 'createdAt' || gSortBy === 'importance') {
    todos.sort((todo1, todo2) => todo1[gSortBy] - todo2[gSortBy])
  } else if (gSortBy === 'txt') {
    todos.sort((todo1, todo2) => {
      if (todo1[gSortBy].toLowerCase() > todo2[gSortBy].toLowerCase()) return 1
      else if (todo1[gSortBy].toLowerCase() < todo2[gSortBy].toLowerCase())
        return -1
      else return 0
    })
  }

  return todos
}

function removeTodo(todoId) {
  const idx = gTodos.findIndex((todo) => todo.id === todoId)
  gTodos.splice(idx, 1)
  _saveTodosToStorage()
}

function toggleTodo(todoId) {
  const todo = gTodos.find((todo) => todo.id === todoId)
  todo.isDone = !todo.isDone
  _saveTodosToStorage()
}

function addTodo(txt, importance) {
  const todo = _createTodo(txt, importance)
  gTodos.unshift(todo)
  _saveTodosToStorage()
}

function setFilter(filterBy) {
  gFilterBy = filterBy
}

function setSort(sortBy) {
  gSortBy = sortBy
}

function getTotalCount() {
  return gTodos.length
}
function getActiveCount() {
  const activeTodos = gTodos.filter((todo) => !todo.isDone)
  return activeTodos.length
}

// Private functions - used only by the service itself
function _createTodos() {
  var todos = loadFromStorage('todoDB')
  if (!todos || !todos.length) {
    todos = [
      _createTodo('Learn HTML', 1),
      _createTodo('Study CSS', 2),
      _createTodo('Master JS', 3),
    ]
  }

  gTodos = todos
  _saveTodosToStorage()
}

function _createTodo(txt, importance) {
  const todo = {
    id: makeId(),
    txt: txt,
    isDone: false,
    createdAt: Date.now(),
    importance: +importance,
  }
  return todo
}

function _saveTodosToStorage() {
  saveToStorage('todoDB', gTodos)
}
