This is a real-time chat application built using React with TypeScript on the frontend and Express with TypeScript on the backend. It uses Socket.IO for real-time communication.

Folder Structurechat_app/
├── app/      # Frontend (React + TypeScript)
└── server/   # Backend (Express + TypeScript)FeaturesReal-time messaging using WebSockets
User connection and disconnection notifications
Typing indicator for real-time feedback
Welcome message for new users
Room-based chat functionality
Form validation using Zod and React Hook Form with Zod Resolver
Tech StackFrontend: React, TypeScript, Vite, ShadCN UI
Backend: Express, TypeScript, Socket.IO
State Management: React Hooks, React useForm
Validation: Zod, Zod Resolver
InstallationClone the repository:
git clone https://github.com/your-repo/chat-app.git
cd chat_appInstall dependencies for both frontend and backend:
cd app
npm install
cd ../server
npm installStart the backend server:
cd server
npm run devStart the frontend:
cd ../app
npm run devThe app will be available at http://localhost:5173
Environment VariablesCreate a .env file in the server directory with the following variables:
PORT=3000UsageOpen the app in multiple tabs or devices.
Enter a username and join a room.
Start chatting in real-time!
InspirationThis project was inspired by a tutorial from Dave Gray. While the tutorial used CommonJS, this implementation uses modern ES modules and React.
LicenseThis project is licensed under the MIT License.