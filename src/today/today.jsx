import React from 'react';
import './today.css';




export function Today() {
  const [selectedEmotion, setSelectedEmotion] = React.useState('');


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


    const today = new Date().toISOString().split("T")[0];
    const entry = {
      date: today,
      emotion,
    };

    const stored = JSON.parse(localStorage.getItem("emotionLog") || "[]");
    stored.push(entry);
    localStorage.setItem("emotionLog", JSON.stringify(stored));



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