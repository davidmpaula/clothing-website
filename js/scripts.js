// This file contains the JavaScript code for the clothing website.
// It handles interactivity, such as adding items to a shopping cart, filtering products, and managing user interactions.

document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'T-Shirt', price: 19.99, available: true, image: 'images/tshirt.jpg' },
        { id: 2, name: 'Jeans', price: 39.99, available: true, image: 'images/jeans.jpg' },
        { id: 3, name: 'Jacket', price: 59.99, available: true, image: 'images/jacket.jpg' },
    ];

    const productContainer = document.querySelector('.product-list');
    const cartCount = document.getElementById('cart-count');
    const cartList = document.querySelector('.cart-list');
    const cartTotal = document.getElementById('cart-total');
    const paymentForm = document.getElementById('payment-form');
    const checkoutButton = document.getElementById('checkout-button');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderProducts() {
        if (productContainer) {
            productContainer.innerHTML = '';
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    ${product.available ? `<button class="add-to-cart" data-id="${product.id}">Add to Cart</button>` : `<p class="unavailable">Unavailable</p>`}
                `;
                productContainer.appendChild(productElement);
            });

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = parseInt(button.getAttribute('data-id'));
                    addToCart(productId);
                    button.classList.add('add-to-cart-animation');
                    setTimeout(() => {
                        button.classList.remove('add-to-cart-animation');
                    }, 1000);
                });
            });
        }
    }

    function renderCart() {
        if (cartList) {
            cartList.innerHTML = '';
            let total = 0;
            cart.forEach(product => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="remove-from-cart" data-id="${product.id}">Remove</button>
                `;
                cartList.appendChild(cartItem);
                total += product.price;
            });

            cartTotal.textContent = total.toFixed(2);

            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = parseInt(button.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
        }
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(product => product.id !== productId);
        updateCart();
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        cartCount.textContent = cart.length;
        renderCart();
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Payment successful!');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    if (signupButton) {
        signupButton.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    window.addEventListener('load', () => {
        loader.style.display = 'none';
        content.style.display = 'block';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    renderProducts();
    updateCart();
});