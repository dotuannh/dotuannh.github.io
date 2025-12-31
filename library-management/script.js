// DATA STORAGE
let books = [];
let members = [];
let borrowings = [];
let history = [];
let currentUser = null;

// INITIALIZE
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== APP STARTED ===');
    loadSampleData();
    
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        console.log('Saved user:', currentUser.name);
        showApp();
    } else {
        showLogin();
    }
    
    setupLoginListeners();
});

// LOGIN
function setupLoginListeners() {
    const form = document.getElementById('login-form');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            const user = document.getElementById('login-username').value;
            const pass = document.getElementById('login-password').value;
            const role = document.getElementById('login-role').value;
            
            if (role === 'user' && user === 'user' && pass === 'user123') {
                currentUser = { username: 'user', role: 'user', name: 'Nguyễn Văn A', id: 1 };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showApp();
            } else if (role === 'librarian' && user === 'admin' && pass === 'admin123') {
                currentUser = { username: 'admin', role: 'admin', name: 'Thủ thư Admin', id: 0 };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showApp();
            } else {
                alert('Sai tài khoản!');
            }
        };
    }
    
    const btnUser = document.getElementById('quick-login-user');
    if (btnUser) {
        btnUser.onclick = function() {
            currentUser = { username: 'user', role: 'user', name: 'Nguyễn Văn A', id: 1 };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showApp();
        };
    }
    
    const btnAdmin = document.getElementById('quick-login-admin');
    if (btnAdmin) {
        btnAdmin.onclick = function() {
            currentUser = { username: 'admin', role: 'admin', name: 'Thủ thư Admin', id: 0 };
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
    console.log('Showing app for:', currentUser.name, currentUser.role);
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-role-badge').textContent = currentUser.role === 'admin' ? 'Thủ thư' : 'Người mượn';
    
    setupMenu();
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            localStorage.removeItem('currentUser');
            location.reload();
        };
    }
    
    if (currentUser.role === 'admin') {
        showAdminDashboard();
    } else {
        showUserCatalog();
    }
}

function setupMenu() {
    const nav = document.getElementById('nav-menu');
    if (currentUser.role === 'admin') {
        nav.innerHTML = `
            <a href="#" class="nav-item active" onclick="showAdminDashboard(); return false;"><i class="fas fa-chart-line"></i><span>Tổng quan</span></a>
            <a href="#" class="nav-item" onclick="showAdminBooks(); return false;"><i class="fas fa-book"></i><span>Quản lý sách</span></a>
            <a href="#" class="nav-item" onclick="showAdminMembers(); return false;"><i class="fas fa-users"></i><span>Thành viên</span></a>
            <a href="#" class="nav-item" onclick="showAdminBorrowing(); return false;"><i class="fas fa-exchange-alt"></i><span>Mượn/Trả sách</span></a>
            <a href="#" class="nav-item" onclick="showAdminHistory(); return false;"><i class="fas fa-history"></i><span>Lịch sử</span></a>
        `;
    } else {
        nav.innerHTML = `
            <a href="#" class="nav-item active" onclick="showUserCatalog(); return false;"><i class="fas fa-book"></i><span>Danh mục sách</span></a>
            <a href="#" class="nav-item" onclick="showUserBorrowings(); return false;"><i class="fas fa-book-reader"></i><span>Sách đang mượn</span></a>
        `;
    }
}

function setActivePage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    const page = document.getElementById(name + '-page');
    if (page) page.classList.add('active');
    
    const titles = {dashboard: 'Tổng quan', books: 'Quản lý sách', members: 'Thành viên', borrowing: 'Mượn/Trả sách', history: 'Lịch sử', catalog: 'Danh mục sách', 'my-borrowings': 'Sách đang mượn'};
    document.getElementById('page-title').textContent = titles[name] || 'Library';
}

// ADMIN
function showAdminDashboard() {
    setActivePage('dashboard');
    document.querySelectorAll('.nav-item')[0].classList.add('active');
    updateDashboard();
}

