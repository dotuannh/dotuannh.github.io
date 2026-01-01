// ========================== DATA STORAGE ==========================
let staffData = [
    { id: 1, name: 'Nguyen Van A', email: 'nguyena@library.com', phone: '0123456789', department: 'library', position: 'Head Librarian', salary: 15000000, status: 'active' },
    { id: 2, name: 'Tran Thi B', email: 'tranb@library.com', phone: '0987654321', department: 'it', position: 'IT Support', salary: 12000000, status: 'active' },
    { id: 3, name: 'Le Van C', email: 'levan@library.com', phone: '0111222333', department: 'library', position: 'Library Manager', salary: 10000000, status: 'active' }
];

let booksData = [
    { id: 1, isbn: '978-3-16-148410-0', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'fiction', price: 50000, quantity: 10, status: 'available', year: 2020 },
    { id: 2, isbn: '978-0-596-52068-7', title: 'The Alchemist', author: 'Paulo Coelho', category: 'fiction', price: 75000, quantity: 8, status: 'available', year: 2019 },
    { id: 3, isbn: '978-0-13-110362-7', title: 'C Programming Language', author: 'Brian W. Kernighan', category: 'technology', price: 250000, quantity: 5, status: 'available', year: 2021 },
    { id: 4, isbn: '978-0-7432-7356-5', title: '1984', author: 'George Orwell', category: 'fiction', price: 55000, quantity: 7, status: 'available', year: 2018 },
    { id: 5, isbn: '978-0-14-118975-8', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'science', price: 120000, quantity: 4, status: 'available', year: 2019 }
];

let ordersData = [
    { id: 1, orderCode: 'ORD001', supplier: 'Publishing House A', date: '2024-01-10', quantity: 50, totalPrice: 2500000, status: 'delivered' },
    { id: 2, orderCode: 'ORD002', supplier: 'Publishing House B', date: '2024-01-15', quantity: 30, totalPrice: 1800000, status: 'shipped' },
    { id: 3, orderCode: 'ORD003', supplier: 'Publishing House C', date: '2024-01-20', quantity: 20, totalPrice: 1200000, status: 'pending' }
];

let suppliersData = [
    { id: 1, name: 'Publishing House A', email: 'info@pubA.com', phone: '028 3932 1111', address: 'Ho Chi Minh City', contact: 'Mr. Tran', status: 'active' },
    { id: 2, name: 'Publishing House B', email: 'info@pubB.com', phone: '028 3932 2222', address: 'Ho Chi Minh City', contact: 'Ms. Tran', status: 'active' },
    { id: 3, name: 'Publishing House C', email: 'info@pubC.com', phone: '028 3932 3333', address: 'Ho Chi Minh City', contact: 'Mr. Hoang', status: 'active' }
];

let auditLogs = [
    { id: 1, time: '2024-01-20 10:30', level: 'info', user: 'admin', action: 'Add Book', description: 'Added new book: The Alchemist' },
    { id: 2, time: '2024-01-20 09:15', level: 'warning', user: 'admin', action: 'Update Staff', description: 'Updated staff info: Nguyen Van A' },
    { id: 3, time: '2024-01-19 15:45', level: 'error', user: 'admin', action: 'Delete Order', description: 'Error deleting order ORD001' },
    { id: 4, time: '2024-01-19 14:20', level: 'info', user: 'admin', action: 'Login', description: 'Successful login' }
];

// Member Data
let memberData = {
    id: 'M001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '0987654321',
    address: '123 Main Street, City',
    memberSince: '2023-01-15',
    totalFines: 0
};

let memberLoans = [
    { id: 1, bookId: 1, bookTitle: 'The Great Gatsby', author: 'F. Scott Fitzgerald', borrowDate: '2024-01-05', dueDate: '2024-02-05', returnDate: null, status: 'active' },
    { id: 2, bookId: 2, bookTitle: 'The Alchemist', author: 'Paulo Coelho', borrowDate: '2024-01-10', dueDate: '2024-02-10', returnDate: null, status: 'active' }
];

let memberReservations = [
    { id: 1, bookId: 3, bookTitle: 'C Programming Language', author: 'Brian W. Kernighan', reservedDate: '2024-01-15', status: 'pending' }
];

let loanHistory = [
    { id: 1, bookTitle: 'To Kill a Mockingbird', author: 'Harper Lee', borrowDate: '2023-10-01', returnDate: '2023-11-05', daysBorrowed: 35, status: 'returned' },
    { id: 2, bookTitle: 'Pride and Prejudice', author: 'Jane Austen', borrowDate: '2023-11-10', returnDate: '2023-12-20', daysBorrowed: 40, status: 'returned' }
];

