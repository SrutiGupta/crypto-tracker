import React from 'react';
import { useSelector } from 'react-redux';
import { selectCryptoData, selectCryptoStatus, selectCryptoError } from '../features/crypto/cryptoSlice';

const CryptoTable = () => {
  // Using selectors for optimized re-renders
  const cryptoData = useSelector(selectCryptoData);
  const status = useSelector(selectCryptoStatus);
  const error = useSelector(selectCryptoError);

  // Format number with appropriate suffix (B for billions, T for trillions)
  const formatLargeNumber = (num) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`;
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };

  // Format supply numbers
  const formatSupply = (supply, symbol) => {
    if (supply === null) return '∞';
    return `${(supply / 1000000).toFixed(2)}M ${symbol}`;
  };

  if (status === 'loading') {
    return <div className="loading-container">Loading cryptocurrency data...</div>;
  }

  if (status === 'failed') {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="crypto-table-container">
      <h2>Cryptocurrency Prices</h2>
      <div className="table-responsive">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>1h %</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>Market Cap</th>
              <th>Volume (24h)</th>
              <th>Circulating Supply</th>
              <th>Max Supply</th>
              <th>7d Chart</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td className="crypto-name-cell">
                  <img src={crypto.logo} alt={crypto.name} className="crypto-logo" />
                  <div>
                    <div className="crypto-name">{crypto.name}</div>
                    <div className="crypto-symbol">{crypto.symbol}</div>
                  </div>
                </td>
                <td className="price-cell">${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className={crypto.priceChange1h >= 0 ? 'positive' : 'negative'}>
                  {crypto.priceChange1h >= 0 ? '+' : ''}{crypto.priceChange1h.toFixed(2)}%
                </td>
                <td className={crypto.priceChange24h >= 0 ? 'positive' : 'negative'}>
                  {crypto.priceChange24h >= 0 ? '+' : ''}{crypto.priceChange24h.toFixed(2)}%
                </td>
                <td className={crypto.priceChange7d >= 0 ? 'positive' : 'negative'}>
                  {crypto.priceChange7d >= 0 ? '+' : ''}{crypto.priceChange7d.toFixed(2)}%
                </td>
                <td>{formatLargeNumber(crypto.marketCap)}</td>
                <td>{formatLargeNumber(crypto.volume24h)}</td>
                <td>{formatSupply(crypto.circulatingSupply, crypto.symbol)}</td>
                <td>{crypto.maxSupply ? formatSupply(crypto.maxSupply, crypto.symbol) : '∞'}</td>
                <td>
                  <img src={crypto.chart7d} alt={`${crypto.name} 7d chart`} className="crypto-chart" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
