# Mednex-Hospital-Management-System

Mednex is an AI-powered hospital management system designed to streamline and enhance healthcare operations through advanced technology and real-time interactions. This system integrates various features to facilitate efficient hospital management, ensuring a smooth experience for both staff and patients.

## Table of Contents

- [Overview](#Overview)
- [Features](#features)
- [Dependencies](#dependencies)
- [Git Setup](#Git-Setup)
- [Client Setup](#Client-Setup)
- [Server Setup](#Server-Setup)
- [Usage](#usage)

## Overview

- Mednex is a cutting-edge hospital management system powered by artificial intelligence, designed to optimize hospital operations and improve patient care. By integrating advanced AI capabilities and real-time communication tools, Mednex offers a comprehensive solution that enhances efficiency, streamlines processes, and provides seamless interaction between healthcare providers and patients. The system supports various platforms, including web, iOS, and messaging apps, ensuring accessibility and convenience for all users.

## Features

- Intelligent Chatbot: Engages users with a smart chatbot that assists with appointment scheduling, general inquiries, and patient support, available 24/7 to handle routine tasks.
- iOS Application: A dedicated mobile application for iOS devices, offering easy access to hospital services, patient records, and appointment management directly from your phone.
- WhatsApp Bot: Facilitates real-time communication through a WhatsApp bot, enabling patients and staff to interact with the system via a familiar messaging platform.
- Real-Time Updates: Provides instant updates on patient data, appointments, and hospital operations, ensuring that all stakeholders stay informed and responsive.
- Comprehensive Data Management: Efficiently manages and organizes patient information, medical records, and appointment schedules, ensuring data accuracy and accessibility.
- AI-Powered Report Summary: Automatically generates detailed summaries of patient reports using AI, providing healthcare professionals with actionable insights and supporting faster decision-making.

## Dependencies

- Nextjs
- Version Control
- wweb.js
- Firebase

## Git-Setup

Clone the repository:

```bash
git clone https://github.com/ITER-SIH/HW5-Team22
cd HW-Team22
```
## Web Setup

Redirect to client:

```bash
cd mednex
```

Install the dependencies:
```bash
npm install
```

Create a .env file:
```bash
NODE_PATH=./src
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
AUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_JWT_SECRET=
AUTH_FIREBASE_PROJECT_ID=
AUTH_FIREBASE_CLIENT_EMAIL=
AUTH_FIREBASE_PRIVATE_KEY=
```

Run client Interface:
```bash
npm run dev
```
## ML Setup

Redirect to server:

```bash
cd ml
```

Redirect to virtual env:
```bash
.\.venv\Scripts\Activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run Server:
```bash
python app.py
```
## Usage

Access the app in your web browser at `http://localhost:3000/`.


