# Real-Time Chat Application

A modern real-time chat application built using React with TypeScript on the frontend and Express with TypeScript on the backend. It uses Socket.IO for real-time communication.
Folder Structure

```
chat_app/
├── app/    # Frontend (React + TypeScript)
└── server/ # Backend (Express + TypeScript)
```

## Features

Real-time messaging using WebSockets
User connection and disconnection notifications
Typing indicator for real-time feedback
Welcome message for new users
Room-based chat functionality
Form validation using Zod and React Hook Form with Zod Resolver

### Tech Stack

#### Frontend

`React` `TypeScript` `Vite` `ShadCN UI` `tailwindcss v4`

#### Backend

`Express` `TypeScript` `Socket.IO`

#### State Management

`React Hooks` `React useForm`

#### Validation

`Zod` `Zod Resolver`

## Installation

### Clone the repository:

```
https://github.com/AvvaiAravind/chat_app.git
cd chat_app
```

Install dependencies for both frontend and backend:
bashCopy# Install frontend dependencies
cd app
npm install

## Install backend dependencies

```
cd ../server
npm install

# Start the backend server:
cd server
npm run serve

# Start the frontend:
cd ../app
npm run dev

```

The app will be available at https://chat-app-frontend-2ogv.onrender.com/

### Environment Variables
Create a .env file in the server directory with the following variables:
```
PORT=3000
```
### Usage

Open the app in multiple tabs or devices
Enter a username and join a room
Start chatting in real-time!

### Inspiration

This project was inspired by a tutorial from Dave Gray. While the tutorial used CommonJS, this implementation uses modern ES modules and React.

### License

This project is licensed under the MIT License.
