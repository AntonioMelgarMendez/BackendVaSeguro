async function sendNotification({
  playerIds,
  title,
  message,
  data = {},
  imageUrl,
  buttons = [],
  url,
  androidSound
}) {
  console.log("LLego hasta aca o algo");
  console.log('sendNotification called with:', JSON.stringify(args));
  const fetch = (await import('node-fetch')).default;
  const appId = process.env.ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;

  const payload = {
    app_id: appId,
    include_player_ids: playerIds,
    headings: { en: title },
    contents: { en: message },
    data,
  };

  if (imageUrl) payload.big_picture = imageUrl;
  if (buttons.length > 0) payload.buttons = buttons;
  if (url) payload.url = url;
  if (androidSound) payload.android_sound = androidSound;

  const response = await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const responseBody = await response.text();
  console.log('OneSignal response status:', response.status);
  console.log('OneSignal response body:', responseBody);

  if (!response.ok) {
    throw new Error(`OneSignal error: ${response.status} - ${responseBody}`);
  }

  return responseBody;
}

module.exports = sendNotification;