function showAdminBooks() {
    setActivePage('books');
    document.querySelectorAll('.nav-item')[1].classList.add('active');
    renderBooks();
    const btn = document.getElementById('add-book-btn');
    if (btn) btn.onclick = function() { openBookModal(); };
}

function showAdminMembers() {
    setActivePage('members');
    document.querySelectorAll('.nav-item')[2].classList.add('active');
    renderMembers();
    const btn = document.getElementById('add-member-btn');
    if (btn) btn.onclick = function() { openMemberModal(); };
}

function showAdminBorrowing() {
    setActivePage('borrowing');
    document.querySelectorAll('.nav-item')[3].classList.add('active');
    renderBorrowings();
    updateBorrowFormSelects();
    const form = document.getElementById('borrow-form');
    if (form) form.onsubmit = function(e) { e.preventDefault(); borrowBook(); };
}

function showAdminHistory() {
    setActivePage('history');
    document.querySelectorAll('.nav-item')[4].classList.add('active');
    renderHistory();
}

// USER
function showUserCatalog() {
    setActivePage('catalog');
    document.querySelectorAll('.nav-item')[0].classList.add('active');
    renderBooksCatalog();
}

function showUserBorrowings() {
    setActivePage('my-borrowings');
    document.querySelectorAll('.nav-item')[1].classList.add('active');
    renderMyBorrowings();
}

// DASHBOARD
function updateDashboard() {
    const total = books.reduce((s, b) => s + b.quantity, 0);
    const borrowed = borrowings.filter(b => b.status === 'borrowed').length;
    document.getElementById('total-books').textContent = total;
    document.getElementById('total-members').textContent = members.length;
    document.getElementById('borrowed-books').textContent = borrowed;
    document.getElementById('available-books').textContent = total - borrowed;
    
    const list = document.getElementById('recent-activities-list');
    const recent = history.slice(-5).reverse();
    if (recent.length === 0) {
        list.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">Chưa có hoạt động</p>';
    } else {
        list.innerHTML = recent.map(h => {
            const m = members.find(x => x.id === h.memberId);
            const b = books.find(x => x.id === h.bookId);
            return `<div class="activity-item"><div class="activity-icon"><i class="fas fa-${h.action === 'borrow' ? 'book-reader' : 'undo'}"></i></div><div class="activity-info"><p><strong>${m?.name || 'N/A'}</strong> ${h.action === 'borrow' ? 'mượn' : 'trả'} <strong>${b?.title || 'N/A'}</strong></p><small>${formatDate(h.date)}</small></div></div>`;
        }).join('');
    }
}

// BOOKS
function renderBooks() {
    const tbody = document.getElementById('books-table-body');
    if (books.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #999;">Chưa có sách</td></tr>';
        return;
    }
    tbody.innerHTML = books.map(b => {
        const borrowed = borrowings.filter(x => x.bookId === b.id && x.status === 'borrowed').length;
        const avail = b.quantity - borrowed;
        return `<tr><td>#${b.id}</td><td>${b.title}</td><td>${b.author}</td><td>${b.category}</td><td>${b.isbn || 'N/A'}</td><td>${avail}/${b.quantity}</td><td><span class="status-badge status-${avail > 0 ? 'available' : 'borrowed'}">${avail > 0 ? 'Còn' : 'Hết'}</span></td><td><button class="btn btn-warning btn-sm" onclick="editBook(${b.id})"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm" onclick="deleteBook(${b.id})"><i class="fas fa-trash"></i></button></td></tr>`;
    }).join('');
}

