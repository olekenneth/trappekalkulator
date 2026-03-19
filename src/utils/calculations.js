/**
 * Staircase calculation utilities using Pythagoras theorem
 */

/**
 * Calculate triangle dimensions from hypotenuse (C) and angle A
 * @param {number} c - Hypotenuse length (stair stringer)
 * @param {number} angleA - Angle at bottom in degrees
 * @returns {object} - {height, length, angleC}
 */
export function calculateFromHypotenuseAndAngle(c, angleA) {
  const angleRad = (angleA * Math.PI) / 180;
  
  const height = c * Math.sin(angleRad); // B
  const length = c * Math.cos(angleRad); // A
  const angleC = 90 - angleA;
  
  return {
    height,
    length,
    angleC,
    hypotenuse: c,
    angleA
  };
}

/**
 * Calculate hypotenuse from height (B) and angle A
 * @param {number} height - Total height (B)
 * @param {number} angleA - Angle at bottom in degrees
 * @returns {object} - {hypotenuse, length, angleC}
 */
export function calculateFromHeightAndAngle(height, angleA) {
  const angleRad = (angleA * Math.PI) / 180;
  
  const hypotenuse = height / Math.sin(angleRad); // C
  const length = height / Math.tan(angleRad); // A
  const angleC = 90 - angleA;
  
  return {
    height,
    length,
    hypotenuse,
    angleC,
    angleA
  };
}

/**
 * Calculate hypotenuse from length (A) and angle A
 * @param {number} length - Total horizontal length (A)
 * @param {number} angleA - Angle at bottom in degrees
 * @returns {object} - {hypotenuse, height, angleC}
 */
export function calculateFromLengthAndAngle(length, angleA) {
  const angleRad = (angleA * Math.PI) / 180;
  
  const hypotenuse = length / Math.cos(angleRad); // C
  const height = length * Math.tan(angleRad); // B
  const angleC = 90 - angleA;
  
  return {
    height,
    length,
    hypotenuse,
    angleC,
    angleA
  };
}

/**
 * Calculate step dimensions
 * @param {number} height - Total height in mm
 * @param {number} length - Total length in mm
 * @param {number} steps - Number of steps
 * @returns {object} - {risePerStep, runPerStep}
 */
export function calculateSteps(height, length, steps) {
  if (!steps || steps <= 0) {
    return { risePerStep: 0, runPerStep: 0 };
  }
  
  return {
    risePerStep: height / steps,
    runPerStep: length / steps
  };
}

/**
 * Convert between cm and mm
 */
export function convertUnit(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  if (fromUnit === 'cm' && toUnit === 'mm') return value * 10;
  if (fromUnit === 'mm' && toUnit === 'cm') return value / 10;
  return value;
}
