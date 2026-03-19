import React, { useMemo } from 'react';
import { InputForm } from './components/InputForm';
import { UnitToggle } from './components/UnitToggle';
import { Results } from './components/Results';
import { ValidationWarning } from './components/ValidationWarning';
import { StairDiagram } from './components/StairDiagram';
import { useUrlState } from './hooks/useUrlState';
import { useLanguage } from './hooks/useLanguage';
import {
  calculateFromHypotenuseAndAngle,
  calculateFromHeightAndAngle,
  calculateFromLengthAndAngle,
  calculateSteps,
  convertUnit
} from './utils/calculations';
import { validateTEK17 } from './utils/validation';
import { getTranslation } from './utils/i18n';
import './App.css';

function App() {
  const [state, updateState] = useUrlState();
  const lang = useLanguage();
  const t = (key) => getTranslation(lang, key);

  // Calculate dimensions based on input mode
  const dimensions = useMemo(() => {
    if (state.advanced) {
      // Advanced mode: allow overrides
      if (state.height !== null && state.height > 0) {
        // User specified height, recalc C
        return calculateFromHeightAndAngle(state.height, state.a);
      } else if (state.length !== null && state.length > 0) {
        // User specified length, recalc C
        return calculateFromLengthAndAngle(state.length, state.a);
      }
    }
    
    // Default: calculate from C and angle
    return calculateFromHypotenuseAndAngle(state.c, state.a);
  }, [state.c, state.a, state.advanced, state.height, state.length]);

  // Update C if advanced mode changes dimensions
  useMemo(() => {
    if (state.advanced && (state.height !== null || state.length !== null)) {
      if (Math.abs(dimensions.hypotenuse - state.c) > 0.1) {
        updateState({ c: Math.round(dimensions.hypotenuse * 10) / 10 });
      }
    }
  }, [dimensions.hypotenuse, state.c, state.advanced, state.height, state.length, updateState]);

  // Calculate step details
  const stepDetails = useMemo(() => {
    if (!state.steps || state.steps <= 0) return null;
    
    // Always work in mm for validation
    const heightMm = convertUnit(dimensions.height, 'cm', 'mm');
    const lengthMm = convertUnit(dimensions.length, 'cm', 'mm');
    
    return calculateSteps(heightMm, lengthMm, state.steps);
  }, [dimensions.height, dimensions.length, state.steps]);

  // Validate against TEK17
  const validation = useMemo(() => {
    if (!stepDetails) return null;
    return validateTEK17(stepDetails.risePerStep, stepDetails.runPerStep);
  }, [stepDetails]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app">
      <header className="no-print">
        <h1>{t('title')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
      </header>

      {/* Print-only header */}
      <div className="print-only print-header">
        <h1>{t('title')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
        <p style={{ marginTop: '0.5cm', fontSize: '10pt' }}>
          {new Date().toLocaleDateString(lang === 'no' ? 'nb-NO' : 'en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="container">
        <div className="controls no-print">
          <UnitToggle
            unit={state.unit}
            onChange={(unit) => updateState({ unit })}
          />

          <InputForm
            state={state}
            updateState={updateState}
            lang={lang}
          />

          <button className="print-button" onClick={handlePrint}>
            {t('printButton')}
          </button>
        </div>

        {/* Print-only input summary */}
        <div className="print-only" style={{ marginBottom: '1cm' }}>
          <h2 style={{ fontSize: '14pt', marginBottom: '0.5cm' }}>
            {lang === 'no' ? 'Inndata' : 'Input Parameters'}
          </h2>
          <div className="result-grid">
            <div className="result-item">
              <span className="label">{t('hypotenuse')} (C):</span>
              <span className="value">{state.c} {state.unit}</span>
            </div>
            <div className="result-item">
              <span className="label">{t('angle')} (∠A):</span>
              <span className="value">{state.a}°</span>
            </div>
            <div className="result-item">
              <span className="label">{t('steps')}:</span>
              <span className="value">{state.steps}</span>
            </div>
            {state.advanced && state.height !== null && (
              <div className="result-item">
                <span className="label">{t('height')} (B):</span>
                <span className="value">{state.height} {state.unit}</span>
              </div>
            )}
            {state.advanced && state.length !== null && (
              <div className="result-item">
                <span className="label">{t('length')} (A):</span>
                <span className="value">{state.length} {state.unit}</span>
              </div>
            )}
          </div>
        </div>

        <div className="output">
          <StairDiagram
            dimensions={dimensions}
            steps={state.steps}
            unit={state.unit}
          />

          <Results
            dimensions={dimensions}
            stepDetails={stepDetails}
            unit={state.unit}
            lang={lang}
          />

          {validation && (
            <ValidationWarning
              validation={validation}
              lang={lang}
            />
          )}
        </div>
      </div>

      {/* Print-only footer */}
      <div className="print-only print-footer">
        <p>trappekalkulator.no / staircalc.com</p>
      </div>
    </div>
  );
}

export default App;
