import GithubNativePanel from './GithubNativePanel';
const NAME = 'repo';
export default function GithubComponent() {
  return <GithubNativePanel kind={NAME} title='Repository Summary' />;
}
