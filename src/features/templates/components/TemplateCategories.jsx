import React from 'react';
import { Box, Chip } from '@mui/material';
import PropTypes from 'prop-types';

const TemplateCategories = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      gap: 1,
      mb: 3,
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    }}>
    {categories.map(({ value, label }) => (
      <Chip
        key={value}
        label={label}
        onClick={() => onCategorySelect(value)}
        color={selectedCategory === value ? 'primary' : 'default'}
        variant={selectedCategory === value ? 'filled' : 'outlined'}
        sx={{
          borderRadius: 1,
          '&:hover': {
            backgroundColor: (theme) =>
              selectedCategory === value
                ? theme.palette.primary.main
                : theme.palette.action.hover,
          },
        }}
      />
    ))}
  </Box>
);

TemplateCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};

export default React.memo(TemplateCategories);
