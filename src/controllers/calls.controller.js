const callsService = require('../utils/callService');
const sendNotification = require('../utils/sendNotifications');

async function createCall(req, res) {
  try {
    const call = await callsService.createCall(req.body);

    // Get callee's OneSignal player ID
    const playerId = await callsService.getPlayerIdForUser(call.callee_id);
    const buttons = [
        { id: 'answer', text: 'Answer' },
        { id: 'hangup', text: 'Hang up' }
      ];
      
    if (playerId) {
        await sendNotification({
            playerIds: [playerId],
            title: 'Incoming Call',
            message: `You have a call from user ${call.caller_id}`,
            data: { callId: call.id },
            buttons 
          });
    }

    res.status(201).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCallById(req, res) {
  try {
    const call = await callsService.getCallById(req.params.id);
    res.json(call);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = { createCall, getCallById };