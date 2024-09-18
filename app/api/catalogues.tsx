import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getAllCatalogues() {
    try {
        const { data, error } = await supabase
            .from('catalogues')
            .select(`
                *,
                stores (url)
            `);
        if (error) {
            throw new Error(`Error fetching catalogues: ${error.message}`);
        }
        return data;
    } catch (err) {
        console.error(err.message);
        throw new Error(`Error fetching catalogues: ${err.message}`);
    }
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


export { getAllCatalogues, getCataloguesByIds };
