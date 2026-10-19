import { create } from 'zustand';
import promptsData from '@/assets/data/prompts.json';
import { filterCatalogItems, getCatalogCategories } from '@/utils/catalog';

const usePromptsStore = create((set, get) => ({
  prompts: promptsData,
  search: '',
  selectedCategory: 'all',
  selectedIdx: null,
  copiedIdx: null,
  setSearch: (search) => set({ search }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedIdx: (idx) => set({ selectedIdx: idx }),
  setCopiedIdx: (idx) => set({ copiedIdx: idx }),
  getFilteredPrompts: () => {
    const { prompts, search, selectedCategory } = get();
    return filterCatalogItems(prompts, {
      search,
      selectedCategory,
      searchFields: ['label', 'description', 'content'],
    });
  },
  getCategories: () => {
    const { prompts } = get();
    const categories = ['all', ...getCatalogCategories(prompts)];
    return categories.map((category) => ({
      value: category,
      label: category === 'all' ? 'All' : category,
    }));
  },
}));

export default usePromptsStore;
