import { createContext, useContext } from 'react';

export const GithubThemeContext = createContext({
  flavor: 'cyberpunk',
  setFlavor: () => {},
  size: 'medium',
  setSize: () => {},
});
export const useGithubTheme = () => useContext(GithubThemeContext);
