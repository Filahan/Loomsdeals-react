import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getStoresCategories() {
  try {
    const { data, error } = await supabase.from('stores_categories').select('*');

    if (error) {
      throw new Error(`Error fetching store categories: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(`Error fetching store categories: ${err.message}`);
  }
}

export { getStoresCategories };
