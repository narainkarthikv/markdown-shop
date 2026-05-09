import { create } from 'zustand';
import promptsData from '@/assets/data/prompts.json';

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
    return prompts.filter((prompt) => {
      const normalizedSearch = search.toLowerCase();
      const matchesSearch =
        prompt.label.toLowerCase().includes(normalizedSearch) ||
        prompt.description.toLowerCase().includes(normalizedSearch) ||
        prompt.content.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        selectedCategory === 'all' || prompt.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  },
  getCategories: () => {
    const { prompts } = get();
    const categories = ['all', ...new Set(prompts.map((prompt) => prompt.category))];
    return categories.map((category) => ({
      value: category,
      label: category === 'all' ? 'All' : category,
    }));
  },
}));

export default usePromptsStore;
