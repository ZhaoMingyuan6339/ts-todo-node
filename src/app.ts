import TodoEvent from './scripts/todoEvent'
import { ITodoData } from './scripts/type'
import {nanoid} from 'nanoid'
;(function (doc) {
  const oInput: HTMLInputElement = document.querySelector('input')
  const oAddBtn: HTMLButtonElement = document.querySelector('button')
  const oTodoList: HTMLElement = document.querySelector('.todo-wrapper')

  const todoData: ITodoData[] = [
    
  ]
  // 导入todoEvent类
  const todoEvent = new TodoEvent(todoData, oTodoList)

  const init = () => {
    bindEvent()
  }
  function bindEvent() {
    oAddBtn.addEventListener('click', handleAddBtnClick, false)

    oTodoList.addEventListener('click', handleListClick, false)
  }

  function handleAddBtnClick() {
    const inputVal: string = oInput.value.trim()
    if (inputVal.length) {
      const ret = todoEvent.addTodo({
        id: parseFloat(Math.random().toString(36)),
        content: inputVal,
        completed: false
      })
      if (ret && ret === 1001) {
        alert('该事项已经存在，请完成它或者添加其他事项！')
        return
      }
    }
  }

  const handleListClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const tagName = target.tagName.toLocaleLowerCase()
    if (tagName === 'input' || tagName === 'button') {
      const id = parseInt(target.dataset.id)
      switch (tagName) {
        case 'input':
          todoEvent.toogleComplete(target,id)
          break
        case 'button':
          todoEvent.removeTodo(target,id)
          break
        default:
          break
      }
    }
  }
  init()
})(document)
