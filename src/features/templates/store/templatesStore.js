import { create } from 'zustand';
import templatesData from '@/assets/data/templates.json';
import { filterCatalogItems, getCatalogCategories } from '@/utils/catalog';

const useTemplatesStore = create((set, get) => ({
  templates: templatesData,
  search: '',
  selectedCategory: 'all',
  selectedIdx: null,
  copiedIdx: null,
  setSearch: (search) => set({ search }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedIdx: (idx) => set({ selectedIdx: idx }),
  setCopiedIdx: (idx) => set({ copiedIdx: idx }),
  getFilteredTemplates: () => {
    const { templates, search, selectedCategory } = get();
    return filterCatalogItems(templates, {
      search,
      selectedCategory,
      searchFields: ['label', 'description'],
    });
  },
  getCategories: () => {
    const { templates } = get();
    const categories = ['all', ...getCatalogCategories(templates)];
    return categories.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    }));
  },
}));

export default useTemplatesStore;
