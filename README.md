# 🚀 CompanyPulse AI

CompanyPulse AI is a full-stack AI-powered stock analysis platform that allows users to search companies, view financial metrics, analyze historical price charts, and get AI-generated investment insights using real market data.

This project simulates a professional financial analysis dashboard similar to real-world platforms and demonstrates full-stack development, API integration, caching, database usage, and AI integration.

---

## 🌐 Live Demo

Frontend: https://companypulse-a.vercel.app/.

Backend API: https://companypulse-backend-tejas.onrender.com/docs.

---

## 📌 Features

- 🔎 Company search with live suggestions
- 📊 5-year stock price chart visualization
- 📈 Financial metrics (PE, EPS, ROE, margins, etc.)
- 🤖 AI-generated company summary
- 🌍 Global market ticker bar
- ⚡ Redis caching for performance
- 🗄 PostgreSQL database integration
- 🔐 API-key protected backend
- 📡 Async API calls using FastAPI
- 📉 Historical market data integration
- 🎨 Modern UI with React + Tailwind
- 🚀 Full production deployment

---

## 🧠 AI Analysis

The system generates AI-based summaries using LLM API.

AI summary includes:

- Company performance overview
- Risk evaluation
- Investment suggestion
- Financial health analysis

Powered by:

- Groq API
- LLaMA3 model
- Custom prompts

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- Recharts

### Backend

- FastAPI
- Python
- Pydantic
- Async HTTP (httpx)
- Background tasks

### Database & Cache

- PostgreSQL
- Redis

### APIs Used

- Finnhub API (market data)
- Yahoo Finance (historical data fallback)
- Groq API (AI analysis)

### Deployment

- Backend hosted on Railway
- Frontend hosted on Vercel
- PostgreSQL hosted on Railway
- Redis hosted on Railway
- GitHub for source control

---

## 🏗 Project Structure

CompanyPulse-AI
│
├── app
│ ├── api
│ │ ├── router.py
│ │ ├── company.py
│ │ ├── market.py
│ │ ├── search.py
│ │ └── auth.py
│ │
│ ├── services
│ │ ├── company_service.py
│ │ ├── market_service.py
│ │ ├── ai_service.py
│ │ ├── redis_service.py
│ │ └── db_service.py
│ │
│ ├── core
│ │ ├── logging.py
│ │ └── config.py
│ │
│ ├── models
│ │ └── schemas.py
│ │
│ ├── middleware
│ │ └── api_key.py
│ │
│ └── main.py
│
├── frontend
│ ├── src
│ │ ├── api
│ │ ├── components
│ │ ├── pages
│ │ ├── router
│ │ ├── layouts
│ │ ├── hooks
│ │ └── styles
│ │
│ ├── public
│ └── package.json
│
├── requirements.txt
└── README.md


---

## ⚙️ Environment Variables

Create `.env` file in backend
FINNHUB_API_KEY=
GROQ_API_KEY=
DATABASE_URL=
REDIS_URL=
API_KEY=
APP_ENV=production


---

## ▶️ Run Locally

### Backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend: http://127.0.0.1:8000/docs


---

### Frontend
cd frontend
npm install
npm run dev


Frontend: http://localhost:5173


---

## 🚀 Deployment

Project deployed using modern cloud services.

Backend → Railway  
Frontend → Vercel  
Database → Railway PostgreSQL  
Cache → Railway Redis  

Steps:

1. Push project to GitHub
2. Deploy backend service
3. Add PostgreSQL
4. Add Redis
5. Add environment variables
6. Deploy frontend
7. Connect API URL
8. Test live app

---

## 🎯 Purpose of Project

This project was built to demonstrate:

- Full-stack development
- API integration
- AI integration
- Caching system
- Database usage
- Backend architecture
- Production deployment
- Real-world project design

---

## 📸 Screenshots

(Add screenshots later)

- Home page
- Company report
- Chart view
- AI summary
- Market ticker

---

## 👨‍💻 Author

Tejas  
Computer Science Graduate  
Interested in AI, Finance, and System Design

GitHub: https://github.com/yourusername

---

## ⭐ Future Improvements

- User login & portfolio
- Watchlist
- Real-time websocket prices
- News sentiment analysis
- Dark mode
- Mobile UI
- Paid API integration
- AI recommendations
- Portfolio analytics

---

## 📜 License

This project is for educational and demonstration purposes.


