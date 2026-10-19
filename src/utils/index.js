import { ENV } from '@config/index';

export { loadAndFilter } from './loadAndFilter';

export const logger = {
  log: (...args) => {
    if (ENV.isDevelopment) {
      // eslint-disable-next-line no-console
      console.log('[Markdown Shop]', ...args);
    }
  },
  info: (...args) => {
    if (ENV.isDevelopment) {
      // eslint-disable-next-line no-console
      console.info('[Markdown Shop INFO]', ...args);
    }
  },
  warn: (...args) => {
    if (ENV.isDevelopment) {
      console.warn('[Markdown Shop WARNING]', ...args);
    }
  },
  error: (...args) => {
    console.error('[Markdown Shop ERROR]', ...args);
  },
};

export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch (error) {
    logger.error('Failed to copy to clipboard:', error);
    return false;
  }
};
