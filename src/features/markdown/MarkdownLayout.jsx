import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import { SectionSelector } from '@/components/SectionSelector';
import { useShopStore } from '@/store/useShopStore';
import useMarkdownStore from './store/markdownStore';
import { useSectionPresets } from '@/hooks/useSectionPresets';

const MarkdownLayout = () => {
  const { markdown, setMarkdown, resetDraft } = useMarkdownStore();
  const clearSections = useShopStore((state) => state.clearSections);
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up('lg'));
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [activePane, setActivePane] = useState('editor');
  useSectionPresets();

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleClearDraft = () => {
    resetDraft();
    clearSections();
  };

  const handleNavigationToggle = () => {
    if (isWide) setNavigationOpen((open) => !open);
    else setMobileNavigationOpen(true);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 1.5, sm: 2.5, xl: 3 },
        boxSizing: 'border-box',
        gap: { xs: 2, md: 2.5 },
      }}>
      <Paper
        elevation={0}
        sx={{
          px: { xs: 1.5, sm: 2.5 },
          py: { xs: 1.5, sm: 2 },
          borderRadius: 'var(--ms-radius-2xl)',
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          backgroundImage:
            'linear-gradient(120deg, var(--ms-color-primary-subtle), transparent 56%)',
        }}>
        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent='space-between'
          spacing={{ xs: 1.25, sm: 2 }}>
          <Stack direction='row' alignItems='center' spacing={1.25}>
            <Tooltip
              title={
                isWide
                  ? navigationOpen
                    ? 'Collapse section navigation'
                    : 'Expand section navigation'
                  : 'Open section navigation'
              }>
              <IconButton
                onClick={handleNavigationToggle}
                aria-label={
                  isWide
                    ? navigationOpen
                      ? 'Collapse section navigation'
                      : 'Expand section navigation'
                    : 'Open section navigation'
                }
                aria-expanded={isWide ? navigationOpen : mobileNavigationOpen}
                sx={{
                  flexShrink: 0,
                  width: 'var(--ms-control-target-min)',
                  height: 'var(--ms-control-target-min)',
                  borderRadius: 'var(--ms-radius-xl)',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                }}>
                {isWide && navigationOpen ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
            </Tooltip>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant='overline'
                color='primary.main'
                fontWeight={800}
                letterSpacing={1.2}
                lineHeight={1.2}>
                README WORKSPACE
              </Typography>
              <Typography
                variant='h5'
                component='h1'
                fontWeight={800}
                letterSpacing='-.035em'
                sx={{ fontSize: { xs: '1.25rem', sm: '1.55rem' } }}>
                Build your README
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            spacing={1}
            useFlexGap
            flexWrap='wrap'
            sx={{ alignSelf: { xs: 'flex-end', sm: 'center' } }}>
            <Chip
              icon={<CheckCircleOutlineIcon />}
              label='Autosaved'
              size='small'
              variant='outlined'
              color='success'
              sx={{
                height: 30,
                bgcolor: 'action.hover',
                '& .MuiChip-icon': { fontSize: 17 },
              }}
            />
            <Button
              variant='outlined'
              color='inherit'
              size='small'
              startIcon={<DeleteOutlineIcon />}
              onClick={handleClearDraft}
              sx={{
                borderRadius: 'var(--ms-radius-xl)',
                minHeight: 34,
                px: 1.5,
              }}>
              Clear draft
            </Button>
          </Stack>
        </Stack>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mt: 1.25, ml: 7.5, lineHeight: 1.45 }}>
          Select sections, write in Markdown, and see your README take shape as
          you edit.
        </Typography>
      </Paper>

      <Box
        sx={{
          flex: 1,
          minHeight: { xs: 620, lg: 560 },
          display: 'grid',
          gridTemplateColumns:
            isWide && navigationOpen
              ? 'minmax(250px, 290px) minmax(0, 1fr)'
              : 'minmax(0, 1fr)',
          gap: { lg: 2, xl: 2.5 },
          alignItems: 'stretch',
        }}>
        {isWide && navigationOpen && (
          <Box sx={{ minWidth: 0, minHeight: 0 }}>
            <SectionSelector />
          </Box>
        )}
        <Box
          sx={{
            minWidth: 0,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Tabs
            value={activePane}
            onChange={(_, value) => setActivePane(value)}
            aria-label='README workspace view'
            sx={{
              display: { xs: 'flex', xl: 'none' },
              minHeight: 42,
              mb: 1.5,
              bgcolor: 'action.hover',
              borderRadius: 'var(--ms-radius-xl)',
              p: 0.5,
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTab-root': {
                minHeight: 38,
                flex: 1,
                borderRadius: 'var(--ms-radius-lg)',
                textTransform: 'none',
                fontWeight: 700,
              },
              '& .Mui-selected': {
                bgcolor: 'background.paper',
                boxShadow: 1,
              },
            }}>
            <Tab value='editor' label='Editor' />
            <Tab value='preview' label='Preview' />
          </Tabs>
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'minmax(0, 1fr)',
                xl: 'repeat(2, minmax(0, 1fr))',
              },
              gap: 2,
              '& > *': { minHeight: 0 },
            }}>
            <Box
              sx={{
                minWidth: 0,
                minHeight: 0,
                display: {
                  xs: activePane === 'editor' ? 'flex' : 'none',
                  xl: 'flex',
                },
              }}>
              <MarkdownEditor
                value={markdown}
                onChange={handleMarkdownChange}
              />
            </Box>
            <Box
              sx={{
                minWidth: 0,
                minHeight: 0,
                display: {
                  xs: activePane === 'preview' ? 'flex' : 'none',
                  xl: 'flex',
                },
              }}>
              <MarkdownPreview markdown={markdown} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor='left'
        open={mobileNavigationOpen}
        onClose={() => setMobileNavigationOpen(false)}
        PaperProps={{
          sx: {
            width: 'min(88vw, 360px)',
            p: 2,
            pt: 3,
          },
        }}>
        <SectionSelector />
      </Drawer>
    </Box>
  );
};

export default MarkdownLayout;
