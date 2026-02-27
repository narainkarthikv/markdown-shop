import React, { useMemo } from 'react';
import EmbedButton from './EmbedButton';
import useMarkdownStore from '@/features/markdown/store/markdownStore';
import { getGithubUser } from '@/features/github/utils/githubUser';

const EmbedPanel = React.memo(() => {
  const userName = useMarkdownStore((state) => state.userName);
  const resolvedUserName = getGithubUser(userName);
  const embeds = useMemo(
    () => [
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
      {
        label: 'GitHub Trophies',
        embedContent: `<img src="https://github-profile-trophy.vercel.app/?username=${resolvedUserName}&theme=tokyonight&no-frame=true&margin-w=15&margin-h=15" alt="GitHub Trophies" />`,
      },
    ],
    [resolvedUserName]
  );

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
