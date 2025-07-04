const callsService = require('../utils/callService');
const sendNotification = require('../utils/sendNotifications');

async function createCall(req, res) {
    try {
      // console.log('Request body:', req.body);
      // const call = await callsService.createCall(req.body);
      // console.log('Call created:', call);
  
      // const playerId = await callsService.getPlayerIdForUser(req.body.callee_id);
      // console.log('Player ID:', playerId);
  
      // const buttons = [
      //   { id: 'answer', text: 'Answer' },
      //   { id: 'hangup', text: 'Hang up' }
      // ];
  
      // if (playerId) {
      //   await sendNotification({
      //     playerIds: [playerId],
      //     title: 'Incoming Call',
      //     message: `You have a call from user ${call.caller_id}`,
      //     data: { callId: call.id },
      //     buttons
      //   });
      //   console.log('Notification sent');
      // }
  
      res.status(201).json(null);
    } catch (error) {
      console.error('Error in createCall:', error);
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