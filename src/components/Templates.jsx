import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  Fade,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import templatesData from '../assets/data/templates.json';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMarkdownStore from '@/features/markdown/store/markdownStore';

const getCategories = (templates) => {
  const cats = templates.map((tpl) => tpl.category || 'Other');
  return Array.from(new Set(cats));
};

const Templates = () => {
  const navigate = useNavigate();
  const { setMarkdown } = useMarkdownStore();
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    setTemplates(templatesData);
  }, []);

  const theme = useTheme();
  const categories = ['All', ...getCategories(templates)];

  const filteredTemplates = (() => {
    let filtered = templates;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((tpl) => tpl.category === selectedCategory);
    }
    if (search.trim()) {
      filtered = filtered.filter(
        (tpl) =>
          tpl.label.toLowerCase().includes(search.toLowerCase()) ||
          tpl.description.toLowerCase().includes(search.toLowerCase()) ||
          (tpl.content &&
            tpl.content.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return filtered;
  })();

  const handleCopy = async (content, idx) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      alert('Failed to copy!');
    }
  };

  const handleUseTemplate = (content, idx) => {
    setMarkdown(content);
    setSelectedIdx(idx);
    navigate('/shop');
    setTimeout(() => setSelectedIdx(null), 1500);
  };

  return (
    <Box sx={{ mt: 4, maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 } }}>
      <Typography
        variant='h4'
        sx={{
          mb: 3,
          textAlign: 'center',
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}>
        README.md Templates
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mb: 2,
          justifyContent: 'center',
        }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            color={selectedCategory === cat ? 'primary' : 'default'}
            onClick={() => setSelectedCategory(cat)}
            clickable
            sx={{ fontWeight: selectedCategory === cat ? 700 : 400 }}
          />
        ))}
      </Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <TextField
          variant='outlined'
          placeholder='Search templates...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: '100%', sm: 400 } }}
        />
      </Box>
      <Grid container spacing={3} justifyContent='center' alignItems='stretch'>
        {filteredTemplates.length === 0 && (
          <Grid item xs={12}>
            <Typography variant='body1' color='text.secondary' align='center'>
              No templates found.
            </Typography>
          </Grid>
        )}
        {filteredTemplates.map((tpl, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={tpl.label}
            sx={{ display: 'flex' }}>
            <Fade in timeout={400} style={{ width: '100%' }}>
              <Card
                sx={{
                  width: '100%',
                  minWidth: 280,
                  maxWidth: 400,
                  minHeight: 340,
                  height: { xs: 340, sm: 380 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  border: selectedIdx === idx ? 2 : 1,
                  borderColor:
                    selectedIdx === idx ? 'primary.main' : 'grey.300',
                  boxShadow: selectedIdx === idx ? 6 : 1,
                  transition: 'box-shadow 0.2s, border-color 0.2s',
                  m: 'auto',
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 8,
                    borderColor: 'primary.light',
                  },
                }}
                onClick={() => setSelectedIdx(idx)}
                tabIndex={0}
                aria-selected={selectedIdx === idx}>
                {/* Header actions always at the top */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    pt: 2,
                    pb: 1,
                    bgcolor: 'background.paper',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '1.1rem', sm: '1.2rem' },
                      color: 'primary.main',
                    }}>
                    {tpl.label}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant={selectedIdx === idx ? 'contained' : 'outlined'}
                      color='primary'
                      size='small'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseTemplate(tpl.content, idx);
                      }}
                      sx={{
                        minWidth: 110,
                        fontWeight: 500,
                        borderRadius: 'var(--ms-radius-xl)',
                      }}>
                      {selectedIdx === idx ? 'Selected' : 'Use Template'}
                    </Button>
                    <Tooltip
                      title={
                        copiedIdx === idx ? 'Copied!' : 'Copy to clipboard'
                      }>
                      <span>
                        <IconButton
                          color={copiedIdx === idx ? 'success' : 'primary'}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(tpl.content, idx);
                          }}
                          tabIndex={-1}
                          size='small'
                          sx={{ borderRadius: 'var(--ms-radius-xl)' }}>
                          <ContentCopyIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </Box>
                <CardContent
                  sx={{
                    pt: 1,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}>
                  <Typography
                    variant='body2'
                    sx={{
                      mb: 2,
                      minHeight: 40,
                      color: theme.palette.text.secondary,
                    }}>
                    {tpl.description}
                  </Typography>
                  <Paper
                    variant='outlined'
                    sx={{
                      background: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      p: 2,
                      borderRadius: 'var(--ms-radius-xl)',
                      overflowX: 'auto',
                      touchAction: 'pan-x',
                      overscrollBehavior: 'contain',
                      fontSize: '0.95rem',
                      minHeight: 120,
                      maxHeight: 180,
                      mb: 1,
                      whiteSpace: 'pre-wrap',
                      flexGrow: 1,
                    }}>
                    {tpl.content}
                  </Paper>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Templates;
