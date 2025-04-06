import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.query; // This is the authorization code Slack sends to your redirect URL

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  const slackOAuthUrl = 'https://slack.com/api/oauth.v2.access';
  const clientId = process.env.SLACK_CLIENT_ID;
  const clientSecret = process.env.SLACK_CLIENT_SECRET;
  const redirectUri = 'https://localhost:3001/oauth/callback'; // Should match your redirect URL in Slack settings

  try {
    const response = await axios.post(slackOAuthUrl, null, {
      params: {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      },
    });

    if (!response.data.ok) {
      return res.status(500).json({ error: 'Failed to exchange code for access token' });
    }

    // You can save the token in the session or database here
    const { access_token } = response.data;

    res.status(200).json({ message: 'OAuth successful', access_token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
