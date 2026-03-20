import React from 'react';
import { convertUnit } from '../utils/calculations';

export function StairDiagram({ dimensions, steps, unit }) {
  // SVG viewport dimensions
  const width = 800;
  const height = 500;
  const margin = 80;

  // Calculate scale to fit the triangle in viewport
  const availableWidth = width - 2 * margin;
  const availableHeight = height - 2 * margin;
  const scaleX = availableWidth / dimensions.length;
  const scaleY = availableHeight / dimensions.height;
  const scale = Math.min(scaleX, scaleY);

  // Scaled dimensions
  const scaledLength = dimensions.length * scale;
  const scaledHeight = dimensions.height * scale;

  // Triangle points (origin at bottom-left)
  const baseY = height - margin;
  const baseX = margin;
  
  const points = {
    bottom: { x: baseX, y: baseY }, // Bottom-left (B)
    top: { x: baseX, y: baseY - scaledHeight }, // Top-left
    right: { x: baseX + scaledLength, y: baseY } // Bottom-right (A)
  };

  // Format value for display
  const formatValue = (value) => {
    const converted = convertUnit(value, 'cm', unit);
    return Math.round(converted * 10) / 10;
  };

  // Calculate step positions if steps are defined
  const stepLines = [];
  if (steps > 0) {
    const risePerStep = dimensions.height / steps;
    const runPerStep = dimensions.length / steps;
    
    // Steps should lie on top of hypotenuse C, starting from top going down
    for (let i = 0; i < steps; i++) {
      const currentHeight = i * risePerStep * scale;
      const nextHeight = (i + 1) * risePerStep * scale;
      const currentLength = i * runPerStep * scale;
      const nextLength = (i + 1) * runPerStep * scale;
      
      // Vertical riser (opptrinn) - down from current position
      stepLines.push({
        type: 'vertical',
        x1: baseX + currentLength,
        y1: points.top.y + currentHeight,
        x2: baseX + currentLength,
        y2: points.top.y + nextHeight,
      });
      
      // Horizontal tread (innsteg) - to the right
      stepLines.push({
        type: 'horizontal',
        x1: baseX + currentLength,
        y1: points.top.y + nextHeight,
        x2: baseX + nextLength,
        y2: points.top.y + nextHeight,
      });
    }
  }

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      className="stair-diagram"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Triangle outline */}
      <polygon
        points={`${points.bottom.x},${points.bottom.y} ${points.top.x},${points.top.y} ${points.right.x},${points.right.y}`}
        fill="none"
        stroke="#333"
        strokeWidth="2"
      />

      {/* Step lines */}
      {stepLines.map((line, idx) => (
        <line
          key={idx}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#666"
          strokeWidth="1.5"
        />
      ))}

      {/* Dimension lines and labels */}
      
      {/* Height (B) - left side */}
      <line
        x1={baseX - 20}
        y1={baseY}
        x2={baseX - 20}
        y2={points.top.y}
        stroke="#999"
        strokeWidth="1"
        markerStart="url(#arrowhead)"
        markerEnd="url(#arrowhead)"
      />
      <text
        x={baseX - 30}
        y={(baseY + points.top.y) / 2}
        textAnchor="end"
        className="dimension-label"
      >
        B: {formatValue(dimensions.height)} {unit}
      </text>

      {/* Length (A) - bottom */}
      <line
        x1={baseX}
        y1={baseY + 20}
        x2={points.right.x}
        y2={baseY + 20}
        stroke="#999"
        strokeWidth="1"
        markerStart="url(#arrowhead)"
        markerEnd="url(#arrowhead)"
      />
      <text
        x={(baseX + points.right.x) / 2}
        y={baseY + 40}
        textAnchor="middle"
        className="dimension-label"
      >
        A: {formatValue(dimensions.length)} {unit}
      </text>

      {/* Hypotenuse (C) - diagonal */}
      <text
        x={(points.top.x + points.right.x) / 2 + 10}
        y={(points.top.y + points.right.y) / 2}
        textAnchor="middle"
        className="dimension-label"
      >
        C: {formatValue(dimensions.hypotenuse)} {unit}
      </text>

      {/* Angles */}
      <text
        x={baseX + 40}
        y={baseY - 10}
        className="angle-label"
      >
        ∠A: {Math.round(dimensions.angleA * 10) / 10}°
      </text>

      <text
        x={points.right.x - 40}
        y={baseY - 10}
        className="angle-label"
      >
        ∠C: {Math.round(dimensions.angleC * 10) / 10}°
      </text>

      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="5"
          orient="auto"
        >
          <polygon points="0 0, 10 5, 0 10" fill="#999" />
        </marker>
      </defs>
    </svg>
  );
}
