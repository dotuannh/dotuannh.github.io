# Library Management System - Member Portal Features

## Overview
The library management system now includes a complete member portal alongside the librarian dashboard. Members can manage their library activities independently.

## Member Portal Features

### 1. **View Profile (Member Dashboard)**
- Display member's personal information
  - Member Name
  - Member ID
  - Member Since date
  
- View account statistics at a glance
  - Total Books Borrowed
  - Books Reserved
  - Pending Notifications
  - Outstanding Fines
  
- View Active Loans
  - Book title and author
  - Borrow date
  - Due date
  - Days remaining (with color-coded status)
  - Renew button for each active loan

### 2. **Search Books**
- Search library catalog by:
  - Book title or author name
  - Category filtering (Fiction, Science, History, Technology)
  
- View available books in grid layout
  - Book cover display
  - Title and author information
  - Category information
  - Price display
  
- Quick actions for each book:
  - "Borrow" button for available books
  - "Reserve" button for future reservations
  - Status indicators for already borrowed/reserved books

### 3. **Borrow Book**
- Browse and select books to borrow
- Automatic loan creation with:
  - 30-day borrowing period
  - Automatic due date calculation
  - Book quantity management
  
- Success notifications
- System prevents duplicate borrowing

### 4. **Reserve Book**
- Reserve books that are currently unavailable
- Track reservation status (Pending/Ready)
- View reservation date
- Notification system alerts when books become available
- Cancel reservations when no longer needed

### 5. **Renew Loan**
- Extend borrowing period directly from dashboard
- Adds 14 days to current due date
- One-click renewal from current loans table
- Automatic notification on successful renewal

### 6. **View Loan History**
- Complete history of all past loans
- Shows:
  - Book titles and authors
  - Borrow and return dates
  - Days borrowed
  - Loan status
  
- Helps members track their reading history

### 7. **Pay Fine**
- Automatic fine calculation for overdue items
- Fine amount: 5,000 VND per day overdue
- Fine management page displays:
  - Total outstanding fines
  - Number of overdue items
  - Fine details table with:
    - Book title
    - Due date
    - Days late
    - Fine amount
    - Status
    - Pay button for each fine
  
- One-click payment functionality
- Automatic status update after payment

### 8. **View Notifications**
- Centralized notification system
- Notification types:
  - **Success** (Green): Books borrowed, fines paid
  - **Warning** (Orange): Books due soon
  - **Info** (Blue): Reserved books ready, system messages
  - **Error** (Red): System errors or issues
  
- Each notification shows:
  - Icon indicating notification type
  - Title and message
  - Timestamp
  
- Notifications are added automatically for:
  - Successful borrows
  - Reservations
  - Loan renewals
  - Fine payments
  - Due date reminders
  - Reserved books availability

## Login Credentials

### Member Demo Account
- **Username:** john
- **Password:** john123
- **Role:** Member

### Librarian Demo Account
- **Username:** admin
- **Password:** admin123
- **Role:** Librarian

## Navigation
- Use the sidebar to navigate between member pages
- The sidebar automatically shows member-specific navigation when logged in as a member
- Page title updates dynamically based on current page

## Data Management
- All member data is stored in browser's localStorage for this session
- Sample data includes:
  - 5 library books with details
  - 2 active loans
  - 1 reservation
  - 3 notifications

## UI Components Used
- **Cards:** Display statistics and book information
- **Tables:** Show loans, history, fines, and reservations
- **Badges:** Color-coded status indicators
- **Modals:** For confirmation dialogs
- **Icons:** Font Awesome icons for visual clarity
- **Grid Layout:** Book display in search page

## Features Not Yet Implemented (Future Enhancements)
- Profile editing/update
- Multiple member accounts management
- Advanced search filters
- Book recommendations
- Reading goals tracking
- Inter-library loans

## Technical Stack
- HTML5 with semantic markup
- CSS3 with CSS variables for theming
- Vanilla JavaScript (no frameworks)
- Chart.js for visualization (used in librarian section)
- Font Awesome 6.0.0 for icons
- localStorage API for session management

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for desktop viewing
- Mobile optimization planned for future versions
