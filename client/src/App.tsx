import useSWR from 'swr';
import './App.css'
import { Box, List, ListItem, ThemeIcon } from '@mantine/core'
import AddTodo from './components/AddTodo';
import { CheckCircleFillIcon } from '@primer/octicons-react';

export interface Todo {
  id: number
  title: string
  body: string
  done: boolean
}

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json())

function App() {

  const { data } = useSWR<Todo[]>('api/todos', fetcher)

  const markTodoAdDone = async(id: number) => {

    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json())
  }


  return (
    <div>
      <Box>
        <List spacing="xs" size="sm" mb={12} center>
          {data?.map((todo) => (
            <ListItem onClick={()=>markTodoAdDone(todo.id)} key={`todo__${todo.id}`} icon={todo.done ? (
              <ThemeIcon color='teal' size={24} radius="xl">
                <CheckCircleFillIcon size={20} />
              </ThemeIcon>) : (
              <ThemeIcon color='gray' size={24} radius="xl">
                <CheckCircleFillIcon size={20} />
              </ThemeIcon>
            )}>
              {todo.title}
            </ListItem>
          ))}
        </List>
        <AddTodo />
      </Box>
    </div>
  )
}

export default App
