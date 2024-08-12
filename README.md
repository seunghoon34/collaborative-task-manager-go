# Todo App

A full-stack todo application with a Go backend and React frontend.

## Project Overview

This project is a simple todo list application that allows users to create, read, update, and delete todo items. It features user authentication and uses a SQLite database for data storage.

### Tech Stack

- Backend: Go with Gin framework
- Frontend: React
- Database: SQLite
- Authentication: JWT (JSON Web Tokens)

## Usage

1. Sign up for a new account or sign in with existing credentials.
2. Once authenticated, you can:
- Add new todos
- Mark todos as complete/incomplete
- Delete todos

## API Endpoints

- POST `/signup`: Create a new user account
- POST `/signin`: Authenticate and receive a JWT
- GET `/todos`: Retrieve all todos for the authenticated user
- POST `/todos`: Create a new todo
- PUT `/todos/:id`: Update an existing todo
- DELETE `/todos/:id`: Delete a todo

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.