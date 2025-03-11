'use client';

import { Button } from '*/components/ui/button';
import { Input } from '*/components/ui/input';
import Todo from 'components/todo';

export default function UI() {
  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
      <h1 className="text-xl">TODO LIST</h1>
      <Input placeholder="Search Todo" />
      <Todo />
      <Button>
        <i className="fas fa-plus" />
        Add Todo
      </Button>
    </div>
  );
}
