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
import PromptCard from './PromptCard';
import TemplateCategories from '@/components/Templates/TemplateCategories';
import SearchField from '@/components/ui/SearchField';
import { NoSearchResults } from '@/components/ui/EmptyState';
import { usePrompts } from '@/hooks/usePrompts';

const PromptGrid = () => {
  const theme = useTheme();
  const {
    prompts,
    categories,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedIdx,
    copiedIdx,
    handleCopy,
    handleUsePrompt,
  } = usePrompts();

  const [view, setView] = React.useState('grid');

  const handleViewChange = (_, next) => {
    if (next) setView(next);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
  };

  const gridColumns = useMemo(() => {
    return view === 'list' ? { xs: 12 } : { xs: 12, sm: 6, lg: 4 };
  }, [view]);

  const hasActiveFilters = search.trim() !== '' || selectedCategory !== 'all';

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent='space-between'>
          <SearchField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search prompts by name, description, or content...'
            sx={{ mb: 0, flex: 1, maxWidth: { sm: 600 } }}
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

      {prompts.length === 0 ? (
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
          <Typography
            variant='body2'
            sx={{
              mb: 2,
              color: 'text.secondary',
              fontWeight: 500,
            }}>
            Showing {prompts.length} prompt{prompts.length !== 1 ? 's' : ''}
          </Typography>

          <Grid container spacing={{ xs: 2, md: 3 }} alignItems='stretch'>
            {prompts.map((prompt, idx) => (
              <Grid item key={prompt.label} {...gridColumns} sx={{ display: 'flex' }}>
                <Fade in timeout={300 + idx * 50} style={{ width: '100%' }}>
                  <div style={{ width: '100%', display: 'flex' }}>
                    <PromptCard
                      prompt={prompt}
                      index={idx}
                      selectedIdx={selectedIdx}
                      copiedIdx={copiedIdx}
                      onUsePrompt={handleUsePrompt}
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

export default PromptGrid;
