import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function saveCatalogueId(userId, catalogueId) {
  try {
    const { error } = await supabase
      .from('saved')
      .upsert({ user_id: userId, catalogue_id: catalogueId });

    if (error) {
      throw new Error(`Error saving catalogue: ${error.message}`);
    }
    console.log('Catalogue ID saved successfully.');
  } catch (err) {
    console.error(err.message);
    throw new Error(`Error saving catalogue: ${err.message}`);
  }
}

async function removeSavedCatalogueId(userId, catalogueId) {
  try {
    const { error } = await supabase
      .from('saved')
      .delete()
      .match({ user_id: userId, catalogue_id: catalogueId });

    if (error) {
      throw new Error(`Error removing catalogue: ${error.message}`);
    }
    console.log('Catalogue ID removed successfully.');
  } catch (err) {
    console.error(err.message);
    throw new Error(`Error removing catalogue: ${err.message}`);
  }
}

async function getSavedCatalogueIds(userId) {
  try {
    const { data, error } = await supabase
      .from('saved')
      .select('catalogue_id')
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Error fetching catalogue IDs: ${error.message}`);
    }

    return data ? data.map(item => item.catalogue_id) : [];
  } catch (err) {
    console.error(err.message);
    throw new Error(`Error fetching catalogue IDs: ${err.message}`);
  }
}

export { saveCatalogueId, removeSavedCatalogueId, getSavedCatalogueIds };
