# Food Delivery Website

## Overview
This is a comprehensive food delivery website that allows users to browse a variety of food items, filter them based on preferences, add products to their cart, and place orders. The backend system ensures secure access through sessions and cookies, requiring users to authenticate before accessing features like adding to the cart or placing orders.

## Features
### **Authentication and Authorization**
- User registration and login functionality.
- Only authenticated users can:
  - Add items to the cart.
  - Place orders.
  - View their order history.
- Session and cookie-based authentication for secure user management.

### **Product Management**
- Browse a wide variety of food items.
- Filter products by:
  - Category (e.g., vegetarian, non-vegetarian, vegan).
  - Price range.
  - Cuisine type (e.g., Indian, Chinese, Italian).

### **Cart and Order Management**
- Add products to the cart.
- Modify the cart (update quantities or remove items).
- Place orders securely.

### **Responsive Design**
- Fully responsive UI for seamless experience on desktop, tablet, and mobile devices.

## Technologies Used
### **Frontend**
- HTML, CSS, JavaScript
- Framework: React (optional)

### **Backend**
- Node.js with Express.js
- Session and cookies for user authentication and session persistence

### **Database**
- MongoDB for storing user, product, and order data.

### **Other Tools**
- Postman for API testing
- Git for version control

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/food-delivery-website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd food-delivery-website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=3000
     MONGO_URI=your-mongodb-connection-string
     SESSION_SECRET=your-session-secret
     ```
5. Start the development server:
   ```bash
   npm start
   ```
6. Access the application at `http://localhost:3000`.

## API Endpoints
### **Authentication**
- `POST /api/register`: Register a new user.
- `POST /api/login`: Authenticate and log in a user.
- `POST /api/logout`: Log out a user.

### **Products**
- `GET /api/products`: Retrieve all products.
- `GET /api/products?filter=category`: Retrieve products by category.

### **Cart**
- `GET /api/cart`: Retrieve items in the user's cart.
- `POST /api/cart`: Add an item to the cart.
- `PATCH /api/cart/:id`: Update the quantity of an item in the cart.
- `DELETE /api/cart/:id`: Remove an item from the cart.

### **Orders**
- `POST /api/orders`: Place a new order.
- `GET /api/orders`: Retrieve the user's order history.

## Security Measures
- User passwords are hashed before storage.
- Cookies are securely signed and transmitted over HTTPS.
- Session data is stored server-side to prevent tampering.

## Future Enhancements
- Add a payment gateway for online transactions.
- Implement real-time order tracking.
- Introduce recommendations based on user preferences and order history.
- Admin dashboard for managing products and orders.

## Contributing
We welcome contributions! Please fork the repository, create a new branch, and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---
Developed with ❤️ by the Food Delivery Team.

