import useCategories from '../hooks/useCategories';
import CategoryManager from '../components/categories/CategoryManager';
import CoinLoader from '../components/common/CoinLoader';

const CategoriesPage = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div>
        <CoinLoader message="Loading categories..." />
      </div>
    );
  }

  return (
    <div>
      <CategoryManager categories={categories} />
    </div>
  );
};

export default CategoriesPage;
