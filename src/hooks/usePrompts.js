import usePromptsStore from '@/features/prompts/store/promptsStore';
import { useCatalogActions } from './useCatalogActions';

export const usePrompts = () => {
  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedIdx,
    setSelectedIdx,
    copiedIdx,
    setCopiedIdx,
    getFilteredPrompts,
    getCategories,
  } = usePromptsStore();
  const { handleCopy, handleUse } = useCatalogActions({
    setSelectedIdx,
    setCopiedIdx,
  });

  return {
    prompts: getFilteredPrompts(),
    categories: getCategories(),
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedIdx,
    copiedIdx,
    handleCopy,
    handleUsePrompt: handleUse,
  };
};