let memberFines = [];

let notifications = [
    { id: 1, type: 'success', title: 'Book Borrowed Successfully', message: 'You have borrowed "The Great Gatsby"', time: '2024-01-20 10:00' },
    { id: 2, type: 'warning', title: 'Book Due Soon', message: '"The Alchemist" is due on 2024-02-10', time: '2024-01-18 14:30' },
    { id: 3, type: 'info', title: 'Reserved Book Ready', message: '"C Programming Language" is now available for pickup', time: '2024-01-16 09:15' }
];

let currentUser = null;
let editingId = null;

// ========================== INITIALIZATION ==========================
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        showApp();
    } else {
        showLogin();
    }
    
    setupLoginListeners();
    setupNavigationListeners();
    setupModalListeners();
});

// ========================== LOGIN FUNCTIONS ==========================
function setupLoginListeners() {
    const form = document.getElementById('login-form');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            const user = document.getElementById('login-username').value;
            const pass = document.getElementById('login-password').value;
            const role = document.getElementById('login-role').value;
            
            if (role === 'member' && user === 'john' && pass === 'john123') {
                currentUser = { username: 'john', role: 'member', name: 'John Doe', id: 'M001' };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showApp();
            } else if (role === 'librarian' && user === 'admin' && pass === 'admin123') {
                currentUser = { username: 'admin', role: 'librarian', name: 'Librarian Admin', id: 0 };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showApp();
            } else {
                alert('Invalid username or password!');
            }
        };
    }
    
    const demoMemberBtn = document.getElementById('demo-member');
    if (demoMemberBtn) {
        demoMemberBtn.onclick = function() {
            currentUser = { username: 'john', role: 'member', name: 'John Doe', id: 'M001' };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showApp();
        };
    }
    
    const demoLibrarianBtn = document.getElementById('demo-librarian');
    if (demoLibrarianBtn) {
        demoLibrarianBtn.onclick = function() {
            currentUser = { username: 'admin', role: 'librarian', name: 'Librarian Admin', id: 0 };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showApp();
        };
    }
}

function showLogin() {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
}

function showApp() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    
    document.getElementById('user-name').textContent = currentUser.name;
    
    // Show appropriate menu based on role
    const librarianMenu = document.getElementById('librarian-menu');
    const memberMenu = document.getElementById('member-menu');
    
    if (currentUser.role === 'member') {
        if (librarianMenu) librarianMenu.style.display = 'none';
        if (memberMenu) memberMenu.style.display = 'block';
    } else {
        if (librarianMenu) librarianMenu.style.display = 'block';
        if (memberMenu) memberMenu.style.display = 'none';
    }
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            localStorage.removeItem('currentUser');
            location.reload();
        };
    }
    
    // Load appropriate dashboard
    if (currentUser.role === 'member') {
        showPage('member-dashboard');
        loadMemberDashboard();
    } else {
        showPage('dashboard');
        loadDashboard();
    }
}

// ========================== NAVIGATION ==========================
function setupNavigationListeners() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active to clicked item
            this.classList.add('active');
            
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    
    // Show selected page
    const selectedPage = document.getElementById(pageId + '-page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
    
    // Update title
    const librarianTitles = {
        dashboard: 'Dashboard',
        staff: 'Staff Management',
        books: 'Books Management',
        orders: 'Orders Management',
        suppliers: 'Suppliers Management',
        reports: 'Reports',
        audit: 'Audit & Monitoring',
        settings: 'System Configuration'
    };
    
    const memberTitles = {
        'member-dashboard': 'My Profile',
        'member-search': 'Search Books',
        'member-reservations': 'My Reservations',
        'member-history': 'Loan History',
        'member-fines': 'My Fines',
        'member-notifications': 'Notifications'
    };
    
    const titles = currentUser.role === 'member' ? memberTitles : librarianTitles;
    document.getElementById('page-title').textContent = titles[pageId] || 'Page';
    
    // Load page content
    if (currentUser.role === 'member') {
        switch(pageId) {
            case 'member-dashboard':
                loadMemberDashboard();
                break;
            case 'member-search':
                loadMemberSearchPage();
                break;
            case 'member-reservations':
                loadMemberReservationsPage();
                break;
            case 'member-history':
                loadMemberHistoryPage();
                break;
            case 'member-fines':
                loadMemberFinesPage();
                break;
            case 'member-notifications':
                loadMemberNotificationsPage();
                break;
        }
    } else {
        switch(pageId) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'staff':
                loadStaffPage();
                break;
            case 'books':
                loadBooksPage();
                break;
            case 'orders':
                loadOrdersPage();
                break;
            case 'suppliers':
                loadSuppliersPage();
                break;
            case 'reports':
                loadReportsPage();
                break;
            case 'audit':
                loadAuditPage();
                break;
            case 'settings':
                loadSettingsPage();
                break;
        }
    }
}

