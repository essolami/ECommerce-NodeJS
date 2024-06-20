# eCommerce API

An eCommerce API built with Node.js, Express, and MongoDB. This API allows users to manage products, orders, and user accounts.

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Order management (CRUD operations)
- Secure password storage with bcrypt
- JWT token-based authentication

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- dotenv
- CORS

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running on your machine or a MongoDB Atlas account

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/yourusername/ecommerce-api.git
   cd ecommerce-api
   ```

2. Install the dependencies

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables

   ```plaintext
   PORT=3000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server

   ```sh
   npm start
   ```

   The server will start on `http://localhost:3000`

## API Endpoints

### Auth

- **POST /auth/register**: Register a new user
- **POST /auth/login**: Login a user and get a JWT token

### Users

- **GET /users**: Get all users (admin only)
- **GET /users/:id**: Get a single user by ID (admin only)
- **PUT /users/:id**: Update a user by ID (admin only)
- **DELETE /users/:id**: Delete a user by ID (admin only)

### Products

- **GET /products**: Get all products
- **GET /products/:id**: Get a single product by ID
- **POST /products**: Create a new product (admin only)
- **PUT /products/:id**: Update a product by ID (admin only)
- **DELETE /products/:id**: Delete a product by ID (admin only)

### Orders

- **GET /orders**: Get all orders (admin only)
- **GET /orders/:id**: Get a single order by ID
- **POST /orders**: Create a new order
- **PUT /orders/:id**: Update an order by ID (admin only)
- **DELETE /orders/:id**: Delete an order by ID (admin only)

## Project Structure

```
ecommerce-api/
├── Controllers/
│   ├── authController.ts
│   ├── productController.ts
│   ├── orderController.ts
│   └── userController.ts
├── Models/
│   ├── productModel.ts
│   ├── orderModel.ts
│   └── userModel.ts
├── Routes/
│   ├── authRoutes.ts
│   ├── productRoutes.ts
│   ├── orderRoutes.ts
│   └── userRoutes.ts
├── Middleware/
│   ├── authMiddleware.ts
│   └── errorMiddleware.ts
├── index.ts
├── .env
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Email - [essolamih@gmail.com](mailto:essolamih@gmail.com)

GitHub: [https://github.com/essolami](https://github.com/essolami)
