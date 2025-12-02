import React from 'react';
import './popular.css';

export function Popular() {
  const [mostCommonEmotion, setMostCommonEmotion] = React.useState(null);

React.useEffect(() => {
  fetch('/api/emotions/today')
    .then(res => res.json())
    .then(entries => {
      if (!entries || entries.length === 0) {
        setMostCommonEmotion(null);
        return;
      }

      const counts = {};
      for (const entry of entries) {
      counts[entry.emotion] = (counts[entry.emotion] || 0) + 1;
    }
    
    let maxCount = 0;
    let popularEmotion = null;
    for (const [emotion, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        popularEmotion = emotion;
      }
    }

    setMostCommonEmotion(popularEmotion);
    }) 
}, []); 

  const emotionIcons = {
    Happy: 'circle_placeholder.svg',
    Sad: 'placeholder.png',
    Angry: 'placeholder.png',
    Excited: 'placeholder.png',
    Tired: 'placeholder.png',
    Stressed: 'placeholder.png',
    Calm: 'placeholder.png',
    Anxious: 'placeholder.png',
    Content: 'placeholder.png',
    Bored: 'placeholder.png',
  };

  if (!mostCommonEmotion) {
    return (
      <main>
        <h2>No emotions recorded today yet!</h2>
      </main>
    );
  }

  return (
    <main>
      <img src={emotionIcons[mostCommonEmotion]} />
      <h2 className="caption">Today's most common emotion is {mostCommonEmotion}!</h2>
    </main>
  );
}