function openBookModal(id) {
    const modal = document.getElementById('book-modal');
    const form = document.getElementById('book-form');
    form.reset();
    if (id) {
        const b = books.find(x => x.id === id);
        document.getElementById('book-modal-title').textContent = 'Sửa sách';
        document.getElementById('book-id').value = b.id;
        document.getElementById('book-title').value = b.title;
        document.getElementById('book-author').value = b.author;
        document.getElementById('book-category').value = b.category;
        document.getElementById('book-isbn').value = b.isbn || '';
        document.getElementById('book-quantity').value = b.quantity;
    } else {
        document.getElementById('book-modal-title').textContent = 'Thêm sách';
    }
    modal.style.display = 'block';
    form.onsubmit = function(e) { e.preventDefault(); saveBook(); };
    modal.querySelector('.close').onclick = function() { modal.style.display = 'none'; };
    modal.querySelector('.cancel-btn').onclick = function() { modal.style.display = 'none'; };
}

function saveBook() {
    const id = document.getElementById('book-id').value;
    const data = {
        title: document.getElementById('book-title').value,
        author: document.getElementById('book-author').value,
        category: document.getElementById('book-category').value,
        isbn: document.getElementById('book-isbn').value,
        quantity: parseInt(document.getElementById('book-quantity').value)
    };
    if (id) {
        Object.assign(books.find(b => b.id === parseInt(id)), data);
    } else {
        books.push({ id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1, ...data });
    }
    document.getElementById('book-modal').style.display = 'none';
    renderBooks();
    updateDashboard();
}

function editBook(id) { openBookModal(id); }
function deleteBook(id) { if (confirm('Xóa?')) { books = books.filter(b => b.id !== id); renderBooks(); }}

// MEMBERS
function renderMembers() {
    const tbody = document.getElementById('members-table-body');
    if (members.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #999;">Chưa có thành viên</td></tr>';
        return;
    }
    tbody.innerHTML = members.map(m => {
        const borrowed = borrowings.filter(b => b.memberId === m.id && b.status === 'borrowed').length;
        return `<tr><td>#${m.id}</td><td>${m.name}</td><td>${m.email}</td><td>${m.phone}</td><td>${formatDate(m.joinDate)}</td><td>${borrowed}</td><td><button class="btn btn-warning btn-sm" onclick="editMember(${m.id})"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm" onclick="deleteMember(${m.id})"><i class="fas fa-trash"></i></button></td></tr>`;
    }).join('');
}

function openMemberModal(id) {
    const modal = document.getElementById('member-modal');
    const form = document.getElementById('member-form');
    form.reset();
    if (id) {
        const m = members.find(x => x.id === id);
        document.getElementById('member-modal-title').textContent = 'Sửa thành viên';
        document.getElementById('member-id').value = m.id;
        document.getElementById('member-name').value = m.name;
        document.getElementById('member-email').value = m.email;
        document.getElementById('member-phone').value = m.phone;
    } else {
        document.getElementById('member-modal-title').textContent = 'Thêm thành viên';
    }
    modal.style.display = 'block';
    form.onsubmit = function(e) { e.preventDefault(); saveMember(); };
    modal.querySelector('.close').onclick = function() { modal.style.display = 'none'; };
    modal.querySelector('.cancel-btn').onclick = function() { modal.style.display = 'none'; };
}

function saveMember() {
    const id = document.getElementById('member-id').value;
    const data = {
        name: document.getElementById('member-name').value,
        email: document.getElementById('member-email').value,
        phone: document.getElementById('member-phone').value
    };
    if (id) {
        Object.assign(members.find(m => m.id === parseInt(id)), data);
    } else {
        members.push({ id: members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1, joinDate: new Date().toISOString(), ...data });
    }
    document.getElementById('member-modal').style.display = 'none';
    renderMembers();
}

function editMember(id) { openMemberModal(id); }
function deleteMember(id) { if (confirm('Xóa?')) { members = members.filter(m => m.id !== id); renderMembers(); }}

