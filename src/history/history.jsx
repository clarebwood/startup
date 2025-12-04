import React from "react";
import "./history.css";

export function History() {
  const [entries, setEntries] = React.useState([]);
  const year = new Date().getFullYear();

React.useEffect(() => {
  fetch("/api/emotions")
    .then((res) => res.json())
    .then((data) => setEntries(data))

}, []);

  const entryMap = {};
  for (const e of entries) {
    entryMap[e.date] = e.emotion;
  }

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

  function buildMonth(monthIndex) {
    const firstDay = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const monthName = firstDay.toLocaleString("default", { month: "long" });

    const weeks = [];
    let currentWeek = Array(firstDay.getDay()).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }

    return (
      <section key={monthIndex}>
        <h2>{monthName}</h2>

        <table>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => (
                  <td key={di}>
                    <div>
                        {day !== null && (() => {
                            const isoDate = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            const emotion = entryMap[isoDate];
                            const icon = emotion ? emotionIcons[emotion] : "history_pink.png";

                            return <img src={icon} />;
                        })()}
                        </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  return (
    <main>
      {Array.from({ length: 12 }, (_, i) => buildMonth(i))}
    </main>
  );
}
