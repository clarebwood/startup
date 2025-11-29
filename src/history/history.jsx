import React from "react";
import "./history.css";

export function History() {
  const year = new Date().getFullYear();

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
                      {day !== null && <span>{day}</span>}
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
