import React from 'react';
import './popular.css';
import { Notifier } from '../../service/Notifier';

export function Popular() {
  const [entries, setEntries] = React.useState([]);
  const [mostCommonEmotion, setMostCommonEmotion] = React.useState(null);
  const [recent, setRecent] = React.useState([]);

React.useEffect(() => {
  fetch('/api/emotions/today')
    .then(res => res.json())
      .then(data => {
        setEntries(data);
        setMostCommonEmotion(getMostCommon(data));
    }) 
}, []);

  function getMostCommon(list) {
    if (!list || list.length === 0) {
        setMostCommonEmotion(null);
        return;
      }

     const counts = {};
      for (const entry of list) {
      counts[entry.emotion] = (counts[entry.emotion] || 0) + 1;
    }

    let popularEmotion = null;
    let maxCount = 0;
    for (const [emotion, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        popularEmotion = emotion;
      }
    }
    return popularEmotion;
  }

  React.useEffect(() => {
    function handleEvent(event) {
      const today = new Date().toISOString().split("T")[0];
      if (event.from !== today) return;

      setRecent(prev => [...prev, event.value]);

      const updated = [...entries, { emotion: event.value }];
      setEntries(updated);
      setMostCommonEmotion(getMostCommon(updated));
    }

    Notifier.addHandler(handleEvent);
    return () => Notifier.removeHandler(handleEvent);
  }, [entries]);

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

  function createLiveEmotionArray(recent) {
  const items = [];

  for (const [i, emotion] of recent.entries()) {
    items.push(
      <div key={i}>
        <span>Someone is feeling </span>
        <span>{emotion}</span>
        <span>!</span>
      </div>
    );
  }

  return items;
}

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


    <div>
      {createLiveEmotionArray(recent)}
    </div>

    </main>
  );
}