import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  cryptoData: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    fetchCryptoStart: (state) => {
      state.status = 'loading';
    },
    fetchCryptoSuccess: (state, action) => {
      state.status = 'succeeded';
      state.cryptoData = action.payload;
    },
    fetchCryptoFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateCryptoData: (state, action) => {
      const { id, updates } = action.payload;
      const cryptoIndex = state.cryptoData.findIndex(crypto => crypto.id === id);

      if (cryptoIndex !== -1) {
        // Update the crypto with all the provided updates
        state.cryptoData[cryptoIndex] = {
          ...state.cryptoData[cryptoIndex],
          ...updates
        };
      }
    }
  },
});

export const {
  fetchCryptoStart,
  fetchCryptoSuccess,
  fetchCryptoFailure,
  updateCryptoData
} = cryptoSlice.actions;

// Selectors
export const selectCryptoData = state => state.crypto.cryptoData;
export const selectCryptoStatus = state => state.crypto.status;
export const selectCryptoError = state => state.crypto.error;

// Memoized selector for individual crypto by ID
export const selectCryptoById = createSelector(
  [selectCryptoData, (_, cryptoId) => cryptoId],
  (cryptoData, cryptoId) => cryptoData.find(crypto => crypto.id === cryptoId)
);

// Thunk for fetching initial crypto data
export const fetchCryptoData = () => async (dispatch) => {
  try {
    dispatch(fetchCryptoStart());

    // For now, we'll use mock data
    // In a real app, you would fetch from an API
    const mockData = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        logo: '/crypto-logos/bitcoin.svg',
        price: 50000,
        priceChange1h: 0.5,
        priceChange24h: 2.5,
        priceChange7d: 5.3,
        marketCap: 950000000000,
        volume24h: 25000000000,
        circulatingSupply: 19000000,
        maxSupply: 21000000,
        chart7d: '/charts/bitcoin.svg'
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        logo: '/crypto-logos/ethereum.svg',
        price: 3000,
        priceChange1h: -0.2,
        priceChange24h: 1.8,
        priceChange7d: 3.7,
        marketCap: 350000000000,
        volume24h: 15000000000,
        circulatingSupply: 120000000,
        maxSupply: null,
        chart7d: '/charts/ethereum.svg'
      },
      {
        id: 'tether',
        name: 'Tether',
        symbol: 'USDT',
        logo: '/crypto-logos/tether.svg',
        price: 1.0,
        priceChange1h: 0.01,
        priceChange24h: 0.05,
        priceChange7d: -0.02,
        marketCap: 83000000000,
        volume24h: 40000000000,
        circulatingSupply: 83000000000,
        maxSupply: null,
        chart7d: '/charts/tether.svg'
      },
      {
        id: 'bnb',
        name: 'BNB',
        symbol: 'BNB',
        logo: '/crypto-logos/bnb.svg',
        price: 380,
        priceChange1h: 0.8,
        priceChange24h: 2.1,
        priceChange7d: -1.5,
        marketCap: 58000000000,
        volume24h: 1200000000,
        circulatingSupply: 153000000,
        maxSupply: 200000000,
        chart7d: '/charts/bnb.svg'
      },
      {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        logo: '/crypto-logos/solana.svg',
        price: 150,
        priceChange1h: 1.2,
        priceChange24h: 5.2,
        priceChange7d: 12.5,
        marketCap: 45000000000,
        volume24h: 2500000000,
        circulatingSupply: 300000000,
        maxSupply: null,
        chart7d: '/charts/solana.svg'
      }
    ];

    dispatch(fetchCryptoSuccess(mockData));
  } catch (error) {
    dispatch(fetchCryptoFailure(error.toString()));
  }
};

export default cryptoSlice.reducer;
