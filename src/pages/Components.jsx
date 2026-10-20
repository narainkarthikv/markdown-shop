import React from 'react';
import GithubSection from '@/features/github/GithubSection';
import ComponentsLayout from '@/features/components/ComponentsLayout';

const Components = () => (
  <ComponentsLayout>
    <GithubSection />
  </ComponentsLayout>
);

export default React.memo(Components);
