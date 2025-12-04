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

  function createLiveEmotionArray(recent) {
  const items = [];

  for (const [i, emotion] of recent.entries()) {
    items.push(
      <div key={i}>
        <span>Someone is feeling </span>
        <span>{emotion.toLowerCase()}</span>
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
      <img className='popularImg' src={emotionIcons[mostCommonEmotion]} />
      <h2 className="caption">Today's most common emotion is {mostCommonEmotion.toLowerCase()}!</h2>


    <div className="caption">
      {createLiveEmotionArray(recent)}
    </div>

    </main>
  );
}