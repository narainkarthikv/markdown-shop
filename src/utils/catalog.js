export const filterCatalogItems = (
  items,
  { search = '', selectedCategory = 'all', searchFields = [] } = {}
) => {
  const normalizedSearch = String(search).trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !normalizedSearch ||
      searchFields.some((field) =>
        String(item?.[field] ?? '')
          .toLowerCase()
          .includes(normalizedSearch)
      );

    return matchesCategory && matchesSearch;
  });
};

export const getCatalogCategories = (items) => [
  ...new Set(items.map((item) => item.category).filter(Boolean)),
];
