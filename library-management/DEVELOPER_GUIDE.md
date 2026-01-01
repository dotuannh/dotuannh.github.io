# Library Management System - Developer Guide

## Overview
This document provides guidance for developers who need to maintain, extend, or modify the Library Management System.

## Project Structure

### Core Files
```
library-management/
├── index.html          # UI markup and structure
├── style.css           # Styling and layout
├── script.js           # Application logic
└── Documentation files
    ├── MEMBER_FEATURES.md
    ├── QUICK_START.md
    ├── IMPLEMENTATION_SUMMARY.md
    ├── VERIFICATION_CHECKLIST.md
    └── DEVELOPER_GUIDE.md (this file)
```

## Code Organization

### HTML Structure (index.html)
```
1. Login Page (lines 1-50)
2. Main Application Container
   - Header (user info, logout)
   - Sidebar (navigation)
   - Content Area (pages)
3. Librarian Pages (8 pages)
4. Member Pages (6 pages)
5. Modals (CRUD dialogs)
```

### CSS Organization (style.css)
```
1. Root Variables (colors, fonts)
2. Base Styles (body, general)
3. Login Styling
4. Layout (sidebar, header, main)
5. Navigation
6. Tables and Data Display
7. Cards and Sections
8. Badges and Status
9. Forms and Inputs
10. Modals
11. Charts and Graphs
12. Member-Specific Styles
13. Responsive Design
```

### JavaScript Organization (script.js)
```
1. Data Storage (arrays and objects)
2. Initialization (DOMContentLoaded)
3. Login Functions
4. Navigation Functions
5. Librarian Dashboard Functions
6. Librarian CRUD Functions (Staff, Books, Orders, Suppliers)
7. Librarian Report Functions
8. Librarian Audit Functions
9. Member Dashboard Functions
10. Member Search and Borrow Functions
11. Member Reservation Functions
12. Member History Functions
13. Member Fine Functions
14. Member Notification Functions
15. Utility Functions
16. Modal Management
```

## Key Data Structures

### Staff Member Object
```javascript
{
    id: number,
    name: string,
    email: string,
    phone: string,
    department: string,
    position: string,
    salary: number,
    status: 'active' | 'inactive'
}
```

### Book Object
```javascript
{
    id: number,
    isbn: string,
    title: string,
    author: string,
    category: 'fiction' | 'science' | 'history' | 'technology',
    price: number,
    quantity: number,
    status: 'available' | 'archived',
    year: number
}
```

### Order Object
```javascript
{
    id: number,
    orderCode: string,
    supplier: string,
    date: string (YYYY-MM-DD),
    quantity: number,
    totalPrice: number,
    status: 'pending' | 'shipped' | 'delivered'
}
```

### Supplier Object
```javascript
{
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    contact: string,
    status: 'active' | 'inactive'
}
```

### Member Object
```javascript
{
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    memberSince: string (YYYY-MM-DD),
    totalFines: number
}
```

### Loan Object
```javascript
{
    id: number,
    bookId: number,
    bookTitle: string,
    author: string,
    borrowDate: string (YYYY-MM-DD),
    dueDate: string (YYYY-MM-DD),
    returnDate: string | null,
    status: 'active' | 'returned'
}
```

### Notification Object
```javascript
{
    id: number,
    type: 'success' | 'warning' | 'error' | 'info',
    title: string,
    message: string,
    time: string
}
```

### Current User Object
```javascript
{
    username: string,
    role: 'member' | 'librarian',
    name: string,
    id: number | string
}
```

## Common Development Tasks

### Adding a New Librarian Feature

1. **Create the data structure** in script.js:
```javascript
let newFeatureData = [
    // Sample entries
];
```

2. **Create the HTML page** in index.html:
```html
<div id="new-feature-page" class="page" style="display: none;">
    <div class="page-header">
        <h2>New Feature Title</h2>
    </div>
    <!-- Content here -->
</div>
```

3. **Create CSS styling** in style.css:
```css
#new-feature-page {
    /* Styling here */
}
```

