import TimeEntry from "../models/TimeEntry.js";
import User from "../models/User.js";
import Client from "../models/Client.js";

export const getStats = async (req, res) => {
  try {
    const entries = await TimeEntry.find().populate("user").populate("client");

    const totalMs = entries.reduce((sum, entry) => sum + entry.duration, 0);

    const byUser = [];
    const userMap = {};

    entries.forEach((entry) => {
      const name = entry.user.name;
      userMap[name] = (userMap[name] || 0) + entry.duration;
    });

    for (const name in userMap) {
      byUser.push({ name, total: userMap[name] });
    }

    const byClient = [];
    const clientMap = {};

    entries.forEach((entry) => {
      const name = entry.client.name;
      clientMap[name] = (clientMap[name] || 0) + entry.duration;
    });

    for (const name in clientMap) {
      byClient.push({ name, total: clientMap[name] });
    }

    res.json({ 
      totalMs, 
      byUser: byUser.length ? byUser : [], 
      byClient: byClient.length ? byClient : [] 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du calcul des statistiques" });
  }
};
