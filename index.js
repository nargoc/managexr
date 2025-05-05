const express = require("express");
const axios = require("axios");
const base64 = require("base-64");
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY_ID = process.env.MANAGEXR_ID;
const API_KEY_SECRET = process.env.MANAGEXR_SECRET;

app.get("/devices", async (req, res) => {
  const { orgId, page = 1, limit = 10 } = req.query;

  if (!orgId || !API_KEY_ID || !API_KEY_SECRET) {
    return res.status(400).json({ error: "Missing orgId or API credentials" });
  }

  const auth = base64.encode(`${API_KEY_ID}:${API_KEY_SECRET}`);
  const url = `https://api.managexr.com/organizations/${orgId}/devices?page=${page}&limit=${limit}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const { data = [], pagination = {} } = response.data;

    const filtered = data.map((d) => ({
      id: d.id,
      name: d.name,
      status: d.status,
      lastSeen: d.lastSeen,
    }));

    return res.json({ data: filtered, pagination });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to fetch from ManageXR" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});