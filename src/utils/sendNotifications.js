
async function sendNotification({ playerIds, title, message, data = {} }) {
  const fetch = (await import('node-fetch')).default;
  const appId = process.env.ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;

  return fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app_id: appId,
      include_player_ids: playerIds,
      headings: { en: title },
      contents: { en: message },
      data
    })
  });
}

module.exports = sendNotification;