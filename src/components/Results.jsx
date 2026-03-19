import React from 'react';
import { getTranslation } from '../utils/i18n';
import { convertUnit } from '../utils/calculations';

export function Results({ dimensions, stepDetails, unit, lang }) {
  const t = (key) => getTranslation(lang, key);

  const formatValue = (value, sourceUnit = 'cm') => {
    const converted = convertUnit(value, sourceUnit, unit);
    return Math.round(converted * 10) / 10;
  };

  return (
    <div className="results">
      <h2>{t('results')}</h2>
      
      <div className="result-grid">
        <div className="result-item">
          <span className="label">{t('totalHeight')} (B):</span>
          <span className="value">{formatValue(dimensions.height, 'cm')} {unit}</span>
        </div>
        
        <div className="result-item">
          <span className="label">{t('totalLength')} (A):</span>
          <span className="value">{formatValue(dimensions.length, 'cm')} {unit}</span>
        </div>
        
        <div className="result-item">
          <span className="label">{t('hypotenusLength')} (C):</span>
          <span className="value">{formatValue(dimensions.hypotenuse, 'cm')} {unit}</span>
        </div>
        
        <div className="result-item">
          <span className="label">{t('angleA')}:</span>
          <span className="value">{Math.round(dimensions.angleA * 10) / 10}°</span>
        </div>
        
        <div className="result-item">
          <span className="label">{t('angleC')}:</span>
          <span className="value">{Math.round(dimensions.angleC * 10) / 10}°</span>
        </div>
      </div>

      {stepDetails && (
        <>
          <h3>{t('stepDetails')}</h3>
          <div className="result-grid">
            <div className="result-item">
              <span className="label">{t('risePerStep')}:</span>
              <span className="value">{formatValue(stepDetails.risePerStep, 'mm')} {unit}</span>
            </div>
            
            <div className="result-item">
              <span className="label">{t('runPerStep')}:</span>
              <span className="value">{formatValue(stepDetails.runPerStep, 'mm')} {unit}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
