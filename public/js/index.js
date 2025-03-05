async function displayProducts() {
    const products = await fetchProducts();
    console.log(products);
}
async function fetchProducts() {
    try {

        const response = await fetch('http://localhost:8000/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            console.log('Response is EMPTY');
            return [];
        }

        return data;

    } catch (err) {
        console.log(err);
    }
}

displayProducts();