4. **Create the page loader function** in script.js:
```javascript
function loadNewFeaturePage() {
    renderNewFeatureTable(newFeatureData);
    // Additional setup
}
```

5. **Add navigation item** in index.html:
```html
<li class="nav-item" data-page="new-feature">
    <i class="fas fa-icon"></i>
    <span>New Feature</span>
</li>
```

6. **Update the showPage() function** to include new page case.

### Adding a New Member Feature

Follow similar steps but:
- Use `member-` prefix for page ID
- Add to member navigation menu
- Create member-specific functions with `member` prefix
- Update member-focused page titles in showPage()

### Adding CRUD Operations

1. **Add Form Modal** in index.html
2. **Create Render Function** (displays data in table)
3. **Create Open Modal Function** (opens form for new entry)
4. **Create Save Function** (adds/updates data)
5. **Create Delete Function** (removes data)
6. **Create Edit Function** (populates form with existing data)

Example pattern:
```javascript
function renderTable(data) {
    const tbody = document.getElementById('table-id');
    tbody.innerHTML = '';
    data.forEach(item => {
        // Create row with edit/delete buttons
    });
}

function openModal() {
    // Clear form
    // Show modal
}

function saveItem() {
    // Get form values
    // Create or update object
    // Add to array
    // Close modal
    // Re-render table
}

function deleteItem(id) {
    // Remove from array
    // Re-render table
}

function editItem(id) {
    // Find item in array
    // Populate form
    // Show modal
}
```

## Styling Guidelines

### Color Variables
```css
:root {
    --primary-color: #667eea;      /* Main accent */
    --secondary-color: #764ba2;    /* Secondary accent */
    --success-color: #43e97b;      /* Success/positive */
    --warning-color: #ffa726;      /* Warning/caution */
    --danger-color: #f5576c;       /* Error/danger */
    --info-color: #4facfe;         /* Information */
    --light-color: #f5f7fa;        /* Light background */
    --dark-color: #2c3e50;         /* Dark text */
}
```

### Naming Conventions
- Classes: use kebab-case (`.book-card`)
- IDs: use kebab-case (`#member-dashboard`)
- Avoid single-letter classes

### Component Structure
```css
.component {
    /* Layout */
}

.component-element {
    /* Element styling */
}

.component.variant {
    /* Variations */
}

.component:hover {
    /* Interactive states */
}
```

## JavaScript Best Practices

### Function Naming
- Page loaders: `load[PageName]Page()`
- Render functions: `render[ComponentName]()`
- CRUD create: `add[ItemName]()` or `save[ItemName]()`
- CRUD read: `load[ItemName]Page()` or `render[ItemName]()`
- CRUD update: `edit[ItemName]()`
- CRUD delete: `delete[ItemName]()`

### Event Handlers
```javascript
// Attach inline in HTML
onclick="functionName(id)"

// Or in JavaScript
element.addEventListener('click', functionName);
```

### DOM Manipulation
```javascript
// Create elements
const element = document.createElement('div');

// Query elements
const element = document.getElementById('id');
const elements = document.querySelectorAll('.class');

// Update content
element.innerHTML = `<p>Content</p>`;
element.textContent = 'Text only';

// Update attributes
element.setAttribute('attr', 'value');
element.classList.add('class');
```

### Array Operations
```javascript
// Find
const item = array.find(item => item.id === id);

// Filter
const filtered = array.filter(item => item.status === 'active');

// Map
const names = array.map(item => item.name);

// Add
array.push(newItem);

// Remove
const index = array.findIndex(item => item.id === id);
array.splice(index, 1);

// Update
const item = array.find(item => item.id === id);
item.property = newValue;
```

## Debugging Tips

### Console Logging
```javascript
console.log('Variable:', variable);
console.table(arrayOfObjects);
console.error('Error occurred:', error);
```

### Common Issues

1. **Element not found**
   - Check element ID in HTML matches JavaScript
   - Ensure element is created before JavaScript runs

