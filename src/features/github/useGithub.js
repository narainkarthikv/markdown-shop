import { useContext } from 'react';
import GithubContext from './GithubContext';
const useGithub = () => {
  const context = useContext(GithubContext);
  if (!context)
    throw new Error('useGithub must be used within GithubDataProvider');
  return context;
};
export default useGithub;
