import useTemplatesStore from '@/features/templates/store/templatesStore';
import { useCatalogActions } from './useCatalogActions';

export const useTemplates = () => {
  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedIdx,
    setSelectedIdx,
    copiedIdx,
    setCopiedIdx,
    getFilteredTemplates,
    getCategories,
  } = useTemplatesStore();
  const { handleCopy, handleUse } = useCatalogActions({
    setSelectedIdx,
    setCopiedIdx,
  });

  return {
    templates: getFilteredTemplates(),
    categories: getCategories(),
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedIdx,
    copiedIdx,
    handleCopy,
    handleUseTemplate: handleUse,
  };
};
