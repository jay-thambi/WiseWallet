# WiseWallet - Student Budgeting App

A modern, student-focused budgeting application that helps students manage their finances, track expenses, and find student discounts.

## Features

- Budget and Goal Tracking with Categories
- Student Discount Integration
- AI-Powered Budget Insights
- Clean, Intuitive UI/UX

## Demo Video

![WiseWallet Demo](demo.mov)

## Key Features Explained

### AI Budget Insights
The app includes a smart AI analysis tab that provides:
- Real-time spending analysis across all budget categories
- Alerts for budgets nearing their limits (>80% used)
- Personalized savings recommendations
- Category-specific money-saving tips
- Identification of potential savings in underutilized budgets

### Budget Management
- Create and track multiple Budget categories
- Create and track multiple Goal categories
- Visual progress tracking with interactive circle display
- Transaction history for each budget
- One-click budget reset functionality
- Real-time spending updates

### Student Discount 
- Student discount page which can filter discount offers by sections or list in one place

## Tech Stack

- Frontend: React Native, Tailwind CSS
- Backend: Firebase, Node.js + Express
- APIs: Student Beans/UNiDAYS for discounts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase CLI
- React Native development environment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/WiseWallet.git
cd WiseWallet
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend app
cd frontend
npm start
```

## Project Structure

```
WiseWallet/
├── frontend/           # React Native frontend
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── navigation/
│   │   ├── services/
│   │   └── utils/
│   └── App.js
├── backend/           # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── server.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Team

- Abilash
- Sanjay Thambithurai (40184405)
- Ashkan
- Youssef
- Sarah
