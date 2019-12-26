const {BigQuery} = require('@google-cloud/bigquery');
const bq = new BigQuery();

async function execSQL(query) {
    const options = {
        query: query,
        location: 'US',
    }
    try {
        const [rows] = await bq.query(options);
        return rows;
    } catch(error) {
        throw new Error(error);
    }
}

async function getArtBySingleFilter(name, value) {
    const query = `SELECT objects.*, original_image_url
    FROM \`bigquery-public-data.the_met.objects\` as objects
    INNER JOIN \`bigquery-public-data.the_met.images\` as images
    ON objects.object_id=images.object_id
    WHERE lower(${name}) LIKE \'%${value.toLowerCase()}%\'`;

    return await execSQL(query);
}

async function getArtByMultipleFilters(filters) {
    let keys = Object.keys(filters);

    let query = `SELECT objects.*, original_image_url
    FROM \`bigquery-public-data.the_met.objects\` as objects
    INNER JOIN \`bigquery-public-data.the_met.images\` as images
    ON objects.object_id=images.object_id
    WHERE lower(${keys[0]}) LIKE \'%${filters[keys[0]].toLowerCase()}%\'`;

    keys.forEach((key, i) => {
        if (i === 0) return;
        query += ` AND lower(${key}) LIKE \'%${filters[key].toLowerCase()}%\'`
    })

    return await execSQL(query);
}


module.exports = {
    getArtBySingleFilter,
    getArtByMultipleFilters
}