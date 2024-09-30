import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getAllCatalogues(page = 1, pageSize = 10) {
    try {
        const { data, error, count } = await supabase
            .from('catalogues')
            .select(`
                *,
                stores (url)
            `, { count: 'exact' }) // Get the total count of items
            .range((page - 1) * pageSize, page * pageSize - 1); // Set the range for pagination

        if (error) {
            throw new Error(`Error fetching catalogues: ${error.message}`);
        }

        return { data, count }; // Return both data and total count
    } catch (err) {
        console.error(err.message);
        throw new Error(`Error fetching catalogues: ${err.message}`);
    }
}

async function getCataloguesLike(cond, page = 1, pageSize = 10) {
    const { data, error, count } = await supabase
        .from('catalogues')
        .select(`
            *,
            stores (
                url,
                stores_categories (name)
            )
        `, { count: 'exact' }) 
        .or(`title.ilike.%${cond}%, store.ilike.%${cond}%`) // Search in both title and store columns
        .range((page - 1) * pageSize, page * pageSize - 1); // Set the range for pagination

    if (error) {
        console.error(`Error fetching catalogues: ${error.message}`);
        throw new Error(error.message);
    }

    return { data, count };
}


// Function to get catalogues by IDs
async function getCataloguesByIds(cataloguesIds) {
    if (!cataloguesIds) {
        return [];
    }

    try {
        const cataloguesIdList = cataloguesIds.split(',').map(id => id.trim());
        const { data, error } = await supabase
            .from('catalogues')
            .select(`
                *,
                stores (url)
            `)
            .in('id', cataloguesIdList);

        if (error) {
            throw new Error(`Error fetching catalogues by IDs: ${error.message}`);
        }

        return data;
    } catch (err) {
        console.error(err.message);
        throw new Error(`Error fetching catalogues by IDs: ${err.message}`);
    }
}

export { getAllCatalogues, getCataloguesByIds, getCataloguesLike };
