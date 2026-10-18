import GithubNativePanel from './GithubNativePanel';
const NAME = 'commits';
export default function GithubComponent() {
  return <GithubNativePanel kind={NAME} title='Recent Commit Activity' />;
}
