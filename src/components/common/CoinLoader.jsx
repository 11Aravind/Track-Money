const CoinLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="coin-loader-wrapper">
      <div className="coin-loader">
        <div className="coin">
          <div className="coin-face coin-front">
            <span className="coin-symbol">₹</span>
          </div>
          <div className="coin-face coin-back">
            <span className="coin-symbol">₹</span>
          </div>
          <div className="coin-edge"></div>
        </div>
        <div className="coin-shadow"></div>
      </div>
      <p className="coin-loader-text">{message}</p>
      <div className="coin-loader-dots">
        <span className="coin-dot"></span>
        <span className="coin-dot"></span>
        <span className="coin-dot"></span>
      </div>
    </div>
  );
};

export default CoinLoader;
