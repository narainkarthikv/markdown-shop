import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import usePromptsStore from '@/features/prompts/store/promptsStore';
import useClipboard from './useClipboard';

export const usePrompts = () => {
  const navigate = useNavigate();
  const { copyToClipboard } = useClipboard();
  const { setMarkdown } = useMarkdownStore();
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

  const handleCopy = useCallback(
    async (content, idx) => {
      try {
        await copyToClipboard(content);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
      } catch (err) {
        console.error('Failed to copy prompt: ', err);
      }
    },
    [copyToClipboard, setCopiedIdx]
  );

  const handleUsePrompt = useCallback(
    (content, idx) => {
      setMarkdown(content);
      setSelectedIdx(idx);
      navigate('/shop');
      setTimeout(() => setSelectedIdx(null), 2000);
    },
    [navigate, setMarkdown, setSelectedIdx]
  );

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
    handleUsePrompt,
  };
};
