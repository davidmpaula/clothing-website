document.addEventListener('DOMContentLoaded', () => {
    const adminCredentials = {
        username: 'admin',
        password: 'password123'
    };

    const products = [
        { id: 1, name: 'T-Shirt', price: 19.99, available: true },
        { id: 2, name: 'Jeans', price: 39.99, available: true },
        { id: 3, name: 'Jacket', price: 59.99, available: true },
    ];

    const loginForm = document.getElementById('admin-login-form');
    const logoutButton = document.getElementById('logout-button');
    const productContainer = document.querySelector('.product-list');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === adminCredentials.username && password === adminCredentials.password) {
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'admin-login.html';
        });
    }

    function renderProducts() {
        if (productContainer) {
            productContainer.innerHTML = '';
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: $<input type="number" value="${product.price}" data-id="${product.id}" class="price-input"></p>
                    <p>Available: <input type="checkbox" ${product.available ? 'checked' : ''} data-id="${product.id}" class="availability-checkbox"></p>
                    <button class="save-button" data-id="${product.id}">Save</button>
                `;
                productContainer.appendChild(productElement);
            });

            document.querySelectorAll('.save-button').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = parseInt(button.getAttribute('data-id'));
                    const priceInput = document.querySelector(`.price-input[data-id="${productId}"]`);
                    const availabilityCheckbox = document.querySelector(`.availability-checkbox[data-id="${productId}"]`);
                    const product = products.find(p => p.id === productId);
                    product.price = parseFloat(priceInput.value);
                    product.available = availabilityCheckbox.checked;
                    alert('Product updated successfully');
                    localStorage.setItem('products', JSON.stringify(products));
                });
            });
        }
    }

    if (localStorage.getItem('adminLoggedIn') === 'true') {
        renderProducts();
    } else if (window.location.pathname.includes('admin-dashboard.html')) {
        window.location.href = 'admin-login.html';
    }

    // Sample data for the profit chart
    const profitData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Monthly Profit',
            data: [1200, 1900, 3000, 5000, 2000, 3000],
            backgroundColor: 'rgba(255, 0, 0, 0.6)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 2,
            borderRadius: 5,
            hoverBackgroundColor: 'rgba(255, 0, 0, 1)',
            hoverBorderColor: '#ffffff'
        }]
    };

    // Chart configuration
    const chartConfig = {
        type: 'bar',
        data: profitData,
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ff0000',
                    bodyColor: '#ffffff',
                    callbacks: {
                        label: function(context) {
                            return 'Profit: $' + context.parsed.y;
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            onHover: (event, elements) => {
                const chart = event.chart;
                chart.canvas.style.cursor = elements.length ? 'pointer' : 'default';
            }
        }
    };

    // Initialize the chart
    const ctx = document.getElementById('profitChart');
    if (ctx) {
        const chart = new Chart(ctx, chartConfig);

        // Add click event for interactivity
        ctx.onclick = (evt) => {
            const points = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
            if (points.length) {
                const firstPoint = points[0];
                const label = chart.data.labels[firstPoint.index];
                const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                alert(`Month: ${label}\nProfit: $${value}`);
            }
        };
    }
});