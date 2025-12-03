import React, {
  useEffect,
  useRef,
  useState,
  memo,
  useCallback,
  type JSX,
} from "react";

const MAX_ACTIVE = 8; // threshold when auto-removal begins
const REMOVE_INTERVAL_MS = 1000;

export default function GridLights(): JSX.Element {
  const [boxes, setBoxes] = useState<number[]>([]);
  const [isAutoRemoving, setIsAutoRemoving] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // start/stop auto-removal when isAutoRemoving changes
  useEffect(() => {
    if (isAutoRemoving) {
      intervalRef.current = setInterval(() => {
        setBoxes((prev) => {
          if (prev.length === 0) {
            // stop when empty
            setIsAutoRemoving(false);
            return prev;
          }
          const next = prev.slice(0, -1); // remove last
          if (next.length === 0) {
            setIsAutoRemoving(false);
          }
          return next;
        });
      }, REMOVE_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoRemoving]);

  // safe click handler — uses functional updater to avoid stale closure
  const handleClick = useCallback(
    (id: number) => {
      setBoxes((prev) => {
        if (prev.includes(id) || isAutoRemoving) return prev;
        const next = [...prev, id];
        if (next.length >= MAX_ACTIVE) {
          setIsAutoRemoving(true);
        }
        return next;
      });
    },
    [isAutoRemoving]
  );

  return (
    <div className="gl-root">
      <h2 className="gl-title">Grid Lights</h2>
      <p className="gl-sub">
        Build a 3x3 grid of light cells (omitting the center cell) where you can
        click on the cells to activate them, turning them green. When all the
        cells have been activated, they will be deactivated one by one in the
        reverse order they were activated with a 300ms interval in between.
        {/* Click squares to light them. When {MAX_ACTIVE} lights are on, they will
        auto-clear. */}
      </p>

      <main className="grid-container" aria-label="Grid lights" role="grid">
        {/* render 9 boxes using small map */}
        {Array.from({ length: 9 }, (_, i) => {
          const id = i + 1;
          const active = boxes.includes(id);
          // center cell special (if you still want .five behavior)
          const extraClass = id === 5 ? "five" : "";

          return (
            <GridBox
              key={id}
              id={id}
              active={active}
              className={extraClass}
              onActivate={handleClick}
            />
          );
        })}
      </main>

      <div className="gl-controls">
        <button
          className="gl-btn"
          onClick={() => {
            setBoxes([]);
            setIsAutoRemoving(false);
          }}
        >
          Reset
        </button>
        <span className="gl-status">
          Active: <strong>{boxes.length}</strong>
          {isAutoRemoving ? " (Auto-removing…)" : ""}
        </span>
      </div>
    </div>
  );
}

/* memoized single box for performance */
type GridBoxProps = {
  id: number;
  active: boolean;
  className?: string;
  onActivate: (id: number) => void;
};

const GridBox = memo(function GridBox({
  id,
  active,
  className = "",
  onActivate,
}: GridBoxProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`Grid cell ${id}`}
      className={`seq1 ${active ? "green" : ""} ${className}`}
      onClick={() => onActivate(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate(id);
        }
      }}
    />
  );
});

// import React, { useEffect, useState } from "react";

// export default function GridLights() {
//   const [boxes, setBoxes] = useState<number[]>([]);
//   const [full, setFull] = useState(false);
//   useEffect(() => {
//     if (boxes.length === 0) {
//       setFull(false);
//       return;
//     }
//     let timer: number;
//     console.log("boxes length", boxes.length);
//     if (full) {
//       timer = setInterval(() => {
//         const newData = [...boxes];
//         newData.pop();
//         console.log("removing", newData);
//         setBoxes(() => newData);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [boxes]);

//   function handleClick(_e: React.MouseEvent<HTMLDivElement>, id: number) {
//     if (boxes.includes(id) || full) return;
//     setBoxes((prevBoxes) => [...prevBoxes, id]);
//     if (boxes.length >= 7) {
//       setFull(true);
//     }
//   }
//   return (
//     <div>
//       <h2>Grid Lights Example</h2>
//       <p>This is a placeholder for the Grid Lights component.</p>
//       <main className="grid-container">
//         <div
//           className={`seq1 ${boxes.includes(1) ? "green" : ""}`}
//           onClick={(e) => handleClick(e, 1)}
//         ></div>
//         <div
//           className={`seq1 ${boxes.includes(2) ? "green" : ""}`}
//           onClick={(e) => handleClick(e, 2)}
//         ></div>
//         <div
//           className={`seq1 ${boxes.includes(3) ? "green" : ""}`}
//           onClick={(e) => handleClick(e, 3)}
//         ></div>

//         <div
//           className={`seq1 ${boxes.includes(4) ? "green" : ""}`}
//           onClick={(e) => handleClick(e, 4)}
//         ></div>
//         <div className={`seq1 five ${boxes.includes(5) ? "green" : ""}`}></div>
//         <div
//           className={`seq1 ${boxes.includes(6) ? "green" : ""}`}
//           onClick={(e) => handleClick(e, 6)}
//         ></div>

//         <div
//           className={`seq1 ${boxes.includes(7) ? "green" : ""}`}
//           onClick={(e) => handleClick(e, 7)}
//         ></div>
//         <div
//           className={`seq1 ${boxes.includes(8) ? "green" : ""}`}
//           onClick={(e) => handleClick(e, 8)}
//         ></div>
//         <div
//           className={`seq1 ${boxes.includes(9) ? "green" : ""}`}
//           onClick={(e) => handleClick(e, 9)}
//         ></div>
//       </main>
//     </div>
//   );
// }
