'use server';

import { Database } from 'types_db';
import { createServerSupabaseClient } from 'utils/supabase/server';

export type TodoRow = Database['public']['Tables']['todo']['Row'];
export type TodoInsert = Database['public']['Tables']['todo']['Insert'];
export type TodoUpdate = Database['public']['Tables']['todo']['Update'];

// TODO
function handleError(error) {}

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
}
