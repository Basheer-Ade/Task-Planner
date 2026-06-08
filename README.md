Smart Student Planner

Overview



Smart Student Planner is a mobile application developed using React Native and Expo. The application helps students manage their academic activities by organising tasks, assignments, deadlines, and priorities in a simple and user-friendly interface.



The application allows users to create, edit, delete, search, and manage tasks while maintaining data locally on the device using AsyncStorage.



Features

User Authentication

Student Registration

Student Login

Logout Functionality

Dashboard

View all tasks

Display total tasks

Display completed tasks

Display pending tasks

Search tasks by title or module

Task Management

Add New Task

Edit Existing Task

Delete Task

Mark Task as Complete

Mark Task as Incomplete (Undo)

Assign Priority Levels (High, Medium, Low)

Settings

View student profile information

View application information

Logout from application

Validation and Error Handling

Required field validation

Email validation

User-friendly error messages

Local Data Storage

Task data stored using AsyncStorage

User session stored locally

Data persists between application launches

Technologies Used

Frontend

React Native

Expo

Navigation

React Navigation

Native Stack Navigator

Data Storage

AsyncStorage

Development Environment

Visual Studio Code

Node.js

Android Emulator / Expo Go

Project Structure

SmartStudentPlanner

│

├── assets

│

├── screens

│   ├── RegisterScreen.js

│   ├── LoginScreen.js

│   ├── DashboardScreen.js

│   ├── AddTaskScreen.js

│   ├── EditTaskScreen.js

│   └── SettingsScreen.js

│

├── components

│   └── TaskItem.js

│

├── storage

│   └── taskStorage.js

│

├── App.js

├── package.json

└── README.md

Installation Instructions

Prerequisites



Install the following software:



Node.js

Visual Studio Code

Expo CLI

Android Studio (optional)

Step 1: Clone Repository

git clone https://github.com/yourusername/smart-student-planner.git

Step 2: Navigate to Project Folder

cd smart-student-planner

Step 3: Install Dependencies

npm install

Step 4: Start Application

npx expo start

Step 5: Run Application



Choose one of the following:



Android Emulator

Expo Go Mobile Application

Web Browser

Application Workflow

User registers an account.

User logs into the application.

Dashboard displays academic tasks.

User can add, edit, delete, search, and manage tasks.

User can mark tasks as completed or incomplete.

User can access settings and logout.

Design Considerations



The application uses a green colour theme to create a clean and professional academic appearance. The interface was designed with simplicity, accessibility, and usability in mind to ensure students can manage their academic workload efficiently.



Future Improvements



The following features may be added in future versions:



Cloud Database Integration

Push Notifications

Calendar Integration

Dark Mode

Task Categories

Due Date Reminders

Student Profile Editing

Data Backup and Synchronisation

Known Limitations

User authentication is stored locally.

Data is stored on the device only.

