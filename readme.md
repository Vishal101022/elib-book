# API Documentation

## Overview

This is a simple book management API using Node.js. The API will provide various functionalities including user authentication, CRUD operations for managing book entries (such as title, author, publication year), and the ability to filter books by author or publication year.

## Base URL
`https://localhost:3000/api`

## Features

1. **User Authentication**
2. **CRUD Operations for Managing Book Entries**
3. **Filtering Books by Author or Publication Year**

## Technologies Used

- **Node.js:** Server-side JavaScript runtime for building the API.
- **Express.js:** Web application framework for Node.js to handle HTTP requests and routing.
- **MongoDB:** NoSQL database for storing book entries and user authentication data.
- **JSON Web Tokens (JWT):** Token-based authentication mechanism for securing API endpoints.
- **Mongoose:** MongoDB object modeling tool for Node.js to simplify interactions with the database.

## Authentication
API requires authentication using token. Include the token in the headers of our requests.
- `Authorization: Bearer token`

## Endpoints

### Authentication Endpoints

1. **POST /api/users/register**
   - register a new user

   **Parameters**
   ```json
   {
   "name": "John Doe",
   "email": "UWYmD@example.com",
   "password": "password123"
   }
   ```

   **expample request**
   ```bash
   post /api/users/register
   ```
   **example response**
   ```json
   {
   "accessToken": "<token>"
   }
   ```

1. **POST /api/users/login**
   - login a user

   **Parameters**
   ```json
   {
   "email": "name@example.com",
   "password": "password123"
   }
   ```

   **expample request**
   ```bash
   post /api/users/login
   Authorization: Bearer access token
   ```

   **example response**
   ```json
   {
   "accessToken": "<token>"
   }
   ```

### Book Endpoints

1. **POST /api/books**
      - create a new book

    **Parameters**
    ```json
   {
   "title": "The Great Gatsby",
   "publication_year": 1925,
   "genre": "Fiction",
   "description": "A classic novel about the power of love and the pursuit of wealth."
   }
   ```

   **expample request**
   ```bash
   post /api/books
   Authorization: Bearer access token
   ```

   **example response**
   ```json
   {
   "title": "The Great Gatsby",
   "publication_year": 1925,
   "genre": "Fiction",
   "description": "A classic novel about the power of love and the pursuit of wealth."
   }
   ```

1. **GET /api/books/allbook**
   - get all books

   **expample request**
   ```bash
   get /api/books/allbook
   ```

   **example response**
   ```json
   [
   {
   "_id": "662fd8bedef628e1177*****",
   "title": "The Catcher in the Rye",
   "author": "662f6cb65c68cc7dde7*****",
   "author_name": "vishal",
   "publication_year": 1951,
   "genre": "Fiction",
   "description": "The Catcher in the Rye is a novel by J.D. Salinger published in 1951. It follows the experiences of Holden Caulfield, a teenager who is expelled from his prep school and goes on a journey of self-discovery in New York City.",
   "createdAt": "2024-04-29T17:28:30.542Z",
   "updatedAt": "2024-04-29T17:28:30.542Z",
   "__v": 0
   },
   {
   "_id": "662fd8f8def628e1177*****",
   "title": "The Hobbit",
   "author": "662f6cb65c68cc7dde7*****",
   "author_name": "vishal",
   "publication_year": 1937,
   "genre": "Fantasy",
   "description": "The Hobbit, or There and Back Again, is a children's fantasy novel by J.R.R. Tolkien published in 1937. It follows the journey of Bilbo Baggins, a hobbit who embarks on an adventure to reclaim treasure guarded by the dragon Smaug.",
   "createdAt": "2024-04-29T17:29:28.047Z",
   "updatedAt": "2024-04-29T17:29:28.047Z",
   "__v": 0
   }
   ]
   ```

1. **GET /api/books/book/:id**
   - get specific book

   **expample request**
   ```bash
   get /api/books/book/662fd8bedef628e1177******
   ```

   **example response**
   ```json
   {
   "_id": "662fd8bedef628e1177*****",
   "title": "The Catcher in the Rye",
   "author": "662f6cb65c68cc7dde7*****",
   "author_name": "vishal",
   "publication_year": 1951,
   "genre": "Fiction",
   }
   ```

1. **PUT /api/books/:id**
   - update book

   **parameters**
   ```json
   {
   "title": "The Catcher in the Rye",
   "publication_year": 1951,
   "genre": "Fiction",
   "description": "A classic novel about the power of love and the pursuit of wealth."
   }
   ```

   **expample request**
   ```bash
   put /api/books/662fd8bedef628e1177******
   Authorization: Bearer access token
   ```

   **example response**
   ```json
   {
   "_id": "662fd8bedef628e1177******",
   "title": "The Catcher in the Rye",
   "author": "662f6cb65c68cc7dde7******",
   "author_name": "vishal",
   "publication_year": 1951,
   "genre": "Fiction",
   "description": "A classic novel about the power of love and the pursuit of wealth."
   }
   ```

1. **DELETE /api/books/:id**
   - delete book

   **expample request**
   ```bash
   delete /api/books/662fd8bedef628e1177******
   Authorization: Bearer access token
   ```

   **example response**
   ```json
   {
   "message": "Book deleted successfully"
   }
   ```

1. **GET /api/books/search/filter**
   - filter book by author or publication year

   **parameters**
   ```json
   {
   "author": "vishal",
   }
   ```

   **expample request**
   ```bash
   get /api/books/search/filter
   ```

   **example response**
   ```json
   [
   {
   "_id": "662fd8bedef628e1177*****",
   "title": "The Catcher in the Rye",
   "author": "662f6cb65c68cc7dde7*****",
   "author_name": "vishal",
   "publication_year": 1951,
   "genre": "Fiction",
   "description": "A classic novel about the power of love and the pursuit of wealth."
   }
   ]
   ```

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request.

- `200 OK`: The request was successful.
- `201 Created`: The resource was created successfully.
- `400 Bad Request`: The request was malformed or missing parameters.
- `401 Unauthorized`: Authentication credentials were missing or invalid.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An error occurred on the server.

## :hammer_and_wrench: how to run
### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/Vishal101022/elib-book.git
```

### Install packages

```shell
npm i
```

### Setup .env file

Create a .env file and add the following variables:

```bash
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.qbe02tw.mongodb.net/<database>
NODE_ENV=development
JWT_SECRET=<secret>
```

### Start the app

```shell
npm run dev
```