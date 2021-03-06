import express, { Application } from 'express'
import bodyParse from 'body-parser'
import { fileOperation, readFile, writeFile } from './utils'
import { ITodoData } from '../src/scripts/type'
const app: Application = express()

app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())

//设置允许跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials:true')
  res.header('Content-Security-Policy: upgrade-insecure-requests')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Host, Content-Length, Authorization, Accept,X-Request-With, yourHeaderFeild'
  )
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.get('/todolist', (req, res) => {
  const todolist = fileOperation('todo.json') as string
  res.send(todolist)
})

app.post('/toogle', (req, res) => {
  const id = parseInt(req.body.id)
  fileOperation('todo.json', function (todo: ITodoData[]) {
    return todo.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    })
  })
  res.send({
    stat: 200,
    msg: 'ok'
  })
})

app.post('/remove', (req, res) => {
  const id = parseInt(req.body.id)
  fileOperation('todo.json', function (todo: ITodoData[]) {
    return todo.filter(todo => todo.id !== id)
  })
  res.send({
    msg: ' ok',
    stat: '200'
  })
})

app.post('/add', (req, res) => {
  const _todo = JSON.parse(req.body.todo) as ITodoData
  fileOperation('todo.json', (todo: ITodoData[]) => {
    const iExist = todo.find(item => item.content === _todo.content)
    if (iExist) {
      res.send({
        stat: 100,
        msg: '该事项已经存在！'
      })
      return
    }
    todo.push(_todo)
    return todo
  })
  res.send({
    stat: 200,
    msg: 'ok'
  })
})

app.listen(8080, () => {
  console.log('服务运行在8080端口')
})
