import { useState, useCallback, useRef } from 'react';
import { copyToClipboard as copyUtil, logger } from '@utils/index';

/**
 * Enhanced Clipboard Hook - 2026+ UX Pattern
 * Provides comprehensive clipboard operations with loading, success, and error states
 * Supports multiple content types: text, markdown, SVG, URLs
 *
 * @param {Object} options - Configuration options
 * @param {number} options.duration - Duration to show copied state (ms)
 * @param {Function} options.onSuccess - Callback on successful copy
 * @param {Function} options.onError - Callback on copy error
 * @returns {Object} Clipboard state and operations
 */
export const useClipboard = (options = {}) => {
  const { duration = 2000, onSuccess, onError } = options;

  const [state, setState] = useState({
    copied: false,
    copying: false,
    error: null,
  });

  const timeoutRef = useRef(null);

  const copyToClipboard = useCallback(
    async (content, type = 'text') => {
      if (!content) {
        logger.warn('No content provided to copy');
        const error = new Error('No content provided');
        setState({ copied: false, copying: false, error });
        onError?.(error);
        return false;
      }

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set copying state
      setState({ copied: false, copying: true, error: null });

      try {
        let textToCopy = content;

        // Handle different content types
        switch (type) {
          case 'markdown':
            // Content is already markdown
            textToCopy = content;
            break;
          case 'svg':
            // Wrap SVG if needed
            textToCopy = content.startsWith('<svg')
              ? content
              : `<svg>${content}</svg>`;
            break;
          case 'url':
            // Validate URL format
            try {
              new URL(content);
              textToCopy = content;
            } catch {
              throw new Error('Invalid URL format');
            }
            break;
          case 'text':
          default:
            textToCopy = String(content);
        }

        const success = await copyUtil(textToCopy);

        if (success) {
          setState({ copied: true, copying: false, error: null });
          onSuccess?.({ content: textToCopy, type });

          // Reset copied state after duration
          timeoutRef.current = setTimeout(() => {
            setState((prev) => ({ ...prev, copied: false }));
          }, duration);

          return true;
        } else {
          throw new Error('Failed to copy to clipboard');
        }
      } catch (error) {
        logger.error('Clipboard copy failed:', error);
        setState({ copied: false, copying: false, error });
        onError?.(error);
        return false;
      }
    },
    [duration, onSuccess, onError]
  );

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState({ copied: false, copying: false, error: null });
  }, []);

  return {
    copied: state.copied,
    copying: state.copying,
    error: state.error,
    copyToClipboard,
    reset,
  };
};

/**
 * Simple clipboard hook for basic use cases
 * @deprecated Use useClipboard for new implementations
 */
export const useSimpleClipboard = (duration = 2000) => {
  const { copied, copyToClipboard } = useClipboard({ duration });
  return [copied, copyToClipboard];
};

export default useClipboard;
