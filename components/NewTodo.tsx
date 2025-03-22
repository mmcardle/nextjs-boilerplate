import { useState } from 'react'
import supabase from '../utils/supabase'

import styles from '../styles/Todo.module.css'

export default ({ reload }: { reload: () => void }) => {
  const [title, setTitle] = useState('')

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.from('todos').insert({ title })
    reload()
    setTitle('')
  }

  return (
    <form onSubmit={addTodo}>
      <label htmlFor="title">Title</label>
      <input 
        className={styles.input}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
      <button type="submit" className={styles.button}>Add</button>
    </form>
  )
}