// BORROWING
function updateBorrowFormSelects() {
    const ms = document.getElementById('borrow-member');
    const bs = document.getElementById('borrow-book');
    if (!ms || !bs) return;
    ms.innerHTML = '<option value="">Chọn thành viên</option>' + members.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
    const avail = books.filter(b => {
        const borrowed = borrowings.filter(x => x.bookId === b.id && x.status === 'borrowed').length;
        return borrowed < b.quantity;
    });
    bs.innerHTML = '<option value="">Chọn sách</option>' + avail.map(b => `<option value="${b.id}">${b.title}</option>`).join('');
}

function borrowBook() {
    const mid = parseInt(document.getElementById('borrow-member').value);
    const bid = parseInt(document.getElementById('borrow-book').value);
    const ret = document.getElementById('return-date').value;
    const nb = { id: borrowings.length > 0 ? Math.max(...borrowings.map(b => b.id)) + 1 : 1, memberId: mid, bookId: bid, borrowDate: new Date().toISOString(), expectedReturnDate: ret, status: 'borrowed' };
    borrowings.push(nb);
    history.push({ id: history.length + 1, memberId: mid, bookId: bid, date: new Date().toISOString(), action: 'borrow' });
    document.getElementById('borrow-form').reset();
    renderBorrowings();
    updateDashboard();
    updateBorrowFormSelects();
}

function renderBorrowings() {
    const tbody = document.getElementById('borrowings-table-body');
    const active = borrowings.filter(b => b.status === 'borrowed');
    if (active.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #999;">Không có sách đang mượn</td></tr>';
        return;
    }
    tbody.innerHTML = active.map(b => {
        const m = members.find(x => x.id === b.memberId);
        const bk = books.find(x => x.id === b.bookId);
        const over = new Date(b.expectedReturnDate) < new Date();
        return `<tr><td>#${b.id}</td><td>${m?.name || 'N/A'}</td><td>${bk?.title || 'N/A'}</td><td>${formatDate(b.borrowDate)}</td><td>${formatDate(b.expectedReturnDate)}</td><td><span class="status-badge status-${over ? 'overdue' : 'borrowed'}">${over ? 'Quá hạn' : 'Đang mượn'}</span></td><td><button class="btn btn-success btn-sm" onclick="returnBook(${b.id})"><i class="fas fa-undo"></i> Trả</button></td></tr>`;
    }).join('');
}

function returnBook(id) {
    const b = borrowings.find(x => x.id === id);
    if (b) {
        b.status = 'returned';
        b.returnDate = new Date().toISOString();
        history.push({ id: history.length + 1, memberId: b.memberId, bookId: b.bookId, date: new Date().toISOString(), action: 'return' });
        renderBorrowings();
        renderHistory();
        updateDashboard();
    }
}

// HISTORY
function renderHistory() {
    const tbody = document.getElementById('history-table-body');
    const ret = borrowings.filter(b => b.status === 'returned');
    if (ret.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #999;">Chưa có lịch sử</td></tr>';
        return;
    }
    tbody.innerHTML = ret.reverse().map(b => {
        const m = members.find(x => x.id === b.memberId);
        const bk = books.find(x => x.id === b.bookId);
        return `<tr><td>#${b.id}</td><td>${m?.name || 'N/A'}</td><td>${bk?.title || 'N/A'}</td><td>${formatDate(b.borrowDate)}</td><td>${formatDate(b.returnDate)}</td><td><span class="status-badge status-returned">Đã trả</span></td></tr>`;
    }).join('');
}

// USER CATALOG
function renderBooksCatalog() {
    const cat = document.getElementById('books-catalog');
    if (books.length === 0) {
        cat.innerHTML = '<p style="text-align: center; color: #999;">Chưa có sách</p>';
        return;
    }
    cat.innerHTML = books.map(b => {
        const borrowed = borrowings.filter(x => x.bookId === b.id && x.status === 'borrowed').length;
        const avail = b.quantity - borrowed;
        return `<div class="book-card"><div class="book-cover"><i class="fas fa-book"></i></div><div class="book-info"><h3>${b.title}</h3><p><i class="fas fa-user"></i> ${b.author}</p><span class="book-category">${b.category}</span><p class="book-availability ${avail > 0 ? 'available' : 'unavailable'}">${avail > 0 ? `Còn ${avail}` : 'Hết'}</p></div><div class="book-actions">${avail > 0 ? `<button class="btn btn-primary btn-sm" onclick="borrowBookAsUser(${b.id})" style="flex: 1;"><i class="fas fa-hand-holding"></i> Mượn</button>` : `<button class="btn btn-secondary btn-sm" disabled style="flex: 1;">Hết</button>`}</div></div>`;
    }).join('');
}

