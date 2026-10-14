import GithubNativePanel from './GithubNativePanel';
const NAME = 'followers';
export default function GithubComponent() {
  return <GithubNativePanel kind={NAME} title='GitHub Followers' />;
}
