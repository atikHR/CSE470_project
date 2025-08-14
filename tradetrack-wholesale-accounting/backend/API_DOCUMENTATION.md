# TradeTrack Backend API Documentation

## Base URL
http://localhost:5001

## Authentication
- Login credentials: 
  - Email: admin@tradetrack.com
  - Password: password123

## API Endpoints

### Authentication (`/auth`)
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile (requires auth token)
- `PUT /auth/profile` - Update user profile (requires auth token)

### System Info (`/sysinfo`)
- `POST /sysinfo/datetime` - Get system date and time

### Banks (`/bank`)
- `POST /bank/list` - Get all banks
- `POST /bank/add` - Add new bank
- `POST /bank/delete` - Delete bank
- `POST /bank/accountinfo` - Get bank account info
- `POST /bank/accountlist` - Get bank account list
- `POST /bank/account/add` - Add new bank account
- `POST /bank/transactions/list` - Get bank transactions
- `POST /bank/transactions/add` - Add bank transaction

### Suppliers (`/supplier`)
- `POST /supplier/categorylist` - Get product categories
- `POST /supplier/addcategory` - Add product category
- `POST /supplier/deletecategory` - Delete product category

### Statements (`/statement`)
- `POST /statement/list` - Get all statements
- `POST /statement/add` - Add new statement
- `POST /statement/filter` - Get filtered statements
- `POST /statement/transactions/list` - Get all transactions
- `POST /statement/transactions/add` - Add new transaction

## Sample Data
The database has been seeded with:
- 1 Admin user (admin@tradetrack.com / password123)
- 2 Sample banks (Demo Bank, Sample Credit Union)
- 2 Product categories (Electronics, Clothing)
- 1 Sample bank client (John Doe, Account: ACC001)

## Features Coverage

### ✅ Dashboard Features
- Login/logout API implemented
- Balance calculation endpoints available
- Date filtering supported

### ✅ Suppliers Features  
- Category management (add/edit/delete/search)
- Product category APIs working

### ✅ Statements Features
- Add individual transactions
- Central transactions table access
- Filtering capabilities
- Balance calculation

### ✅ Banks Features
- Add new banks
- Add accounts to banks
- Transaction management per account
- Bank account listing

### ✅ Admin Panel Features
- User management via auth APIs
- System information endpoints
