import React from 'react';
import EmbedButton from './EmbedButton';

const EmbedPanel = React.memo(() => {
  const embeds = [
    {
      label: 'Ko-fi Badge',
      embedContent:
        '<a href="https://ko-fi.com/wisdom-fox" target="_blank"><img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white"></a>',
    },
    {
      label: 'Discord Badge',
      embedContent:
        '<a href="https://discord.gg/cb6tqTfk" target="_blank"><img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"></a>',
    },
  ];
  return (
    <div>
      <h4>Embed Badges/Icons</h4>
      {embeds.map((item) => (
        <EmbedButton key={item.label} {...item} />
      ))}
    </div>
  );
});
EmbedPanel.displayName = 'EmbedPanel';
export default EmbedPanel;
