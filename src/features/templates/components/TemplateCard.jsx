import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import CardContainer from '@/components/ui/CardContainer';
import TemplateActions from '@/components/ui/TemplateActions';

const TemplateCard = ({
  template,
  index,
  selectedIdx,
  copiedIdx,
  onUseTemplate,
  onCopy,
}) => {
  const isSelected = selectedIdx === index;
  const isCopied = copiedIdx === index;

  return (
    <CardContainer
      component='article'
      itemScope
      itemType='https://schema.org/CreativeWork'
      aria-label={`Template: ${template.label}`}>
      <Typography variant='h6' sx={{ mb: 1 }} itemProp='name'>
        {template.label}
      </Typography>

      <Typography
        variant='body2'
        color='text.secondary'
        sx={{ mb: 2, minHeight: 40 }}
        itemProp='description'>
        {template.description}
      </Typography>

      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <TemplateActions
          onPreview={undefined}
          onCopy={() => onCopy(template.content, index)}
          onUse={() => onUseTemplate(template.content, index)}
          copied={isCopied}
          isSelected={isSelected}
        />
      </Box>
    </CardContainer>
  );
};

TemplateCard.propTypes = {
  template: PropTypes.shape({
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  selectedIdx: PropTypes.number,
  copiedIdx: PropTypes.number,
  onUseTemplate: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};

export default React.memo(TemplateCard);
