import React, { useEffect, useState } from "react";

export default function GridLights() {
  const [boxes, setBoxes] = useState<number[]>([]);
  const [full, setFull] = useState(false);
  useEffect(() => {
    if (boxes.length === 0) {
      setFull(false);
      return;
    }
    let timer: number;
    console.log("boxes length", boxes.length);
    if (full) {
      timer = setInterval(() => {
        const newData = [...boxes];
        newData.pop();
        console.log("removing", newData);
        setBoxes(() => newData);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [boxes]);

  function handleClick(_e: React.MouseEvent<HTMLDivElement>, id: number) {
    if (boxes.includes(id) || full) return;
    setBoxes((prevBoxes) => [...prevBoxes, id]);
    if (boxes.length >= 7) {
      setFull(true);
    }
  }
  return (
    <div>
      <h2>Grid Lights Example</h2>
      <p>This is a placeholder for the Grid Lights component.</p>
      <main className="grid-container">
        <div
          className={`seq1 ${boxes.includes(1) ? "green" : ""}`}
          onClick={(e) => handleClick(e, 1)}
        ></div>
        <div
          className={`seq1 ${boxes.includes(2) ? "green" : ""}`}
          onClick={(e) => handleClick(e, 2)}
        ></div>
        <div
          className={`seq1 ${boxes.includes(3) ? "green" : ""}`}
          onClick={(e) => handleClick(e, 3)}
        ></div>

        <div
          className={`seq1 ${boxes.includes(4) ? "green" : ""}`}
          onClick={(e) => handleClick(e, 4)}
        ></div>
        <div className={`seq1 five ${boxes.includes(5) ? "green" : ""}`}></div>
        <div
          className={`seq1 ${boxes.includes(6) ? "green" : ""}`}
          onClick={(e) => handleClick(e, 6)}
        ></div>

        <div
          className={`seq1 ${boxes.includes(7) ? "green" : ""}`}
          onClick={(e) => handleClick(e, 7)}
        ></div>
        <div
          className={`seq1 ${boxes.includes(8) ? "green" : ""}`}
          onClick={(e) => handleClick(e, 8)}
        ></div>
        <div
          className={`seq1 ${boxes.includes(9) ? "green" : ""}`}
          onClick={(e) => handleClick(e, 9)}
        ></div>
      </main>
    </div>
  );
}
