import React from 'react';
import './today.css';
import { Notifier } from '../../service/Notifier';



export function Today() {
  const [selectedEmotion, setSelectedEmotion] = React.useState('');
  const userName = localStorage.getItem("username");



  const emotions = [
    "Happy",
    "Sad",
    "Angry",
    "Excited",
    "Tired",
    "Stressed",
    "Calm",
    "Anxious",
    "Content",
    "Bored",
    "Dead",
    "Confused",
    "Uncomfortable",
    "Cheerful",
    "Wonder",
    "Suprised",
    "Bashful",
    "Sorrowful",
    "Silly",
    "Dissapointed",
  ];

  const emotionIcons = {
    Happy: 'happy.svg',
    Sad: 'sad.svg',
    Angry: 'angry.svg',
    Excited: 'excited.svg',
    Tired: 'tired.svg',
    Stressed: 'stressed.svg',
    Calm: 'calm.svg',
    Anxious: 'anxious.svg',
    Content: 'content.svg',
    Bored: 'bored.svg',
    Dead: 'dead.svg',
    Confused: 'confused.svg',
    Uncomfortable: 'uncomfortable.svg',
    Cheerful: 'cheerful.svg',
    Wonder: 'wonder.svg',
    Suprised: 'suprised.svg',
    Bashful: 'bashful.svg',
    Sorrowful: 'sorrowful.svg',
    Silly: 'silly.svg',
    Dissapointed: 'dissapointed.svg',
  };

    async function handleEmotionClick(emotion) {
    setSelectedEmotion(emotion);



    const date = new Date().toISOString().split('T')[0];
    const newEntry = { user: userName, emotion, date };

    await fetch('/api/emotion', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newEntry),
    })

    Notifier.broadcastEvent(date, emotion);

    }
  
  
  return (
    <main className="today-container">

      <div className="emotion-list">
        {emotions.map((emotion) => (
          <button
            className="emo-button"
            key={emotion}
            onClick={() => handleEmotionClick(emotion)}
          >
             <img src={emotionIcons[emotion]} />
            <div className="emotion-label">{emotion}</div>
          </button>
        ))}
      </div>

      {selectedEmotion && (
        <div>
          <h2>You're feeling {selectedEmotion.toLowerCase()}. </h2>
        </div>
      )}
    </main>
  );
}