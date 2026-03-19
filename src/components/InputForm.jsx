import React from 'react';
import { getTranslation } from '../utils/i18n';

export function InputForm({ state, updateState, lang }) {
  const t = (key) => getTranslation(lang, key);

  const handleChange = (field, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateState({ [field]: numValue });
    }
  };

  return (
    <div className="input-section">
      <div className="input-group">
        <label htmlFor="hypotenuse">
          {t('hypotenuse')} ({state.unit})
        </label>
        <input
          id="hypotenuse"
          type="number"
          value={state.c}
          onChange={(e) => handleChange('c', e.target.value)}
          step="1"
          min="1"
        />
      </div>

      <div className="input-group">
        <label htmlFor="angle">
          {t('angle')} (°)
        </label>
        <input
          id="angle"
          type="number"
          value={state.a}
          onChange={(e) => handleChange('a', e.target.value)}
          step="0.1"
          min="1"
          max="89"
        />
      </div>

      <div className="input-group">
        <label htmlFor="steps">
          {t('steps')}
        </label>
        <input
          id="steps"
          type="number"
          value={state.steps}
          onChange={(e) => handleChange('steps', e.target.value)}
          step="1"
          min="1"
        />
      </div>

      <div className="toggle-group">
        <label>
          <input
            type="checkbox"
            checked={state.advanced}
            onChange={(e) => updateState({ advanced: e.target.checked })}
          />
          {t('advancedMode')}
        </label>
      </div>

      {state.advanced && (
        <div className="advanced-inputs">
          <div className="input-group">
            <label htmlFor="height">
              {t('height')} ({state.unit}) <span className="optional">({t('optional')})</span>
            </label>
            <input
              id="height"
              type="number"
              value={state.height || ''}
              onChange={(e) => updateState({ height: e.target.value ? parseFloat(e.target.value) : null })}
              step="1"
              min="1"
              placeholder={t('enterValue')}
            />
          </div>

          <div className="input-group">
            <label htmlFor="length">
              {t('length')} ({state.unit}) <span className="optional">({t('optional')})</span>
            </label>
            <input
              id="length"
              type="number"
              value={state.length || ''}
              onChange={(e) => updateState({ length: e.target.value ? parseFloat(e.target.value) : null })}
              step="1"
              min="1"
              placeholder={t('enterValue')}
            />
          </div>
        </div>
      )}
    </div>
  );
}
