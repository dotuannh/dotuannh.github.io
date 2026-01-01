# Library Management System - Quick Start Guide

## How to Access the System

1. **Open the application:**
   - Navigate to `library-management/index.html` in your browser

2. **Login Options:**
   
   ### For Members:
   - Click "Member Demo" button, OR
   - Login with credentials:
     - Username: `john`
     - Password: `john123`
     - Role: `Member`
   
   ### For Librarians:
   - Click "Librarian Demo" button, OR
   - Login with credentials:
     - Username: `admin`
     - Password: `admin123`
     - Role: `Librarian`

## Member Portal Walkthrough

### Step 1: View Your Profile & Dashboard
After logging in as a member:
1. You'll see the member dashboard with your profile information
2. View 4 key statistics:
   - Books Borrowed: 2
   - Books Reserved: 1
   - Notifications: 3
   - Outstanding Fine: 0 VND (initially)
3. See your current active loans table with:
   - Book titles and authors
   - Borrow/Due dates
   - Days remaining
   - Renew button for each book

### Step 2: Search & Borrow Books
1. Click "Search Books" in the member menu
2. Search by:
   - Title (e.g., "Great", "Programming")
   - Author name
   - Category filter (Fiction, Science, History, Technology)
3. Click "Borrow" on any available book
4. System will:
   - Create a 30-day loan
   - Add to your current loans
   - Show success notification
   - Reduce book quantity

### Step 3: Reserve a Book
1. In "Search Books" page
2. Click "Reserve" on any book
3. Book will be added to your reservations
4. You'll receive a notification when it becomes available

### Step 4: Manage Your Loans
1. From Member Dashboard:
   - Click "Renew" button on any loan to extend by 14 days
2. View "My Reservations" to:
   - See all your reservations
   - Cancel a reservation if needed

### Step 5: View Loan History
1. Click "Loan History" in member menu
2. See all past and current loans with:
   - Book titles
   - Borrow/Return dates
   - Days borrowed
   - Status

### Step 6: Manage Fines
1. Click "My Fines" in member menu
2. View:
   - Total outstanding fine amount
   - Number of overdue items
   - Details of each fine
     - Fine is 5,000 VND per day overdue
3. Click "Pay" to pay individual fines
4. Fines automatically appear for overdue books

### Step 7: Check Notifications
1. Click "Notifications" in member menu
2. See all notifications with color coding:
   - **Green (Success):** Books borrowed, payments completed
   - **Orange (Warning):** Books due soon
   - **Blue (Info):** Books ready, system updates
   - **Red (Error):** System issues
3. Each notification shows timestamp

## Librarian Portal Features (Existing)

The librarian can:
- **Dashboard:** View system statistics and charts
- **Staff Management:** Add/Edit/Delete library staff
- **Books Management:** Add/Edit/Delete books in catalog
- **Orders Management:** Manage book orders from suppliers
- **Suppliers Management:** Manage supplier information
- **Reports:** View statistical reports and charts
- **Audit Logs:** Monitor all system activities
- **Settings:** Configure system parameters

## Sample Data Included

### Books Available:
1. The Great Gatsby - F. Scott Fitzgerald (Fiction)
2. The Alchemist - Paulo Coelho (Fiction)
3. C Programming Language - Brian W. Kernighan (Technology)
4. 1984 - George Orwell (Fiction)
5. Sapiens - Yuval Noah Harari (Science)

### Your Current Loans (as John Doe):
1. The Great Gatsby - Due: Feb 5, 2024
2. The Alchemist - Due: Feb 10, 2024

### Your Reservation:
1. C Programming Language (Pending)

### Your Notifications:
- 3 notifications about book activities

## Tips

1. **Fine Calculation:** Fine starts accumulating the day after due date at 5,000 VND/day
2. **Renewal:** Each book can be renewed (extends due date by 14 days)
3. **Reservations:** You can have multiple reservations at once
4. **Search:** Use partial text matching to find books quickly
5. **Notifications:** Check notifications regularly for important updates

## Keyboard Shortcuts (When Needed)
- Tab: Navigate between form fields
- Enter: Submit forms or click buttons
- Escape: Close modals (when available)

## Common Tasks

### To Borrow a Book:
1. Go to "Search Books"
2. Find the book
3. Click "Borrow"
4. Confirm in the popup

### To Renew a Loan:
1. Stay on Member Dashboard
2. Find the book in "Current Loans"
3. Click "Renew"
4. Done! Due date extended by 14 days

### To Pay a Fine:
1. Go to "My Fines"
2. Find the fine for the overdue book
3. Click "Pay"
4. Confirm the payment amount
5. Fine is marked as paid

### To Cancel a Reservation:
1. Go to "My Reservations"
2. Click "Cancel" button
3. Reservation is removed

## Troubleshooting

**Problem:** Can't login
**Solution:** Make sure you selected the correct role (Member or Librarian) and check credentials

**Problem:** Book won't borrow
**Solution:** You might already have it borrowed. Check "Current Loans" or "Search" to verify

**Problem:** Fine won't disappear after payment
**Solution:** Fine only appears if book is actually overdue. Check the due date

**Problem:** Data disappeared after refresh
**Solution:** The system uses browser storage. Clearing browser data will reset everything

## Browser Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- localStorage enabled

Enjoy using the Library Management System!
