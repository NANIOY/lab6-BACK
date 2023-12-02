const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { team, score } = req.body;

  console.log('Updating score:', team, score);

  res.json({ message: 'Score updated successfully' });
});

module.exports = router;