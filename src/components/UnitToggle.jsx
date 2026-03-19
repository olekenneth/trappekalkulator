import React from 'react';

export function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit-toggle">
      <button
        className={unit === 'cm' ? 'active' : ''}
        onClick={() => onChange('cm')}
      >
        cm
      </button>
      <button
        className={unit === 'mm' ? 'active' : ''}
        onClick={() => onChange('mm')}
      >
        mm
      </button>
    </div>
  );
}
