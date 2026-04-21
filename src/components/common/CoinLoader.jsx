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
    </div>
  );
};

export default CoinLoader;
