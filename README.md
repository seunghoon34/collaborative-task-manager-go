# Collaborative task management App

A full-stack task management application with team collaboration features, built with a Go backend and React frontend.

## Project Overview

This project is a task management application that allows users to create, read, update, and delete tasks. It features user authentication and uses a SQLite database for data storage.

## Features

- User authentication (signup, signin, logout)
- Create, read, update, and delete tasks
- Team creation and management
- Join teams using unique codes
- Assign tasks to personal list or team
- Set priorities and deadlines for tasks
- Filter and sort tasks
- Responsive design for both desktop and mobile use

## Usage

1. Sign up for a new account or sign in with existing credentials.
2. Create a new team or join an existing team using a join code.
3. Add new tasks, specifying title, deadline, priority, and whether it's a personal or team todo.
4. View, edit, and delete tasks as needed.
5. Use filters and sorting options to organize your todo list.


## API Endpoints

- POST `/signup`: Create a new user account
- POST `/signin`: Authenticate and receive a JWT
- POST `/logout`: Log out (client-side token removal)
- GET `/todos`: Retrieve todos (with filtering and sorting)
- POST `/todos`: Create a new task
- PUT `/todos/:id`: Update an existing todo
- DELETE `/todos/:id`: Delete a task
- POST `/teams`: Create a new team
- GET `/teams`: List user's teams
- POST `/teams/join/:joinCode`: Join a team

