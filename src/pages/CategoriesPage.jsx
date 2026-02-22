import useCategories from '../hooks/useCategories';
import CategoryManager from '../components/categories/CategoryManager';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

const CategoriesPage = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div>
        <LoadingSkeleton type="card" count={4} />
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
