/**
 * TEK17 validation for Norwegian building regulations
 * https://dibk.no/regelverk/byggteknisk-forskrift-tek17/
 */

const TEK17_LIMITS = {
  minRise: 170, // mm
  maxRise: 210, // mm
  minRun: 250,  // mm
};

/**
 * Validate step dimensions against TEK17
 * @param {number} rise - Rise per step in mm
 * @param {number} run - Run per step in mm
 * @returns {object} - {valid, riseValid, runValid, warnings}
 */
export function validateTEK17(rise, run) {
  const riseValid = rise >= TEK17_LIMITS.minRise && rise <= TEK17_LIMITS.maxRise;
  const runValid = run >= TEK17_LIMITS.minRun;
  
  const warnings = [];
  
  if (!riseValid) {
    warnings.push({
      field: 'rise',
      no: `Stigehøyde må være ${TEK17_LIMITS.minRise}-${TEK17_LIMITS.maxRise} mm (nå: ${Math.round(rise)} mm)`,
      en: `Rise must be ${TEK17_LIMITS.minRise}-${TEK17_LIMITS.maxRise} mm (current: ${Math.round(rise)} mm)`
    });
  }
  
  if (!runValid) {
    warnings.push({
      field: 'run',
      no: `Innsteg må være minst ${TEK17_LIMITS.minRun} mm (nå: ${Math.round(run)} mm)`,
      en: `Run must be at least ${TEK17_LIMITS.minRun} mm (current: ${Math.round(run)} mm)`
    });
  }
  
  return {
    valid: riseValid && runValid,
    riseValid,
    runValid,
    warnings
  };
}

export { TEK17_LIMITS };
