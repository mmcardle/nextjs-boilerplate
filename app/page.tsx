'use client'

import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import supabase from '../utils/supabase'
import NewTodo from '../components/NewTodo'

type Todo = {
  id: number
  title: string
  created_at: string
  is_complete: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodos = async () => {
    const { data } = await supabase.from('todos').select('*')
    setTodos(data as Todo[])
    console.log(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className={styles.container}>
      <NewTodo reload={fetchTodos} />
      {todos.map((todo: Todo) => (
        <p key={todo.id}>
          {todo.title}
          {todo.is_complete ? ' (completed)' : ' (not completed)'}
          {" "}
          {todo.created_at}
        </p>
      ))}
    </div>
  )
}