function borrowBookAsUser(bid) {
    const has = borrowings.some(b => b.memberId === currentUser.id && b.bookId === bid && b.status === 'borrowed');
    if (has) { alert('Bạn đang mượn rồi!'); return; }
    const ret = new Date(); ret.setDate(ret.getDate() + 14);
    borrowings.push({ id: borrowings.length > 0 ? Math.max(...borrowings.map(b => b.id)) + 1 : 1, memberId: currentUser.id, bookId: bid, borrowDate: new Date().toISOString(), expectedReturnDate: ret.toISOString().split('T')[0], status: 'borrowed' });
    history.push({ id: history.length + 1, memberId: currentUser.id, bookId: bid, date: new Date().toISOString(), action: 'borrow' });
    renderBooksCatalog();
    renderMyBorrowings();
    alert('Mượn thành công!');
}

function renderMyBorrowings() {
    const tbody = document.getElementById('my-borrowings-table-body');
    const mine = borrowings.filter(b => b.memberId === currentUser.id && b.status === 'borrowed');
    if (mine.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #999;">Chưa mượn sách</td></tr>';
        return;
    }
    tbody.innerHTML = mine.map(b => {
        const bk = books.find(x => x.id === b.bookId);
        const over = new Date(b.expectedReturnDate) < new Date();
        return `<tr><td>${bk?.title || 'N/A'}</td><td>${bk?.author || 'N/A'}</td><td>${formatDate(b.borrowDate)}</td><td>${formatDate(b.expectedReturnDate)}</td><td><span class="status-badge status-${over ? 'overdue' : 'borrowed'}">${over ? 'Quá hạn' : 'Đang mượn'}</span></td><td><button class="btn btn-warning btn-sm" onclick="alert('Yêu cầu đã gửi!')"><i class="fas fa-bell"></i> Yêu cầu trả</button></td></tr>`;
    }).join('');
}

// UTILS
function formatDate(d) {
    return new Date(d).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

// SAMPLE DATA
function loadSampleData() {
    books = [
        { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Kỹ năng sống', isbn: '978-1234567890', quantity: 10 },
        { id: 2, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Lịch sử', isbn: '978-0987654321', quantity: 8 },
        { id: 3, title: 'Nhà giả kim', author: 'Paulo Coelho', category: 'Tiểu thuyết', isbn: '978-1111111111', quantity: 15 },
        { id: 4, title: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', category: 'Tâm lý học', isbn: '978-2222222222', quantity: 5 },
        { id: 5, title: 'Clean Code', author: 'Robert C. Martin', category: 'Lập trình', isbn: '978-3333333333', quantity: 12 }
    ];
    members = [
        { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0901234567', joinDate: '2024-01-15' },
        { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0907654321', joinDate: '2024-02-20' },
        { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', phone: '0912345678', joinDate: '2024-03-10' }
    ];
    borrowings = [
        { id: 1, memberId: 2, bookId: 1, borrowDate: '2024-12-20', expectedReturnDate: '2025-01-05', status: 'borrowed' },
        { id: 2, memberId: 2, bookId: 3, borrowDate: '2024-12-22', expectedReturnDate: '2025-01-10', status: 'borrowed' }
    ];
    history = [
        { id: 1, memberId: 2, bookId: 1, date: '2024-12-20', action: 'borrow' },
        { id: 2, memberId: 2, bookId: 3, date: '2024-12-22', action: 'borrow' }
    ];
}
