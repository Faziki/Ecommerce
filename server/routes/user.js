const express = require("express");

const router = express.Router();

router.get("/user", async (req, res) => {
  res.json({
    data: " user api call success",
  });
});

module.exports = router;
