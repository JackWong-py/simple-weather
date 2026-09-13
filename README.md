# Simple Weather App 🌤️

A lightweight, responsive web application that fetches and displays real-time weather data for any city. Built to practice read-only API integration and asynchronous data fetching.

## 🚀 Live Demo
[https://simple-weather-gold.vercel.app/]

## ✨ Features
* **Real-time Data:** Fetches current temperature, humidity, and weather conditions.
* **City Search:** Users can search for any global city to get localized data.
* **Dynamic UI:** Interface updates automatically based on the returned weather state.

## 🛠️ Tech Stack
* **Frontend:** [React / HTML & Vanilla JS / Vue]
* **Styling:** [Tailwind CSS / Standard CSS]
* **API Integration:** [OpenWeatherMap API / WeatherAPI]
* **Environment:** [Vite / Node.js]

## 💻 Running Locally

To run this project on your local machine, follow these steps:

**1. Clone the repository**
'''bash
git clone (https://github.com/JackWong-py/simple-weather-app.git)
cd simple-weather-app

**2. Install dependencies**
'''bash
npm install

**3. Set up Environment Variables**
Create a .env file in the root directory and add your weather API key:

VITE_WEATHER_API_KEY=your_api_key_here

(Note: Get a free API key from OpenWeatherMap)

**4. Start the development server**
'''bash
npm run dev