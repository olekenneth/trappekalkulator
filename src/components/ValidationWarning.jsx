import React from 'react';
import { getTranslation } from '../utils/i18n';

export function ValidationWarning({ validation, lang }) {
  const t = (key) => getTranslation(lang, key);

  if (!validation) return null;

  return (
    <div className={`validation ${validation.valid ? 'valid' : 'invalid'}`}>
      <div className="validation-status">
        {validation.valid ? '✓' : '⚠'} {validation.valid ? t('tek17Compliant') : t('tek17NonCompliant')}
      </div>
      
      {validation.warnings.length > 0 && (
        <ul className="validation-warnings">
          {validation.warnings.map((warning, idx) => (
            <li key={idx}>{warning[lang]}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
