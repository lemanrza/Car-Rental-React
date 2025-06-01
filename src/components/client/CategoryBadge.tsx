import React from 'react';

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const getBadgeColor = () => {
    switch (category.toLowerCase()) {
      case 'electric':
        return 'bg-green-100 text-green-800';
      case 'hybrid':
        return 'bg-teal-100 text-teal-800';
      case 'suv':
        return 'bg-blue-100 text-blue-800';
      case 'sedan':
        return 'bg-purple-100 text-purple-800';
      case 'sports':
        return 'bg-red-100 text-red-800';
      case 'luxury':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor()}`}>
      {category}
    </span>
  );
};

export default CategoryBadge;