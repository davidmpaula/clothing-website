document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            name: 'T-Shirt',
            price: 19.99,
            description: 'Comfortable cotton t-shirt perfect for everyday wear.',
            image: 'images/tshirt.jpg',
            available: true
        },
        {
            id: 2,
            name: 'Jeans',
            price: 39.99,
            description: 'Classic blue jeans with perfect fit.',
            image: 'images/jeans.jpg',
            available: true
        },
        {
            id: 3,
            name: 'Jacket',
            price: 59.99,
            description: 'Stylish jacket for all seasons.',
            image: 'images/jacket.jpg',
            available: true
        }
    ];

    const productId = new URLSearchParams(window.location.search).get('id');
    const product = products.find(p => p.id === parseInt(productId));

    if (product) {
        document.title = `${product.name} - Clothing Store`;
        document.getElementById('mainImage').src = product.image;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = product.price.toFixed(2);
        document.getElementById('productDescription').textContent = product.description;

        // Add to Cart functionality
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            const size = document.getElementById('sizeSelect').value;
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({...product, size});
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Animation and feedback
            const btn = document.getElementById('addToCartBtn');
            btn.classList.add('add-to-cart-animation');
            setTimeout(() => btn.classList.remove('add-to-cart-animation'), 1000);
            
            // Update cart count
            document.getElementById('cart-count').textContent = cart.length;
        });

        // Related products
        const relatedProducts = products.filter(p => p.id !== product.id);
        const productList = document.querySelector('.related-products .product-list');
        relatedProducts.forEach(p => {
            const productEl = document.createElement('div');
            productEl.classList.add('product');
            productEl.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>$${p.price.toFixed(2)}</p>
                <a href="product-detail.html?id=${p.id}" class="view-product">View Product</a>
            `;
            productList.appendChild(productEl);
        });
    }
});