// ========================== DASHBOARD ==========================
function loadDashboard() {
    document.getElementById('total-books').textContent = booksData.length;
    document.getElementById('total-staff').textContent = staffData.length;
    document.getElementById('total-orders').textContent = ordersData.length;
    document.getElementById('total-suppliers').textContent = suppliersData.length;
    
    // Draw chart
    setTimeout(() => {
        drawCategoryChart();
    }, 100);
}

function drawCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    const categories = {};
    booksData.forEach(book => {
        categories[book.category] = (categories[book.category] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#667eea', '#764ba2', '#4facfe', '#43e97b'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// ========================== STAFF PAGE ==========================
function loadStaffPage() {
    renderStaffTable(staffData);
    
    const addBtn = document.getElementById('add-staff-btn');
    addBtn.onclick = () => openStaffModal();
}

function renderStaffTable(data) {
    const tbody = document.getElementById('staff-table-body');
    tbody.innerHTML = '';
    
    data.forEach(staff => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${staff.id}</td>
            <td>${staff.name}</td>
            <td>${staff.email}</td>
            <td>${staff.department}</td>
            <td>${staff.position}</td>
            <td><span class="badge ${staff.status === 'active' ? 'badge-success' : 'badge-danger'}">${staff.status === 'active' ? 'Active' : 'Inactive'}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-primary" onclick="editStaff(${staff.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStaff(${staff.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openStaffModal(id = null) {
    editingId = id;
    const modal = document.getElementById('staff-modal');
    const form = document.getElementById('staff-form');
    
    if (id) {
        const staff = staffData.find(s => s.id === id);
        document.querySelector('#staff-modal .modal-header h2').textContent = 'Edit Staff';
        document.getElementById('staff-name').value = staff.name;
        document.getElementById('staff-email').value = staff.email;
        document.getElementById('staff-phone').value = staff.phone;
        document.getElementById('staff-dept').value = staff.department;
        document.getElementById('staff-position').value = staff.position;
        document.getElementById('staff-salary').value = staff.salary;
        document.getElementById('staff-status').value = staff.status;
    } else {
        document.querySelector('#staff-modal .modal-header h2').textContent = 'Add Staff';
        form.reset();
    }
    
    showModal(modal);
}

function editStaff(id) {
    openStaffModal(id);
}

function deleteStaff(id) {
    if (confirm('Are you sure you want to delete this staff member?')) {
        staffData = staffData.filter(s => s.id !== id);
        loadStaffPage();
        logAction('Delete Staff', `Deleted staff member ID: ${id}`);
    }
}

document.getElementById('staff-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const staff = {
        name: document.getElementById('staff-name').value,
        email: document.getElementById('staff-email').value,
        phone: document.getElementById('staff-phone').value,
        department: document.getElementById('staff-dept').value,
        position: document.getElementById('staff-position').value,
        salary: parseInt(document.getElementById('staff-salary').value),
        status: document.getElementById('staff-status').value
    };
    
    if (editingId) {
        const index = staffData.findIndex(s => s.id === editingId);
        staffData[index] = { ...staffData[index], ...staff };
        logAction('Update Staff', `Updated staff info: ${staff.name}`);
    } else {
        staff.id = Math.max(...staffData.map(s => s.id)) + 1;
        staffData.push(staff);
        logAction('Add Staff', `Added new staff: ${staff.name}`);
    }
    
    closeModal('staff-modal');
    loadStaffPage();
});

// ========================== BOOKS PAGE ==========================
function loadBooksPage() {
    renderBooksTable(booksData);
    
    const addBtn = document.getElementById('add-book-btn');
    addBtn.onclick = () => openBookModal();
}

function renderBooksTable(data) {
    const tbody = document.getElementById('books-table-body');
    tbody.innerHTML = '';
    
    data.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.isbn}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${getCategoryName(book.category)}</td>
            <td>${formatPrice(book.price)}</td>
            <td>${book.quantity}</td>
            <td><span class="badge ${book.status === 'available' ? 'badge-success' : 'badge-warning'}">${book.status === 'available' ? 'Available' : 'Borrowed'}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-primary" onclick="editBook(${book.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openBookModal(id = null) {
    editingId = id;
    const modal = document.getElementById('book-modal');
    const form = document.getElementById('book-form');
    
    if (id) {
        const book = booksData.find(b => b.id === id);
        document.querySelector('#book-modal .modal-header h2').textContent = 'Edit Book';
        document.getElementById('book-isbn').value = book.isbn;
        document.getElementById('book-title').value = book.title;
        document.getElementById('book-author').value = book.author;
        document.getElementById('book-category').value = book.category;
        document.getElementById('book-price').value = book.price;
        document.getElementById('book-quantity').value = book.quantity;
        document.getElementById('book-year').value = book.year;
    } else {
        document.querySelector('#book-modal .modal-header h2').textContent = 'Add Book';
        form.reset();
    }
    
    showModal(modal);
}

function editBook(id) {
    openBookModal(id);
}

function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        booksData = booksData.filter(b => b.id !== id);
        loadBooksPage();
        logAction('Delete Book', `Deleted book ID: ${id}`);
    }
}

document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const book = {
        isbn: document.getElementById('book-isbn').value,
        title: document.getElementById('book-title').value,
        author: document.getElementById('book-author').value,
        category: document.getElementById('book-category').value,
        price: parseInt(document.getElementById('book-price').value),
        quantity: parseInt(document.getElementById('book-quantity').value),
        year: parseInt(document.getElementById('book-year').value),
        status: 'available'
    };
    
    if (editingId) {
        const index = booksData.findIndex(b => b.id === editingId);
        booksData[index] = { ...booksData[index], ...book };
        logAction('Update Book', `Updated book: ${book.title}`);
    } else {
        book.id = Math.max(...booksData.map(b => b.id)) + 1;
        booksData.push(book);
        logAction('Add Book', `Added new book: ${book.title}`);
    }
    
    closeModal('book-modal');
    loadBooksPage();
});

// ========================== ORDERS PAGE ==========================
function loadOrdersPage() {
    renderOrdersTable(ordersData);
    
    const addBtn = document.getElementById('add-order-btn');
    addBtn.onclick = () => openOrderModal();
}

function renderOrdersTable(data) {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';
    
    data.forEach(order => {
        const row = document.createElement('tr');
        const statusText = {
            pending: 'Pending',
            confirmed: 'Confirmed',
            shipped: 'Shipped',
            delivered: 'Delivered',
            cancelled: 'Cancelled'
        };
        const statusClass = {
            pending: 'badge-warning',
            confirmed: 'badge-info',
            shipped: 'badge-info',
            delivered: 'badge-success',
            cancelled: 'badge-danger'
        };
        
        row.innerHTML = `
            <td>${order.orderCode}</td>
            <td>${order.supplier}</td>
            <td>${formatDate(order.date)}</td>
            <td>${order.quantity}</td>
            <td>${formatPrice(order.totalPrice)}</td>
            <td><span class="badge ${statusClass[order.status]}">${statusText[order.status]}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-primary" onclick="editOrder(${order.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteOrder(${order.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openOrderModal(id = null) {
    editingId = id;
    const modal = document.getElementById('order-modal');
    
    // Populate supplier dropdown
    const supplierSelect = document.getElementById('order-supplier');
    supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
    suppliersData.forEach(s => {
        const option = document.createElement('option');
        option.value = s.id;
        option.textContent = s.name;
        supplierSelect.appendChild(option);
    });
    
    // Populate book dropdown
    const bookSelect = document.getElementById('order-book');
    bookSelect.innerHTML = '<option value="">Select Book</option>';
    booksData.forEach(b => {
        const option = document.createElement('option');
        option.value = b.id;
        option.textContent = b.title;
        bookSelect.appendChild(option);
    });
    
    if (id) {
        const order = ordersData.find(o => o.id === id);
        document.querySelector('#order-modal .modal-header h2').textContent = 'Edit Order';
        document.getElementById('order-supplier').value = order.supplier;
        document.getElementById('order-notes').value = '';
    } else {
        document.querySelector('#order-modal .modal-header h2').textContent = 'Create Order';
        document.getElementById('order-form').reset();
    }
    
    showModal(modal);
}

function editOrder(id) {
    openOrderModal(id);
}

function deleteOrder(id) {
    if (confirm('Are you sure you want to delete this order?')) {
        ordersData = ordersData.filter(o => o.id !== id);
        loadOrdersPage();
        logAction('Delete Order', `Deleted order ID: ${id}`);
    }
}

document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const order = {
        orderCode: 'ORD' + String(Math.floor(Math.random() * 10000)).padStart(3, '0'),
        supplier: document.getElementById('order-supplier').options[document.getElementById('order-supplier').selectedIndex].text,
        date: new Date().toISOString().split('T')[0],
        quantity: parseInt(document.getElementById('order-quantity').value),
        totalPrice: parseInt(document.getElementById('order-quantity').value) * parseInt(document.getElementById('order-unit-price').value),
        status: 'pending'
    };
    
    if (editingId) {
        const index = ordersData.findIndex(o => o.id === editingId);
        ordersData[index] = { ...ordersData[index], ...order };
        logAction('Update Order', `Updated order: ${order.orderCode}`);
    } else {
        order.id = Math.max(...ordersData.map(o => o.id)) + 1;
        ordersData.push(order);
        logAction('Add Order', `Created new order: ${order.orderCode}`);
    }
    
    closeModal('order-modal');
    loadOrdersPage();
});

// ========================== SUPPLIERS PAGE ==========================
function loadSuppliersPage() {
    renderSuppliersTable(suppliersData);
    
    const addBtn = document.getElementById('add-supplier-btn');
    addBtn.onclick = () => openSupplierModal();
}

function renderSuppliersTable(data) {
    const tbody = document.getElementById('suppliers-table-body');
    tbody.innerHTML = '';
    
    data.forEach(supplier => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.id}</td>
            <td>${supplier.name}</td>
            <td>${supplier.email}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.address}</td>
            <td><span class="badge ${supplier.status === 'active' ? 'badge-success' : 'badge-danger'}">${supplier.status === 'active' ? 'Active' : 'Inactive'}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-primary" onclick="editSupplier(${supplier.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteSupplier(${supplier.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openSupplierModal(id = null) {
    editingId = id;
    const modal = document.getElementById('supplier-modal');
    const form = document.getElementById('supplier-form');
    
    if (id) {
        const supplier = suppliersData.find(s => s.id === id);
        document.querySelector('#supplier-modal .modal-header h2').textContent = 'Edit Supplier';
        document.getElementById('supplier-name').value = supplier.name;
        document.getElementById('supplier-email').value = supplier.email;
        document.getElementById('supplier-phone').value = supplier.phone;
        document.getElementById('supplier-address').value = supplier.address;
        document.getElementById('supplier-contact').value = supplier.contact;
        document.getElementById('supplier-status').value = supplier.status;
    } else {
        document.querySelector('#supplier-modal .modal-header h2').textContent = 'Add Supplier';
        form.reset();
    }
    
    showModal(modal);
}

function editSupplier(id) {
    openSupplierModal(id);
}

function deleteSupplier(id) {
    if (confirm('Are you sure you want to delete this supplier?')) {
        suppliersData = suppliersData.filter(s => s.id !== id);
        loadSuppliersPage();
        logAction('Delete Supplier', `Deleted supplier ID: ${id}`);
    }
}

document.getElementById('supplier-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const supplier = {
        name: document.getElementById('supplier-name').value,
        email: document.getElementById('supplier-email').value,
        phone: document.getElementById('supplier-phone').value,
        address: document.getElementById('supplier-address').value,
        contact: document.getElementById('supplier-contact').value,
        status: document.getElementById('supplier-status').value
    };
    
    if (editingId) {
        const index = suppliersData.findIndex(s => s.id === editingId);
        suppliersData[index] = { ...suppliersData[index], ...supplier };
        logAction('Update Supplier', `Updated supplier: ${supplier.name}`);
    } else {
        supplier.id = Math.max(...suppliersData.map(s => s.id)) + 1;
        suppliersData.push(supplier);
        logAction('Add Supplier', `Added new supplier: ${supplier.name}`);
    }
    
    closeModal('supplier-modal');
    loadSuppliersPage();
});

// ========================== REPORTS PAGE ==========================
function loadReportsPage() {
    setTimeout(() => {
        drawBooksTimeChart();
        drawOrdersChart();
        drawTopStaff();
    }, 100);
}

function drawBooksTimeChart() {
    const ctx = document.getElementById('booksTimeChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Books Sold',
                data: [50, 65, 55, 80, 70, 95, 85, 100, 75, 90, 110, 120],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

function drawOrdersChart() {
    const ctx = document.getElementById('ordersChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
            datasets: [{
                label: 'Orders',
                data: [15, 25, 18, 45, 5],
                backgroundColor: ['#ffa726', '#4facfe', '#673ab7', '#43e97b', '#f5576c']
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function drawTopStaff() {
    const container = document.getElementById('top-staff-list');
    if (!container) return;
    
    container.innerHTML = '';
    staffData.slice(0, 3).forEach((staff, index) => {
        const item = document.createElement('div');
        item.className = 'top-staff-item';
        item.innerHTML = `
            <div>
                <div class="top-staff-name">${index + 1}. ${staff.name}</div>
                <small>${staff.position}</small>
            </div>
            <div class="top-staff-value">${staff.salary.toLocaleString()}</div>
        `;
        container.appendChild(item);
    });
}

// ========================== AUDIT PAGE ==========================
function loadAuditPage() {
    renderAuditLogs(auditLogs);
}

function renderAuditLogs(data) {
    const tbody = document.getElementById('audit-log-body');
    tbody.innerHTML = '';
    
    data.forEach(log => {
        const row = document.createElement('tr');
        const levelClass = {
            info: 'badge-info',
            warning: 'badge-warning',
            error: 'badge-danger'
        };
        
        row.innerHTML = `
            <td>${log.time}</td>
            <td><span class="badge ${levelClass[log.level]}">${log.level.toUpperCase()}</span></td>
            <td>${log.user}</td>
            <td>${log.action}</td>
            <td>${log.description}</td>
        `;
        tbody.appendChild(row);
    });
}

// ========================== SETTINGS PAGE ==========================
function loadSettingsPage() {
    // Settings page is already pre-filled with default values
    console.log('Settings page loaded');
}

// ========================== MODAL FUNCTIONS ==========================
function setupModalListeners() {
    // Close modals
    const closeButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });
    
    // Close modal on backdrop click
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            document.querySelectorAll('.modal.show').forEach(m => closeModal(m.id));
        });
    }
}

function showModal(modal) {
    modal.classList.add('show');
    document.getElementById('modal-backdrop').classList.add('show');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
    
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop && !document.querySelector('.modal.show')) {
        backdrop.classList.remove('show');
    }
}

// ========================== UTILITY FUNCTIONS ==========================
function getCategoryName(category) {
    const names = {
        fiction: 'Fiction',
        science: 'Science',
        history: 'History',
        technology: 'Technology'
    };
    return names[category] || category;
}

function formatPrice(price) {
    return price.toLocaleString('en-US') + ' VND';
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US');
}

function logAction(action, description) {
    const log = {
        id: auditLogs.length + 1,
        time: new Date().toLocaleString('en-US'),
        level: 'info',
        user: 'admin',
        action: action,
        description: description
    };
    auditLogs.unshift(log);
}

// ========================== MEMBER PAGES ==========================
function loadMemberDashboard() {
    // Update member info
    document.getElementById('member-name').textContent = memberData.name;
    document.getElementById('member-id').textContent = memberData.id;
    document.getElementById('member-since').textContent = formatDate(memberData.memberSince);
    document.getElementById('books-borrowed').textContent = memberLoans.length;
    document.getElementById('books-reserved').textContent = memberReservations.length;
    document.getElementById('notifications-count').textContent = notifications.length;
    document.getElementById('outstanding-fine').textContent = formatPrice(memberData.totalFines);
    
    // Render current loans
    renderCurrentLoans();
}

function renderCurrentLoans() {
    const container = document.getElementById('member-current-loans');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (memberLoans.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">You have no active loans</p>';
        return;
    }
    
    memberLoans.forEach(loan => {
        const row = document.createElement('tr');
        const daysLeft = Math.ceil((new Date(loan.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        const dueStatus = daysLeft <= 3 ? 'danger' : daysLeft <= 7 ? 'warning' : 'success';
        
        row.innerHTML = `
            <td>${loan.bookTitle}</td>
            <td>${loan.author}</td>
            <td>${formatDate(loan.borrowDate)}</td>
            <td>${formatDate(loan.dueDate)}</td>
            <td><span class="badge badge-${dueStatus}">${daysLeft} days left</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-primary btn-sm" onclick="renewLoan(${loan.id})">Renew</button>
                </div>
            </td>
        `;
        container.appendChild(row);
    });
}

function loadMemberSearchPage() {
    const booksContainer = document.getElementById('books-grid');
    if (!booksContainer) return;
    
    renderAvailableBooks(booksData);
    
    // Setup search filters
    const searchInput = document.getElementById('search-title');
    const categorySelect = document.getElementById('search-category');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterBooks);
    }
    if (categorySelect) {
        categorySelect.addEventListener('change', filterBooks);
    }
}

function renderAvailableBooks(books) {
    const grid = document.getElementById('books-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        
        const isReserved = memberReservations.some(r => r.bookId === book.id);
        const isBorrowed = memberLoans.some(l => l.bookId === book.id);
        
        card.innerHTML = `
            <div class="book-cover">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                    ${book.title.substring(0, 2).toUpperCase()}
                </div>
            </div>
            <div class="book-card-content">
                <h4>${book.title}</h4>
                <p style="color: #666; margin: 5px 0; font-size: 0.9em;">${book.author}</p>
                <p style="color: #999; margin: 5px 0; font-size: 0.85em;">${getCategoryName(book.category)}</p>
                <p style="color: #667eea; font-weight: bold; margin: 10px 0;">${formatPrice(book.price)}</p>
                <div class="book-card-actions">
                    ${isBorrowed ? 
                        '<span class="badge badge-info" style="width: 100%; text-align: center;">Already Borrowed</span>' :
                        isReserved ? 
                        `<button class="btn btn-secondary" style="width: 100%;">Reserved</button>
                         <button class="btn btn-danger btn-sm" onclick="cancelReservation(${book.id})" style="width: 100%; margin-top: 5px;">Cancel</button>` :
                        `<button class="btn btn-primary" style="width: 100%;" onclick="borrowBook(${book.id})">Borrow</button>
                         <button class="btn btn-secondary btn-sm" style="width: 100%; margin-top: 5px;" onclick="reserveBook(${book.id})">Reserve</button>`
                    }
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function filterBooks() {
    const title = (document.getElementById('search-title')?.value || '').toLowerCase();
    const category = document.getElementById('search-category')?.value || '';
    
    const filtered = booksData.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(title);
        const categoryMatch = !category || book.category === category;
        return titleMatch && categoryMatch;
    });
    
    renderAvailableBooks(filtered);
}

function borrowBook(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    // Check if already borrowed
    if (memberLoans.some(l => l.bookId === bookId)) {
        alert('You have already borrowed this book!');
        return;
    }
    
    // Create new loan
    const newLoan = {
        id: memberLoans.length + 1,
        bookId: bookId,
        bookTitle: book.title,
        author: book.author,
        borrowDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        returnDate: null,
        status: 'active'
    };
    
    memberLoans.push(newLoan);
    book.quantity--;
    
    notifications.unshift({
        id: notifications.length + 1,
        type: 'success',
        title: 'Book Borrowed',
        message: `You have borrowed "${book.title}"`,
        time: new Date().toLocaleString()
    });
    
    alert(`Successfully borrowed "${book.title}". Due date: ${formatDate(newLoan.dueDate)}`);
    loadMemberSearchPage();
}

function reserveBook(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    // Check if already reserved
    if (memberReservations.some(r => r.bookId === bookId)) {
        alert('You have already reserved this book!');
        return;
    }
    
    const newReservation = {
        id: memberReservations.length + 1,
        bookId: bookId,
        bookTitle: book.title,
        author: book.author,
        reservedDate: new Date().toISOString().split('T')[0],
        status: 'pending'
    };
    
    memberReservations.push(newReservation);
    
    notifications.unshift({
        id: notifications.length + 1,
        type: 'info',
        title: 'Book Reserved',
        message: `You have reserved "${book.title}"`,
        time: new Date().toLocaleString()
    });
    
    alert(`Successfully reserved "${book.title}"`);
    loadMemberSearchPage();
}

function cancelReservation(bookId) {
    const index = memberReservations.findIndex(r => r.bookId === bookId);
    if (index !== -1) {
        memberReservations.splice(index, 1);
        alert('Reservation cancelled');
        loadMemberSearchPage();
    }
}

function renewLoan(loanId) {
    const loan = memberLoans.find(l => l.id === loanId);
    if (!loan) return;
    
    const oldDate = new Date(loan.dueDate);
    loan.dueDate = new Date(oldDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    notifications.unshift({
        id: notifications.length + 1,
        type: 'success',
        title: 'Loan Renewed',
        message: `"${loan.bookTitle}" has been renewed. New due date: ${formatDate(loan.dueDate)}`,
        time: new Date().toLocaleString()
    });
    
    alert(`Loan renewed! New due date: ${formatDate(loan.dueDate)}`);
    loadMemberDashboard();
}

function loadMemberReservationsPage() {
    renderReservations();
}

function renderReservations() {
    const tbody = document.getElementById('reservations-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (memberReservations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">You have no reservations</td></tr>';
        return;
    }
    
    memberReservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.bookTitle}</td>
            <td>${reservation.author}</td>
            <td>${formatDate(reservation.reservedDate)}</td>
            <td><span class="badge ${reservation.status === 'pending' ? 'badge-warning' : 'badge-success'}">${reservation.status === 'pending' ? 'Pending' : 'Ready'}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-danger btn-sm" onclick="cancelReservation(${reservation.bookId})">Cancel</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadMemberHistoryPage() {
    renderLoanHistory();
}

function renderLoanHistory() {
    const tbody = document.getElementById('history-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Combine returned loans and history
    const allHistory = [...loanHistory, ...memberLoans.filter(l => l.returnDate)];
    
    if (allHistory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">No loan history</td></tr>';
        return;
    }
    
    allHistory.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.bookTitle}</td>
            <td>${formatDate(record.borrowDate)}</td>
            <td>${record.returnDate ? formatDate(record.returnDate) : 'Not returned'}</td>
            <td>${record.daysBorrowed || Math.ceil((new Date(record.returnDate) - new Date(record.borrowDate)) / (1000 * 60 * 60 * 24))} days</td>
            <td><span class="badge badge-success">${record.status === 'returned' ? 'Returned' : 'Active'}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function loadMemberFinesPage() {
    renderFines();
}

function renderFines() {
    const container = document.getElementById('fines-container');
    if (!container) return;
    
    // Calculate fines for overdue loans
    memberFines = [];
    memberLoans.forEach(loan => {
        const dueDate = new Date(loan.dueDate);
        const today = new Date();
        if (today > dueDate) {
            const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
            const fineAmount = daysLate * 5000; // 5000 VND per day
            
            if (!memberFines.find(f => f.bookId === loan.bookId)) {
                memberFines.push({
                    id: memberFines.length + 1,
                    bookId: loan.bookId,
                    bookTitle: loan.bookTitle,
                    dueDate: loan.dueDate,
                    daysLate: daysLate,
                    fineAmount: fineAmount,
                    status: 'unpaid'
                });
            }
        }
    });
    
    memberData.totalFines = memberFines.reduce((sum, f) => sum + f.fineAmount, 0);
    
    const tbody = document.getElementById('fines-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (memberFines.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #999;">No outstanding fines</td></tr>';
        return;
    }
    
    memberFines.forEach(fine => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fine.bookTitle}</td>
            <td>${formatDate(fine.dueDate)}</td>
            <td>${fine.daysLate}</td>
            <td>${formatPrice(fine.fineAmount)}</td>
            <td><span class="badge badge-danger">Unpaid</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-primary btn-sm" onclick="payFine(${fine.id}, ${fine.fineAmount})">Pay</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Update fine stats
    document.getElementById('outstanding-fine-amount').textContent = formatPrice(memberData.totalFines);
    document.getElementById('total-fines-count').textContent = memberFines.length;
}

function payFine(fineId, amount) {
    const fine = memberFines.find(f => f.id === fineId);
    if (!fine) return;
    
    if (confirm(`Pay ${formatPrice(amount)} for "${fine.bookTitle}"?`)) {
        fine.status = 'paid';
        memberFines = memberFines.filter(f => f.id !== fineId);
        memberData.totalFines = memberFines.reduce((sum, f) => sum + f.fineAmount, 0);
        
        notifications.unshift({
            id: notifications.length + 1,
            type: 'success',
            title: 'Fine Paid',
            message: `You have paid ${formatPrice(amount)} for "${fine.bookTitle}"`,
            time: new Date().toLocaleString()
        });
        
        alert(`Payment successful! ${formatPrice(amount)} has been paid.`);
        loadMemberFinesPage();
    }
}

function loadMemberNotificationsPage() {
    renderNotifications();
}

function renderNotifications() {
    const container = document.getElementById('notifications-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (notifications.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No notifications</p>';
        return;
    }
    
    notifications.forEach(notif => {
        const item = document.createElement('div');
        item.className = `notification-item notification-${notif.type}`;
        
        const iconMap = {
            success: '✓',
            warning: '⚠',
            error: '✕',
            info: 'ℹ'
        };
        
        item.innerHTML = `
            <div class="notification-icon">${iconMap[notif.type] || 'ℹ'}</div>
            <div class="notification-content">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">${notif.time}</div>
            </div>
        `;
        
        container.appendChild(item);
    });
}
