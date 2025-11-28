import React from 'react';
import './today.css';


export function Today() {

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
  
  
  return (
      <main className="today-container">

      <div className="emotion-list">
        {emotions.map((emotion) => (
          <button className="emo-button" key={emotion}>
            <img src="placeholder.png"/>
            <div className="emotion-label">{emotion}</div>
          </button>
  ))}
</div>

    </main>
  );
}