2. **Data not updating**
   - Verify array is being modified
   - Check re-render function is called
   - Look at browser console for errors

3. **Page not navigating**
   - Check page ID matches in HTML and JavaScript
   - Verify showPage() function is called
   - Check CSS display property

4. **Styles not applying**
   - Check class/ID names match exactly
   - Look for CSS specificity issues
   - Check browser dev tools for applied styles

## Testing Checklist

### Before Deployment
- [ ] All forms validate input correctly
- [ ] CRUD operations work for all entities
- [ ] Navigation between pages works smoothly
- [ ] Data persists on page refresh (localStorage)
- [ ] Delete operations ask for confirmation
- [ ] Error messages are helpful
- [ ] Responsive design works
- [ ] No console errors
- [ ] All links work correctly
- [ ] Modal open/close works
- [ ] Sample data loads correctly

### Member Portal Testing
- [ ] Can login as member
- [ ] Dashboard shows correct stats
- [ ] Book search works with filters
- [ ] Can borrow and reserve books
- [ ] Notifications appear
- [ ] Can renew loans
- [ ] Fine calculation is correct
- [ ] Payment works
- [ ] History is tracked

### Librarian Portal Testing
- [ ] Can login as librarian
- [ ] Dashboard shows stats
- [ ] Can add/edit/delete staff
- [ ] Can add/edit/delete books
- [ ] Can manage orders
- [ ] Can manage suppliers
- [ ] Reports display correctly
- [ ] Audit logs track activity
- [ ] Settings can be updated

## Performance Optimization

### Current Optimizations
- Minimal external dependencies
- Vanilla JavaScript (no framework overhead)
- Efficient DOM queries
- localStorage for fast session loading

### Potential Improvements
1. Lazy load modals
2. Paginate large tables
3. Cache DOM queries
4. Debounce search inputs
5. Compress images/icons
6. Minimize CSS/JS files

## Version Control Recommendations

### Branch Structure
```
main (production)
├── develop (development)
├── feature/new-feature
├── bugfix/issue-name
└── hotfix/critical-issue
```

### Commit Messages
```
feat: Add new feature description
fix: Fix specific bug
docs: Update documentation
style: CSS or formatting changes
refactor: Code restructuring
test: Add/update tests
```

## Security Considerations

### Current Implementation
- Client-side only (no backend security)
- localStorage for data (browser security)
- Basic credential validation

### For Production
1. Implement backend authentication
2. Use secure password hashing
3. Add HTTPS
4. Implement CSRF protection
5. Add input sanitization
6. Add rate limiting
7. Implement proper authorization
8. Add audit logging to database

## Migration Guide

### Adding Backend API
1. Create API endpoints for each data type
2. Replace localStorage reads/writes with API calls
3. Update functions to handle async operations
4. Add error handling for network issues
5. Implement proper authentication tokens

### Database Schema Example
```
Users Table
- id (PK)
- username (UNIQUE)
- password (hashed)
- role
- created_at

Books Table
- id (PK)
- isbn (UNIQUE)
- title
- author
- category
- price
- quantity
- created_at

Loans Table
- id (PK)
- member_id (FK)
- book_id (FK)
- borrow_date
- due_date
- return_date
- created_at
```

## Support & Documentation

### Internal Documentation
- Code comments for complex logic
- Function descriptions
- Data structure documentation

### External Documentation
- User guide (QUICK_START.md)
- Feature documentation (MEMBER_FEATURES.md)
- Implementation summary (IMPLEMENTATION_SUMMARY.md)

## Maintenance Schedule

### Daily
- Monitor error logs
- Check user feedback
- Verify system uptime

### Weekly
- Review activity logs
- Check for performance issues
- Update documentation if needed

### Monthly
- Analyze usage statistics
- Plan feature releases
- Review security

### Quarterly
- Major feature development
- Security audit
- Performance optimization
- User feedback analysis

## Contact & Support
For questions or issues, refer to the project documentation or contact the development team.

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Author:** Development Team
