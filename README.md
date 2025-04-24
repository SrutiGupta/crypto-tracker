# 📈 Real-Time Crypto Price Tracker

A responsive React + Redux Toolkit application that tracks real-time cryptocurrency prices, simulating WebSocket updates and managing all state via Redux.

![Crypto Tracker Demo](demo.gif)

## 🎯 Features

- **Real-time Price Updates**: Simulated WebSocket updates every 1-2 seconds
- **Comprehensive Data Display**: Shows price, percentage changes, market cap, volume, and supply information
- **Visual Indicators**: Color-coded percentage changes (green for positive, red for negative)
- **Responsive Design**: Optimized for all screen sizes
- **Redux State Management**: All data and updates managed through Redux store

## 🛠️ Tech Stack

- **React 19** with Vite for fast development
- **Redux Toolkit** for efficient state management
- **CSS3** for responsive styling
- **Mock WebSocket** implementation for simulating real-time data

## 🏗️ Architecture

The application follows a clean architecture pattern:

```
crypto-tracker/
├── public/
│   ├── crypto-logos/     # SVG logos for each cryptocurrency
│   └── charts/           # SVG charts for 7-day price history
├── src/
│   ├── app/
│   │   └── store.js      # Redux store configuration
│   ├── components/
│   │   └── CryptoTable.jsx  # Main table component
│   ├── features/
│   │   └── crypto/
│   │       ├── cryptoSlice.js  # Redux slice with actions and reducers
│   │       └── cryptoAPI.js    # API service (mock)
│   ├── utils/
│   │   └── mockSocket.js  # WebSocket simulation
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── package.json
└── README.md
```

## 🔄 Data Flow

1. **Initial Load**:
   - App fetches initial cryptocurrency data
   - Data is stored in Redux

2. **Real-time Updates**:
   - MockSocket simulates WebSocket connection
   - Every 1-2 seconds, random price changes are generated
   - Updates are dispatched to Redux store
   - UI components re-render with new data

3. **Optimized Rendering**:
   - Redux selectors ensure components only re-render when relevant data changes

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SrutiGupta/crypto-tracker.git
   cd crypto-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## 📊 Creating a Demo

To create a demo GIF or video of the application:

1. Install a screen recording tool like [ScreenToGif](https://www.screentogif.com/) (Windows) or [Kap](https://getkap.co/) (Mac)
2. Start the application with `npm run dev`
3. Record a 2-5 minute demonstration showing:
   - The UI layout
   - Real-time price updates
   - Responsive design (by resizing the browser window)
4. Save the recording as a GIF or video
5. Add it to your project repository

## 🌟 Potential Enhancements

- **Real API Integration**: Connect to CoinGecko or Binance APIs
- **Filtering & Sorting**: Add ability to sort by price, market cap, etc.
- **Favorites**: Allow users to mark favorite cryptocurrencies
- **Price Alerts**: Notify users when prices hit certain thresholds
- **Historical Data**: Add detailed charts with historical price data
- **TypeScript Integration**: Convert to TypeScript for better type safety
- **Unit Tests**: Add tests for reducers and selectors

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
