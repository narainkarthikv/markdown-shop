import GithubNativePanel from './GithubNativePanel';
const NAME = 'streak';
export default function GithubComponent() {
  return <GithubNativePanel kind={NAME} title='Contribution Streak' />;
}
