import axios from "axios";

export async function fetchProducts(sheetId, apiKey, sheetName = "Products") {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

    const res = await axios.get(url);
    const rows = res.data.values;
    const headers = rows[0];
    const products = rows.slice(1).map(row =>
        Object.fromEntries(row.map((val, i) => [headers[i], val]))
    );

    return products.map(p => ({
        ...p,
        Price: parseFloat(p.Price), // Capital P!
    }));
}