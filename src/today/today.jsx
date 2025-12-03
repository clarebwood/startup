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
  ];

    const emotionIcons = {
    Happy: "circle_placeholder.svg",
    Sad: "placeholder.png",
    Angry: "placeholder.png",
    Excited: "placeholder.png",
    Tired: "placeholder.png",
    Stressed: "placeholder.png",
    Calm: "placeholder.png",
    Anxious: "placeholder.png",
    Content: "placeholder.png",
    Bored: "placeholder.png",
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
          <h2>Emotion Selcted: {selectedEmotion}</h2>
        </div>
      )}
    </main>
  );
}