const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="card">
            <div className="skeleton h-6 w-1/3 mb-4"></div>
            <div className="skeleton h-10 w-1/2 mb-2"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>
        );
      
      case 'transaction':
        return (
          <div className="flex items-center justify-between p-4 border-b border-primary-gray-200">
            <div className="flex items-center gap-3 flex-1">
              <div className="skeleton h-10 w-10 rounded-full"></div>
              <div className="flex-1">
                <div className="skeleton h-4 w-32 mb-2"></div>
                <div className="skeleton h-3 w-20"></div>
              </div>
            </div>
            <div className="skeleton h-5 w-20"></div>
          </div>
        );
      
      case 'chart':
        return (
          <div className="card">
            <div className="skeleton h-6 w-1/4 mb-6"></div>
            <div className="skeleton h-64 w-full"></div>
          </div>
        );
      
      default:
        return <div className="skeleton h-20 w-full"></div>;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-fade-in">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
