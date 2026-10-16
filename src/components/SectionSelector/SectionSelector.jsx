import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Tooltip,
  IconButton,
  Divider,
  Collapse,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useShopStore, selectSelectedSections } from '@/store/useShopStore';
import sectionPresets from '@/assets/data/sectionPresets.json';
import { motion, AnimatePresence } from 'framer-motion';

const SectionSelector = () => {
  const [expanded, setExpanded] = useState(true);
  const selectedSections = useShopStore(selectSelectedSections);
  const { toggleSection, clearSections } = useShopStore();

  const availableSections = useMemo(() => sectionPresets.sections, []);

  const selectedCount = selectedSections.length;

  const handleToggleSection = (sectionId) => {
    toggleSection(sectionId);
  };

  const handleClearAll = () => {
    clearSections();
  };

  const handleToggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          bgcolor: 'action.hover',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 'var(--ms-radius-md)',
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={handleToggleExpanded}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
              <ExpandMoreIcon sx={{ color: 'primary.main' }} />
            </motion.div>
            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
              📝 Template Sections
            </Typography>
            <Chip
              label={`${selectedCount} selected`}
              size='small'
              variant='filled'
              color={selectedCount > 0 ? 'primary' : 'default'}
            />
          </Box>
          {selectedCount > 0 && (
            <Tooltip title='Clear all sections'>
              <IconButton
                size='small'
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                sx={{ color: 'error.main' }}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Collapse in={expanded} timeout='auto'>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={1}>
            <Typography
              variant='caption'
              sx={{ color: 'text.secondary', ml: 0.5 }}>
              Click to toggle sections • Selected sections appear in your README
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <AnimatePresence mode='wait'>
                {availableSections.map((section) => {
                  const isSelected = selectedSections.includes(section.id);
                  return (
                    <motion.div
                      key={section.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}>
                      <Tooltip title={section.description}>
                        <Chip
                          icon={<AddIcon />}
                          label={`${section.icon} ${section.name}`}
                          onClick={() => handleToggleSection(section.id)}
                          variant={isSelected ? 'filled' : 'outlined'}
                          color={isSelected ? 'primary' : 'default'}
                          sx={{
                            fontWeight: isSelected ? 600 : 400,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: 1,
                            },
                          }}
                        />
                      </Tooltip>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </Box>
          </Stack>
        </Collapse>
      </Paper>
    </motion.div>
  );
};

export default React.memo(SectionSelector);
