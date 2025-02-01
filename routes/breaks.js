const express = require('express');
const router = express.Router();
const Break = require('../db/models/Break');
const knex = Break.knex();

router.post('/breaks', async (req, res) => {
    try {
      const newBreak = await Break.query().insert({
        deviceId: req.body.deviceId,
        type: req.body.type,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      });
      res.status(201).json(newBreak);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get('/breaks', async (req, res) => {
    const { deviceId } = req.query;
    try {
      const breaks = await Break.query()
        .where('deviceId', deviceId)
        .orderBy('startTime', 'desc')
        .limit(50);
      res.json(breaks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/stats', async (req, res) => {
  try {
    const stats = await Break.query()
      .groupBy('type')
      .select('type')
      .select(knex.raw('COUNT(*) as totalBreaks'))
      .select(knex.raw('SUM(TIMESTAMPDIFF(SECOND, startTime, endTime)) as totalDuration'));

    const last24Hours = await Break.query()
      .where('startTime', '>=', new Date(Date.now() - 24 * 60 * 60 * 1000))
      .count('* as totalBreaks');

    res.json({
      breaksByType: stats,
      last24Hours
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/breaks/:deviceId', async (req, res) => {
  try {
    const { deviceId } = req.params;

    await Break.query()
      .delete()
      .where('deviceId', deviceId);

    res.json({ message: 'All data deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;