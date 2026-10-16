import React from 'react';
import { Box, Chip, useTheme, alpha } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * TemplateCategories - Modern category filter chips
 * Features:
 * - Clean, scrollable horizontal layout
 * - Active state with visual feedback
 * - Smooth transitions and hover effects
 * - Accessible keyboard navigation
 */
const TemplateCategories = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: 1,
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
      role='tablist'
      aria-label='Template categories'>
      {categories.map((category) => {
        // Handle both object {value, label} and string formats
        const categoryValue =
          typeof category === 'object' ? category.value : category;
        const categoryLabel =
          typeof category === 'object' ? category.label : category;
        const active = selectedCategory === categoryValue;

        return (
          <Chip
            key={categoryValue}
            label={categoryLabel}
            onClick={() => onCategorySelect(categoryValue)}
            clickable
            role='tab'
            aria-selected={active}
            sx={{
              fontWeight: active ? 600 : 500,
              fontSize: '0.875rem',
              height: 36,
              px: 0.5,
              borderRadius: 'var(--ms-radius-xl)',
              bgcolor: active
                ? 'primary.main'
                : alpha(theme.palette.background.default, 0.6),
              color: active ? 'primary.contrastText' : 'text.secondary',
              border: `1px solid ${
                active
                  ? 'transparent'
                  : theme.customTokens?.borderSubtle || theme.palette.divider
              }`,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                bgcolor: active
                  ? 'primary.dark'
                  : alpha(theme.palette.primary.main, 0.08),
                color: active ? 'primary.contrastText' : 'text.primary',
                transform: 'translateY(-1px)',
                boxShadow: active
                  ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                  : theme.customTokens?.shadow?.sm || theme.shadows[1],
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          />
        );
      })}
    </Box>
  );
};

TemplateCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};

export default React.memo(TemplateCategories);
