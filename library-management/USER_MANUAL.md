# Library Management System - User Manual

## Table of Contents
1. [Getting Started](#getting-started)
2. [Member Guide](#member-guide)
3. [Librarian Guide](#librarian-guide)
4. [FAQs](#faqs)
5. [Troubleshooting](#troubleshooting)

---

## Getting Started

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection (for external resources like icons)
- JavaScript enabled
- Cookie/Storage enabled (for session data)

### Accessing the System
1. Open the library management system in your browser
2. You'll see the login page with the library logo
3. Choose your role (Member or Librarian)
4. Enter credentials or click Demo button

### Demo Accounts
For testing purposes, use these demo accounts:

**Member Demo:**
- Click "Member Demo" button, OR
- Username: `john`
- Password: `john123`

**Librarian Demo:**
- Click "Librarian Demo" button, OR
- Username: `admin`
- Password: `admin123`

---

## Member Guide

### Dashboard Overview
When you first login, you'll see your member dashboard showing:
- **Member Profile:** Your name, ID, and membership date
- **4 Statistics Cards:** Books borrowed, reserved, notifications, and outstanding fines
- **Current Loans Table:** Books you're currently borrowing

### Feature 1: View Profile
Your profile appears at the top of the dashboard:
- Member name and ID
- Membership date
- Statistics update in real-time
- Edit profile button (for future profile updates)

### Feature 2: Search & Borrow Books

#### How to Search
1. Click **"Search Books"** in the sidebar menu
2. You'll see:
   - Search box (search by title or author)
   - Category filter dropdown
   - Grid display of all available books

#### How to Borrow
1. Find the book you want in the search results
2. Each book card shows:
   - Book cover (colored placeholder)
   - Title and author
   - Category and price
   - Action buttons
3. Click **"Borrow"** button
4. System creates a 30-day loan
5. You'll see a success confirmation
6. Book appears in your current loans

#### Search Tips
- Type partial titles: "Great" finds "The Great Gatsby"
- Search by author first name or last name
- Use category filter to narrow results
- Category options: Fiction, Science, History, Technology

### Feature 3: Reserve Books

#### When to Reserve
- Reserve books that are currently unavailable
- You'll be notified when the book becomes available
- Useful for popular books

#### How to Reserve
1. In the Search Books page
2. Find a book that shows status as "unavailable"
3. Click **"Reserve"** button
4. Book is added to your reservations
5. You'll receive a notification when it's available

### Feature 4: Manage Loans

#### Renewing a Loan
1. Go to **"My Profile"** (Dashboard)
2. Find the book in "Current Loans" table
3. Click **"Renew"** button
4. Due date extends by 14 days
5. You'll see a confirmation message

#### Monitoring Due Dates
- **Green badge:** More than 7 days left
- **Orange badge:** 3-7 days left (due soon)
- **Red badge:** 1-3 days left (urgent)

#### Multiple Loans
- You can have multiple books borrowed at once
- Each book can be renewed independently
- Maximum borrow period: usually 30 days per renewal

### Feature 5: View Loan History

#### Accessing History
1. Click **"Loan History"** in the sidebar
2. See table showing:
   - All past loans
   - Current active loans
   - Borrow and return dates
   - Total days borrowed

#### Using History
- Track your reading patterns
- See when books were returned
- Verify fine status for past loans

### Feature 6: Pay Fines

#### Understanding Fines
- Fines calculated: 5,000 VND per day overdue
- Fine starts the day AFTER due date
- Example: If due Feb 5, fine starts Feb 6

#### Paying Fines
1. Click **"My Fines"** in the sidebar
2. See:
   - Total outstanding fine amount
   - Number of overdue items
   - Detailed fine table with:
     - Book title
     - Original due date
     - Days overdue
     - Fine amount
3. Click **"Pay"** button for the fine you want to pay
4. Confirm payment amount
5. Fine is marked as paid

#### Fine Examples
```
Due Date: Feb 5, 2024
Return Date: Feb 10, 2024
Days Late: 5 days
Fine: 5,000 × 5 = 25,000 VND
```

### Feature 7: View Notifications

#### Notification Types
The system sends notifications for:

1. **Success (Green)** ✓
   - You borrowed a book
   - You paid a fine
   - Reservation confirmed

2. **Warning (Orange)** ⚠
   - Book is due soon
   - Only a few days left to return
   - Action needed

3. **Info (Blue)** ℹ
   - Reserved book is ready
   - System messages
   - General updates

4. **Error (Red)** ✕
   - System issues
   - Action failed
   - Error messages

#### Viewing Notifications
1. Click **"Notifications"** in sidebar
2. See all your notifications with:
   - Type icon (color-coded)
   - Title and message
   - Timestamp

#### Acting on Notifications
- Read notifications to stay informed
- Don't ignore warnings about overdue books
- Check info messages for important updates

### Feature 8: Reservations Management

#### Viewing Reservations
1. Click **"My Reservations"** in sidebar
2. See table with:
   - Book title and author
   - Reserved date
   - Status (Pending/Ready)

#### Canceling Reservations
1. Find the reservation you want to cancel
2. Click **"Cancel"** button
3. Reservation is removed
4. Book slot opens for others

#### Reservation Statuses
- **Pending:** Book is unavailable, waiting for your turn
- **Ready:** Book is available, ready to pick up or borrow

---

## Librarian Guide

### Librarian Dashboard
The main dashboard shows:
- System statistics (books, staff, orders, suppliers)
- Category distribution chart
- Quick access to all management areas

### Feature 1: Staff Management

#### Viewing Staff
1. Click **"Staff Management"** in sidebar
2. See table of all staff members with:
   - ID, Name, Email
   - Department, Position
   - Salary, Status

#### Adding Staff
1. Click **"Add Staff"** button
2. Fill in the form:
   - Name (required)
   - Email (required)
   - Phone number
   - Department (select from dropdown)
   - Position title
   - Salary amount
   - Status (Active/Inactive)
3. Click **"Save"**
4. Staff member added to system

#### Editing Staff
1. Click **"Edit"** button on staff row
2. Update information in the modal
3. Click **"Save"** to apply changes

#### Deleting Staff
1. Click **"Delete"** button on staff row
2. Staff member removed from system

### Feature 2: Books Management

#### Viewing Books
1. Click **"Books Management"** in sidebar
2. See table with:
   - Book ID, ISBN, Title, Author
   - Category, Price, Quantity
   - Status

#### Adding Books
1. Click **"Add Book"** button
2. Enter book details:
   - ISBN (unique identifier)
   - Title (required)
   - Author name
   - Category (Fiction, Science, History, Technology)
   - Price in VND
   - Initial quantity
   - Publication year
3. Click **"Save"**

#### Editing Books
1. Click **"Edit"** on book row
2. Update details (except ISBN)
3. Click **"Save"**

#### Deleting Books
1. Click **"Delete"** on book row
2. Book removed from catalog

#### Book Status
- **Available:** In stock and ready to borrow
- **Archived:** Out of print or removed

### Feature 3: Orders Management

#### Viewing Orders
1. Click **"Orders Management"** in sidebar
2. See table showing:
   - Order code, Supplier
   - Order date, Quantity
   - Total price, Status

#### Creating Orders
1. Click **"Add Order"** button
2. Fill in details:
   - Order code (unique identifier)
   - Select supplier
   - Order date
   - Quantity of books
   - Total price
   - Status (Pending/Shipped/Delivered)
3. Click **"Save"**

#### Updating Order Status
1. Find the order
2. Click **"Edit"**
3. Change status:
   - **Pending:** Order placed, awaiting shipment
   - **Shipped:** Order in transit
   - **Delivered:** Order received
4. Click **"Save"**

#### Order Tracking
- Monitor when orders are shipped
- Track delivery progress
- Manage supplier relationships

### Feature 4: Suppliers Management

#### Viewing Suppliers
1. Click **"Suppliers Management"** in sidebar
2. See table with:
   - Supplier ID, Name
   - Email, Phone, Address
   - Contact person, Status

#### Adding Suppliers
1. Click **"Add Supplier"** button
2. Enter details:
   - Supplier name (required)
   - Email address
   - Phone number
   - Address
   - Contact person name
   - Status (Active/Inactive)
3. Click **"Save"**

#### Managing Suppliers
1. Click **"Edit"** to update supplier info
2. Click **"Delete"** to remove supplier
3. Keep contact information current
4. Mark inactive suppliers as "Inactive"

### Feature 5: Reports & Analytics

#### Available Reports
1. Click **"Reports"** in sidebar
2. View analytics including:
   - Books by category distribution
   - Top performing categories
   - Order trends
   - Supplier performance

#### Using Reports
- Make data-driven decisions
- Identify popular book categories
- Monitor supplier performance
- Plan inventory

#### Chart Features
- Interactive chart display
- Category breakdown
- Visual trend analysis
- Legend for reference

### Feature 6: Audit Logs

#### Viewing Logs
1. Click **"Audit & Monitoring"** in sidebar
2. See table with:
   - Timestamp of action
   - Log level (Info/Warning/Error)
   - User who performed action
   - Action type
   - Description

#### Log Levels
- **Info:** Normal operations (green)
- **Warning:** Important but non-critical (orange)
- **Error:** System issues requiring attention (red)

#### Using Audit Logs
- Track all system activities
- Investigate issues
- Monitor user actions
- Ensure accountability
- Compliance documentation

### Feature 7: Settings & Configuration

#### System Settings
1. Click **"Settings"** in sidebar
2. Configure:
   - Library name
   - Library location/address
   - Operating hours
   - Default loan period (days)
   - Fine calculation rate
   - Maximum loan extensions
   - Other preferences

#### Important Settings
- **Loan Period:** Default 30 days
- **Fine Rate:** 5,000 VND per day
- **Extensions:** Usually 1-2 times per loan
- **Max Fine:** Consider setting a cap

### Feature 8: System Administration

#### Admin Responsibilities
- Monitor system health
- Ensure accurate data entry
- Regular backups
- User account management
- Policy enforcement
- Performance monitoring

#### Best Practices
- Change default passwords
- Regular data backups
- Monitor audit logs
- Review statistics weekly
- Plan inventory based on reports
- Maintain supplier relationships

---

## FAQs

### General Questions

**Q: How do I reset my password?**
A: Currently, contact the administrator. In a future version, there will be a "Forgot Password" feature.

**Q: Can I have multiple accounts?**
A: Each person should have one account. Members have one member account, staff have one librarian account.

**Q: How long is my session?**
A: Your session lasts until you logout or close the browser. On next login, you'll be in a new session.

### Member FAQs

**Q: Can I borrow books without returning previous ones?**
A: Yes, you can have multiple books borrowed at once.

**Q: How long can I keep a book?**
A: Standard borrow period is 30 days. You can renew for an additional 14 days (usually up to 2 times).

**Q: What if I lose a book?**
A: Contact the librarian immediately. There may be a replacement fee.

**Q: Can I reserve a book that's available?**
A: Reservations are for unavailable books. If available, borrow it directly.

**Q: How do I avoid fines?**
A: Return books by the due date. You can renew books before due date to extend the period.

**Q: What if I pay a fine late?**
A: Fine continues to accrue until payment. Pay as soon as possible to minimize fine amount.

**Q: Can I see my fine before due date?**
A: Fines only appear after the due date. Check due dates regularly to plan ahead.

**Q: How are fines calculated?**
A: 5,000 VND per day overdue, starting the day after due date.

### Librarian FAQs

**Q: How do I add a new book to inventory?**
A: Go to Books Management, click "Add Book", fill in details, and save.

**Q: Can I edit a book's ISBN?**
A: No, ISBN is unique and cannot be changed after creation. Delete and recreate if needed.

**Q: How do I track low stock?**
A: Check the quantity column in Books Management. Consider reordering when low.

**Q: What if a supplier goes out of business?**
A: Mark the supplier as "Inactive" in Suppliers Management.

**Q: How do I know when to reorder books?**
A: Monitor inventory and use Reports for insights. Plan based on circulation patterns.

**Q: Can I undo a deletion?**
A: No, deletions are permanent. Be careful when deleting important records.

**Q: How often should I review audit logs?**
A: Review weekly to monitor activities and catch issues early.

**Q: What do order statuses mean?**
- Pending: Waiting for shipment
- Shipped: In transit
- Delivered: Received and ready to catalog

---

## Troubleshooting

### Login Issues

**Problem: "Invalid username or password"**
- Check that credentials are spelled correctly
- Verify selected role (Member vs Librarian) is correct
- Try demo accounts to test system
- Check Caps Lock is off

**Problem: Can't see demo buttons**
- Scroll down on login page
- Demo section is below login form
- Try refreshing the page

### Member Issues

**Problem: Can't find a book in search**
- Try searching with partial title
- Search by author name
- Check category filter is correct
- Try clearing filters

**Problem: Book won't borrow**
- Check if already borrowed (view in Current Loans)
- Book might actually be unavailable
- Try reserving instead

**Problem: Renewal button missing**
- Book must be currently borrowed
- Check it's in "Current Loans" table
- Try navigating to Dashboard first

**Problem: Fine shows but book not overdue**
- Check current date vs due date
- Fine calculations start day after due date
- Review loan history for clarity

**Problem: Notification disappeared**
- Notifications scroll off if many exist
- You can create more by performing actions
- Check Notifications page regularly

### Librarian Issues

**Problem: Can't add staff/book/order**
- Check all required fields are filled
- Look for duplicate entries (ISBN, etc.)
- Try refreshing and trying again
- Check browser console for errors

**Problem: Edit modal won't save**
- Check for validation errors
- Make sure you changed a field
- Try refreshing and re-editing

**Problem: Chart not showing**
- Check if books exist in database
- Chart requires category data
- Try adding sample books if none exist

**Problem: Audit log not updating**
- Logs update automatically on actions
- Try performing an action to generate log
- Refresh the page to see latest logs

### Data/Display Issues

**Problem: Data disappeared after refresh**
- Browser storage was cleared
- Try using the same browser/computer
- Check if cookies are enabled
- Try disabling ad blockers

**Problem: Page looks wrong/broken**
- Clear browser cache
- Try different browser
- Check CSS is loading (no 404 errors)
- Update browser to latest version

**Problem: Buttons not working**
- Check JavaScript is enabled
- Try clearing cache and refreshing
- Try different browser
- Check browser console for errors

**Problem: Numbers showing incorrectly**
- Check for date format (YYYY-MM-DD)
- Verify numbers don't have special characters
- Ensure correct currency format

### General Troubleshooting Steps

1. **Clear Browser Cache**
   - Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Clear all cached data
   - Refresh page

2. **Check Browser Console**
   - Press F12 or Ctrl+Shift+I
   - Look for red error messages
   - Check Network tab for failed requests

3. **Try Different Browser**
   - If issue persists in different browser, it's not browser-specific
   - Chrome, Firefox recommended

4. **Restart Browser**
   - Close all windows
   - Reopen browser
   - Login again

5. **Contact Support**
   - Document the issue with screenshots
   - Note exact steps to reproduce
   - Provide browser and OS information

### Browser Requirements Checklist
- [ ] Using modern browser (Chrome, Firefox, Safari, Edge)
- [ ] Browser is up to date
- [ ] JavaScript is enabled
- [ ] Cookies/Storage is enabled
- [ ] Pop-ups are allowed (if using modals)
- [ ] Page loading completely before clicking

---

## Tips for Better Experience

### Member Tips
1. **Check notifications regularly** - Stay informed about due dates
2. **Renew early** - Renew before due date to extend time
3. **Keep track of due dates** - Calendar reminders help
4. **Search efficiently** - Use specific titles for better results
5. **Read email notifications** - System sends important updates

### Librarian Tips
1. **Update orders regularly** - Keep supplier statuses current
2. **Monitor inventory** - Check quantities weekly
3. **Review audit logs** - Look for anomalies
4. **Backup data** - Regularly export/backup important records
5. **Plan ahead** - Use reports for strategic decisions

---

## Getting Help

### Support Options
- Check FAQs section above
- Review troubleshooting guide
- Contact your library administrator
- Check system documentation files

### Documentation Available
- QUICK_START.md - Getting started guide
- MEMBER_FEATURES.md - Detailed member features
- DEVELOPER_GUIDE.md - For technical staff
- IMPLEMENTATION_SUMMARY.md - System overview

---

**User Manual Version:** 1.0  
**Last Updated:** 2024  
**For Questions:** Contact your Library Administrator
