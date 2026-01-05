// ==========================================
// CUTE SHOP - JavaScript Functions
// ==========================================

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    enableCardAddToCart();
});

// Navigate to product detail page
function goToProductDetail(productId) {
    console.log('goToProductDetail called, id=', productId);
    // use assign for more explicit navigation
    window.location.assign(`product-detail.html?id=${productId}`);
}

// ==========================================
// CART FUNCTIONS
// ==========================================

// Add item to cart
function addToCart(id, name, price, icon) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            icon: icon,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`Đã thêm "${name}" vào giỏ hàng! 🎉`);
}

// Allow clicking anywhere on a product card to add it to cart
function enableCardAddToCart() {
    // No-op to preserve navigation to product detail pages on all cards.
}

// Update cart count badge
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Format price in Vietnamese format
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price).replace('₫', '').trim() + '₫';
}

// ==========================================
// PRODUCT FILTER FUNCTIONS
// ==========================================

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.tab-btn');
    
    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'all' && btn.textContent.includes('Tất Cả'))) {
            btn.classList.add('active');
        }
    });
    
    // Filter products
    products.forEach((product, index) => {
        const productCategory = product.dataset.category;
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            product.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        } else {
            product.style.display = 'none';
        }
    });
}

// ==========================================
// TOAST NOTIFICATION
// ==========================================

function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Clear entire cart
function clearCart() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
        localStorage.removeItem('cart');
        updateCartCount();
        if (typeof renderCart === 'function') {
            renderCart();
        }
        showToast('Đã xóa toàn bộ giỏ hàng! 🗑️');
    }
}

// Get cart total
function getCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Get cart items count
function getCartItemsCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}
