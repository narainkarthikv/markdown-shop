import { memo, useMemo, useState } from 'react';
import { useShopStore } from '@/context/store/useShopStore';
import iconList from '../assets/data/iconsList.json';
import { loadAndFilter } from '../utils/loadAndFilter';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import useCachedImage from '@/hooks/useCachedImage';
import {
  TextField,
  Typography,
  Box,
  Paper,
  useTheme,
  alpha,
  InputAdornment,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DualActionButton from './ui/DualActionButton.jsx';
import { NoSearchResults, NoIconsSelected } from './ui/EmptyState';
import { IconGridSkeleton } from './ui/Skeletons';
import ModernSection from './ui/ModernSection';

/**
 * IconItem - Individual icon with modern hover states
 */
const IconItem = memo(({ icon, isSelected, onClick }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={() => onClick(icon)}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1.5,
        borderRadius: 1.5,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: isSelected
          ? theme.customTokens?.primaryMuted ||
            alpha(theme.palette.primary.main, 0.1)
          : 'transparent',
        border: `2px solid ${
          isSelected
            ? theme.customTokens?.primary || theme.palette.primary.main
            : 'transparent'
        }`,
        '&:hover': {
          bgcolor: isSelected
            ? theme.customTokens?.primaryMuted ||
              alpha(theme.palette.primary.main, 0.15)
            : theme.customTokens?.surfaceHover ||
              alpha(theme.palette.action.hover, 0.8),
          transform: 'translateY(-2px)',
          boxShadow: theme.customTokens?.shadow.sm || theme.shadows[2],
          borderColor: isSelected
            ? theme.customTokens?.primary || theme.palette.primary.main
            : theme.customTokens?.borderSubtle || theme.palette.divider,
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.customTokens?.borderFocus || theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }}
      role='button'
      tabIndex={0}
      aria-label={`${isSelected ? 'Remove' : 'Add'} ${icon.name} icon`}
      aria-pressed={isSelected}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(icon);
        }
      }}>
      {isSelected && (
        <CheckCircleIcon
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            fontSize: 16,
            color: theme.customTokens?.success || theme.palette.success.main,
          }}
        />
      )}
      <Box
        component='img'
        src={icon.url}
        alt={icon.name}
        loading='lazy'
        sx={{
          width: 48,
          height: 48,
          objectFit: 'contain',
          mb: 0.5,
          filter: isSelected ? 'none' : 'grayscale(20%)',
          transition: 'filter 0.2s',
        }}
      />
      <Typography
        variant='caption'
        noWrap
        sx={{
          width: '100%',
          textAlign: 'center',
          fontSize: '0.7rem',
          fontWeight: isSelected ? 600 : 400,
          color: isSelected
            ? theme.customTokens?.primary || theme.palette.primary.main
            : theme.customTokens?.textSecondary || theme.palette.text.secondary,
        }}>
        {icon.name}
      </Typography>
    </Box>
  );
});

IconItem.displayName = 'IconItem';

/**
 * Modern Icons Component - 2026+ Design
 * Features:
 * - Clean, searchable grid layout
 * - Selected icons preview with dual-action buttons
 * - Smooth animations and hover states
 * - Empty states and loading skeletons
 */
