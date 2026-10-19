import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import useClipboard from './useClipboard';

export const useCatalogActions = ({
  setSelectedIdx,
  setCopiedIdx,
  copiedDuration = 2000,
}) => {
  const navigate = useNavigate();
  const setMarkdown = useMarkdownStore((state) => state.setMarkdown);
  const { copyToClipboard } = useClipboard();

  const handleCopy = useCallback(
    async (content, index) => {
      const copied = await copyToClipboard(content);
      if (!copied) return;

      setCopiedIdx(index);
      setTimeout(() => setCopiedIdx(null), copiedDuration);
    },
    [copyToClipboard, copiedDuration, setCopiedIdx]
  );

  const handleUse = useCallback(
    (content, index) => {
      setMarkdown(content);
      setSelectedIdx(index);
      navigate('/shop');
      setTimeout(() => setSelectedIdx(null), copiedDuration);
    },
    [copiedDuration, navigate, setMarkdown, setSelectedIdx]
  );

  return { handleCopy, handleUse };
};
