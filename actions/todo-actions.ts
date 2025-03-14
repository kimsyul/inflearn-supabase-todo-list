'use server';

import { Database } from 'types_db';
import { createServerSupabaseClient } from 'utils/supabase/server';

export type TodoRow = Database['public']['Tables']['todo']['Row'];
export type TodoRowInsert = Database['public']['Tables']['todo']['Insert'];
export type TodoRowUpdate = Database['public']['Tables']['todo']['Update'];

function handleError(error) {
  console.error(error);
  throw new Error(error.message);
}

export async function getTodos({ searchInput = '' }) {
  const supabase = await createServerSupabaseClient();

  // like : searchInput이 앞이나 뒤에 포함된 title을 전부 가져오는 것
  // => searchInput이 비어있으면 전체 todo가 걸리게 됨
  const { data, error } = await supabase
    .from('todo')
    .select('*')
    .like('title', `%${searchInput}%`)
    // 오름차순
    .order('created_at', { ascending: true });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function createTodo(todo: TodoRowInsert) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from('todo').insert({
    ...todo,
    created_at: new Date().toISOString(),
  });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function updateTodo(todo: TodoRowUpdate) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('todo')
    .update({
      ...todo,
      updated_at: new Date().toISOString(),
    })
    // 대상 지정
    .eq('id', todo.id);

  if (error) {
    handleError(error);
  }

  return data;
}

export async function deleteTodo(id: number) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from('todo').delete().eq('id', id);

  if (error) {
    handleError;
  }

  return data;
}
