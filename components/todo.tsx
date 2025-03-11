import { Button } from '*/components/ui/button';
import { Checkbox } from '*/components/ui/checkbox';
import { useState } from 'react';

export default function Todo() {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [title, setTitle] = useState('');

  return (
    <div className="w-full flex items-center gap-1">
      <Checkbox checked={completed} className="mr-2" onCheckedChange={(checked) => setCompleted(checked as boolean)} />
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
        <Button size="icon" onClick={() => setIsEditing(false)}>
          <i className="fas fa-check" />
        </Button>
      ) : (
        <Button size="icon" onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen" />
        </Button>
      )}
      <Button size="icon">
        <i className="fas fa-trash" />
      </Button>
    </div>
  );
}
