import Link from 'next/link';
import { Button } from 'shadcn'; // Assuming you're using ShadCn's Button component

export default function OAuthPage() {
  const slackOAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=users:read&redirect_uri=https://your-app.com/oauth/callback`;

  return (
    <div className="flex justify-center items-center h-screen">
      <Link href={slackOAuthUrl}>
        <Button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-500">
          Add to Slack
        </Button>
      </Link>
    </div>
  );
}
