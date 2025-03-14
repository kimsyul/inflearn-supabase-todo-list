import { Button } from '*/components/ui/button';
import { Checkbox } from '*/components/ui/checkbox';
import { useMutation } from '@tanstack/react-query';
import { updateTodo, deleteTodo } from 'actions/todo-actions';
import { queryClient } from 'config/ReactQueryProvider';
import { Loader } from 'lucide-react';
import { useState } from 'react';

export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const updateTodoMutation = useMutation({
    mutationFn: () => updateTodo({ id: todo.id, title, completed }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div className="w-full flex items-center gap-1">
      <Checkbox
        checked={completed}
        className="mr-2"
        onCheckedChange={async (checked) => {
          await setCompleted(checked as boolean);
          await updateTodoMutation.mutate();
        }}
      />
      {isEditing ? (
        <input
          className="flex-1 border-b-1 border-b-black pb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed && 'line-through'}`}>{title}</p>
      )}
      {isEditing ? (
        <Button
          onClick={async () => {
            await updateTodoMutation.mutate();
          }}
          size="icon">
          {updateTodoMutation.isPending ? <Loader /> : <i className="fas fa-check" />}
        </Button>
      ) : (
        <Button size="icon" onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen" />
        </Button>
      )}
      <Button size="icon" onClick={() => deleteTodoMutation.mutate()}>
        {deleteTodoMutation.isPending ? <Loader /> : <i className="fas fa-trash" />}
      </Button>
    </div>
  );
}
