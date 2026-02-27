import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Fade,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Divider,
  useTheme,
  alpha,
  InputAdornment,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import TemplateCard from './TemplateCard';
import TemplateCategories from './TemplateCategories';
import SearchField from '../ui/SearchField';
import { NoSearchResults } from '../ui/EmptyState';
import { useTemplates } from '../../hooks/useTemplates';

/**
 * TemplatesGrid - Modern 2026+ Design
 * Features:
 * - Responsive grid/list view toggle
 * - Smart filtering sidebar
 * - Empty states for better UX
 * - Smooth animations and transitions
 * - Optimized layout that doesn't overwhelm users
 */
const TemplatesGrid = () => {
  const theme = useTheme();
  const {
    templates,
    categories,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedIdx,
    copiedIdx,
    handleCopy,
    handleUseTemplate,
  } = useTemplates();

  const [view, setView] = React.useState('grid');

  const handleViewChange = (_, next) => {
    if (next) setView(next);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
  };

  // Memoize the grid columns based on view
  const gridColumns = useMemo(() => {
    if (view === 'list') return { xs: 12 };
    return { xs: 12, sm: 6, lg: 4 };
  }, [view]);

  const hasActiveFilters = search.trim() !== '' || selectedCategory !== 'All';

  return (
    <Box sx={{ width: '100%' }}>
      {/* Search and View Controls */}
      <Box sx={{ mb: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent='space-between'>
          <SearchField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search templates by name, description, or content...'
            sx={{
              mb: 0,
              flex: 1,
              maxWidth: { sm: 600 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            size='small'
            sx={{
              alignSelf: { xs: 'flex-end', sm: 'center' },
              bgcolor: alpha(theme.palette.background.default, 0.5),
            }}
            aria-label='View mode'>
            <ToggleButton value='grid' aria-label='Grid view'>
              <ViewModuleIcon fontSize='small' />
            </ToggleButton>
            <ToggleButton value='list' aria-label='List view'>
              <ViewListIcon fontSize='small' />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>

      {/* Category Filters */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant='subtitle2'
          sx={{
            mb: 1.5,
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            fontSize: '0.75rem',
          }}>
          Categories
        </Typography>
        <TemplateCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Templates Grid/List */}
      {templates.length === 0 ? (
        <NoSearchResults
          action={
            hasActiveFilters ? (
              <Box
                component='button'
                onClick={handleClearFilters}
                sx={{
                  px: 3,
                  py: 1.5,
                  border: 'none',
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}>
                Clear Filters
              </Box>
            ) : null
          }
        />
      ) : (
        <>
          {/* Results Count */}
          <Typography
            variant='body2'
            sx={{
              mb: 2,
              color: 'text.secondary',
              fontWeight: 500,
            }}>
            Showing {templates.length} template
            {templates.length !== 1 ? 's' : ''}
          </Typography>

          <Grid container spacing={{ xs: 2, md: 3 }} alignItems='stretch'>
            {templates.map((template, idx) => (
              <Grid
                item
                key={template.label}
                {...gridColumns}
                sx={{ display: 'flex' }}>
                <Fade in timeout={300 + idx * 50} style={{ width: '100%' }}>
                  <div style={{ width: '100%', display: 'flex' }}>
                    <TemplateCard
                      template={template}
                      index={idx}
                      selectedIdx={selectedIdx}
                      copiedIdx={copiedIdx}
                      onUseTemplate={handleUseTemplate}
                      onCopy={handleCopy}
                      viewMode={view}
                    />
                  </div>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default TemplatesGrid;
