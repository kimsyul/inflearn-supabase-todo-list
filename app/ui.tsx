'use client';

import { Button } from '*/components/ui/button';
import { Input } from '*/components/ui/input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTodo, getTodos } from 'actions/todo-actions';
import Todo from 'components/todo';
import { Loader } from 'lucide-react';
import { useState } from 'react';

export default function UI() {
  const [searchInput, setSearchInput] = useState('');

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos({ searchInput }),
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: 'New Todo',
        completed: false,
      }),

    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
      <h1 className="text-xl">TODO LIST</h1>
      <Input placeholder="Search Todo" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      {todosQuery.isPending && <p>Loading...</p>}
      {todosQuery.data && todosQuery.data.map((todo) => <Todo key={todo.id} todo={todo} />)}
      {/* mutationFn 호출 */}
      <Button onClick={() => createTodoMutation.mutate()}>
        {createTodoMutation.isPending ? <Loader /> : <i className="fas fa-plus" />}
        Add Todo
      </Button>
    </div>
  );
}
