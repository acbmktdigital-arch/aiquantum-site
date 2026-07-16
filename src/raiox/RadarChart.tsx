import React from "react";
import { CategoryScores } from "./types";
import { CATEGORIES_INFO } from "./data";

interface RadarChartProps {
  scores: CategoryScores;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  const cx = 160;
  const cy = 160;
  const r = 110;

  const categories = Object.keys(scores) as Array<keyof CategoryScores>;
  const numAxes = categories.length;

  // Calculate coordinates for grid lines and data points
  const getCoordinates = (index: number, valuePercentage: number) => {
    // Offset by Math.PI / 2 to start at the top
    const angle = (index * 2 * Math.PI) / numAxes - Math.PI / 2;
    const distance = r * (valuePercentage / 100);
    const x = cx + distance * Math.cos(angle);
    const y = cy + distance * Math.sin(angle);
    return { x, y };
  };

  // Generate background concentric rings (polygon grid)
  const gridLevels = [25, 50, 75, 100];
  const gridPaths = gridLevels.map((level) => {
    const points = [];
    for (let i = 0; i < numAxes; i++) {
      const { x, y } = getCoordinates(i, level);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  });

  // Generate spokes (axes radiating from center)
  const spokeLines = [];
  for (let i = 0; i < numAxes; i++) {
    const { x, y } = getCoordinates(i, 100);
    spokeLines.push({ x1: cx, y1: cy, x2: x, y2: y });
  }

  // Generate data polygon
  const dataPoints = categories.map((cat, i) => {
    const score = scores[cat];
    return getCoordinates(i, score);
  });
  const dataPathString = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 relative">
      <svg
        viewBox="0 0 320 340"
        className="w-full max-w-[340px] drop-shadow-[0_0_20px_rgba(109,40,217,0.15)]"
        id="radar-chart-svg"
      >
        <defs>
          <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Glow background behind radar */}
        <circle cx={cx} cy={cy} r={r} fill="url(#radar-glow)" />

        {/* Level Circles or Polygons as grid */}
        {gridPaths.map((points, index) => (
          <polygon
            key={index}
            points={points}
            fill="none"
            stroke="rgba(71, 85, 105, 0.18)"
            strokeWidth="1.2"
            strokeDasharray={index === 3 ? "0" : "3, 3"}
          />
        ))}

        {/* Axes lines (spokes) */}
        {spokeLines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(71, 85, 105, 0.22)"
            strokeWidth="1"
          />
        ))}

        {/* Grid Labels (25%, 50%, 75%, 100%) */}
        {gridLevels.map((level) => {
          const { x, y } = getCoordinates(0, level);
          return (
            <text
              key={level}
              x={x + 5}
              y={y + 12}
              fill="rgba(71, 85, 105, 0.7)"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {level}%
            </text>
          );
        })}

        {/* Filled polygon for actual scores */}
        <polygon
          points={dataPathString}
          fill="rgba(109, 40, 217, 0.18)"
          stroke="url(#score-gradient)"
          strokeWidth="3"
          filter="url(#glow-filter)"
        />

        {/* Score Vertex Circles (glowing dots) */}
        {dataPoints.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#6D28D9"
              opacity="0.25"
              className="animate-pulse"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#FFFFFF"
              stroke="#6D28D9"
              strokeWidth="2"
            />
          </g>
        ))}

        {/* Text Labels for each Axis/Area */}
        {categories.map((cat, i) => {
          const { x, y } = getCoordinates(i, 100);
          const labelInfo = CATEGORIES_INFO[cat];
          const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
          
          // Move labels slightly outward so they don't overlay vertices
          const offsetDistX = 22 * Math.cos(angle);
          const offsetDistY = 16 * Math.sin(angle);
          const finalX = x + offsetDistX;
          const finalY = y + offsetDistY;

          let textAnchor = "middle";
          if (Math.cos(angle) > 0.1) {
            textAnchor = "start";
          } else if (Math.cos(angle) < -0.1) {
            textAnchor = "end";
          }

          // Abbreviate or format label gracefully
          const formattedName = labelInfo.name.length > 20 
            ? labelInfo.name.substring(0, 18) + "..." 
            : labelInfo.name;

          return (
            <text
              key={cat}
              x={finalX}
              y={finalY + 4}
              fill="#CBD5E1"
              fontSize="9"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
              textAnchor={textAnchor}
            >
              {formattedName}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