const Icons = () => {
  const theme = useTheme();
  const [isLoading] = useState(false);

  const searchTerm = useShopStore((state) => state.iconSearchTerm);
  const setSearchTerm = useShopStore((state) => state.setIconSearchTerm);
  const embedIcon = useMarkdownStore((state) => state.embedIcon);
  const removeIcon = useMarkdownStore((state) => state.removeIcon);
  const iconNames = useMarkdownStore((state) => state.iconNames);

  const filteredIcons = useMemo(
    () => loadAndFilter(iconList, searchTerm),
    [searchTerm]
  );

  const handleIconClick = (icon) => {
    const iconName = icon.name.toLowerCase();
    if (iconNames.includes(iconName)) {
      removeIcon(iconName);
    } else {
      embedIcon(iconName);
    }
  };

  const handleClearSearch = () => setSearchTerm('');

  const skilliconsUrl =
    iconNames.length > 0
      ? `https://skillicons.dev/icons?i=${iconNames.join(',')}`
      : '';

  const cachedSkilliconsSrc = useCachedImage(skilliconsUrl, {
    enabled: Boolean(skilliconsUrl),
  });

  const skilliconsMarkdown =
    iconNames.length > 0
      ? `<img src="${skilliconsUrl}" alt="Tech Stack" />`
      : '';

  const handleInsertIcons = () => {
    if (iconNames.length > 0) {
      const markdown = useMarkdownStore.getState().markdown;
      const embedMarkdown = useMarkdownStore.getState().embedMarkdown;

      if (!markdown.includes(skilliconsMarkdown)) {
        embedMarkdown(skilliconsMarkdown);
      }
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        textAlign: 'center',
        mt: 0,
        p: 4,
        width: '100%',
        maxWidth: '100%',
        minHeight: 500,
        maxHeight: 800,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: (theme) =>
          `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
      }}
      role='region'
      aria-label='Tech Stack Icons Selector'>
      <ModernSection
        title='Tech Stack Icons'
        description={`Select icons to build your tech stack. ${iconNames.length} selected`}
        variant='compact'
        sx={{ mb: 0 }}>
        {/* Search Field */}
        <TextField
          variant='outlined'
          placeholder='Search icons (e.g., react, python, docker)...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size='medium'
          fullWidth
          sx={{
            mb: 3,
            maxWidth: 500,
            mx: 'auto',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor:
                theme.customTokens?.surface || theme.palette.background.paper,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon
                  sx={{
                    color:
                      theme.customTokens?.textTertiary ||
                      theme.palette.text.disabled,
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position='end'>
                <Chip
                  label='Clear'
                  size='small'
                  onClick={handleClearSearch}
                  sx={{ cursor: 'pointer' }}
                />
              </InputAdornment>
            ),
          }}
          aria-label='Search tech stack icons'
        />

        {/* Selected Icons Preview */}
        {iconNames.length > 0 && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              bgcolor:
                theme.customTokens?.surfaceHover ||
                alpha(theme.palette.action.hover, 0.3),
              border: `1px solid ${theme.customTokens?.border || theme.palette.divider}`,
            }}>
            <Stack spacing={2} alignItems='center'>
              <Box>
                <img
                  src={cachedSkilliconsSrc || skilliconsUrl}
                  alt='Selected icons preview'
                  loading='lazy'
                  decoding='async'
                  style={{
                    maxWidth: '100%',
                    maxHeight: 80,
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <DualActionButton
                content={skilliconsMarkdown}
                onInsert={handleInsertIcons}
                contentType='markdown'
                size='small'
                variant='default'
                copyLabel='Copy Icons'
                insertLabel='Insert'
              />
            </Stack>
          </Box>
        )}

        {/* Loading State */}
        {isLoading && <IconGridSkeleton count={24} />}

        {/* Icon Grid */}
        {!isLoading && filteredIcons.length > 0 && (
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              minHeight: 0,
              px: 1,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor:
                  theme.customTokens?.border ||
                  alpha(theme.palette.text.primary, 0.2),
                borderRadius: '4px',
                '&:hover': {
                  bgcolor:
                    theme.customTokens?.borderStrong ||
                    alpha(theme.palette.text.primary, 0.3),
                },
              },
            }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
                gap: 1.5,
                pb: 2,
              }}
              role='grid'
              aria-label='Icon selection grid'>
              {filteredIcons.map((icon, index) => (
                <IconItem
                  key={`${icon.name}-${index}`}
                  icon={icon}
                  isSelected={iconNames.includes(icon.name.toLowerCase())}
                  onClick={handleIconClick}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Empty States */}
        {!isLoading && filteredIcons.length === 0 && searchTerm && (
          <NoSearchResults
            searchTerm={searchTerm}
            onClear={handleClearSearch}
          />
        )}

        {!isLoading &&
          iconNames.length === 0 &&
          !searchTerm &&
          filteredIcons.length > 0 && (
            <Box sx={{ py: 2 }}>
              <Typography
                variant='body2'
                sx={{
                  color:
                    theme.customTokens?.textSecondary ||
                    theme.palette.text.secondary,
                }}>
                Click icons to add them to your tech stack
              </Typography>
            </Box>
          )}
      </ModernSection>
    </Paper>
  );
};

export default memo(Icons);
