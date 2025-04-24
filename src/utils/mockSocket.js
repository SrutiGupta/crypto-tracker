// This file simulates a WebSocket connection for real-time cryptocurrency price updates

class MockSocket {
  constructor(store) {
    this.store = store;
    this.interval = null;
    this.isConnected = false;
  }

  connect() {
    if (this.isConnected) return;

    console.log('MockSocket: Connecting to mock cryptocurrency price feed...');
    this.isConnected = true;

    // Simulate receiving price updates every 1-2 seconds
    this.interval = setInterval(() => {
      this.simulatePriceUpdate();
    }, 1500); // 1.5 seconds

    console.log('MockSocket: Connected successfully');
  }

  disconnect() {
    if (!this.isConnected) return;

    console.log('MockSocket: Disconnecting from mock cryptocurrency price feed...');
    clearInterval(this.interval);
    this.interval = null;
    this.isConnected = false;

    console.log('MockSocket: Disconnected successfully');
  }

  // Helper to generate random percentage change
  generateRandomPercentageChange(min, max) {
    return (Math.random() * (max - min) + min);
  }

  simulatePriceUpdate() {
    // Get current crypto data from the store
    const { cryptoData } = this.store.getState().crypto;

    if (!cryptoData || cryptoData.length === 0) return;

    // Randomly select a cryptocurrency to update
    const randomIndex = Math.floor(Math.random() * cryptoData.length);
    const cryptoToUpdate = cryptoData[randomIndex];

    // Generate a random price change (between -3% and +3%)
    const priceChangePercent = this.generateRandomPercentageChange(-3, 3) / 100;
    const newPrice = cryptoToUpdate.price * (1 + priceChangePercent);

    // Calculate new percentage changes
    const new1hChange = cryptoToUpdate.priceChange1h + this.generateRandomPercentageChange(-0.3, 0.3);
    const new24hChange = cryptoToUpdate.priceChange24h + this.generateRandomPercentageChange(-0.4, 0.4);
    const new7dChange = cryptoToUpdate.priceChange7d + this.generateRandomPercentageChange(-0.5, 0.5);

    // Calculate new 24h volume (fluctuate by -5% to +5%)
    const volumeChangePercent = this.generateRandomPercentageChange(-5, 5) / 100;
    const newVolume24h = cryptoToUpdate.volume24h * (1 + volumeChangePercent);

    // Prepare all updates
    const updates = {
      price: newPrice,
      priceChange1h: new1hChange,
      priceChange24h: new24hChange,
      priceChange7d: new7dChange,
      volume24h: newVolume24h
    };

    // Dispatch the update to the store
    this.store.dispatch({
      type: 'crypto/updateCryptoData',
      payload: {
        id: cryptoToUpdate.id,
        updates
      }
    });

    console.log(`MockSocket: Updated ${cryptoToUpdate.name} price to $${newPrice.toFixed(2)}`);
  }
}

export default MockSocket;
