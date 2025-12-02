const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const emotionCollection = db.collection('emotion');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function addEmotion(entry) {
  return emotionCollection.insertOne(entry);
}

function getEmotions(username) {
  return emotionCollection.find({user: username}).toArray();
}

function getTodayEmotions() {
  const today = new Date().toISOString().split('T')[0];
  return emotionCollection.find({ date: today }).toArray();
}


module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addEmotion,
  getEmotions,
  getTodayEmotions,
};
