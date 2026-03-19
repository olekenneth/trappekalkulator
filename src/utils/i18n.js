/**
 * Internationalization strings
 */

export const translations = {
  no: {
    title: 'Trappekalkulator',
    subtitle: 'Beregn trappegeometri med Pythagoras',
    
    // Input labels
    hypotenuse: 'Trappevange (C)',
    angle: 'Stigningsvinkel (∠A)',
    steps: 'Antall trinn',
    
    // Advanced mode
    advancedMode: 'Avansert modus',
    height: 'Totalhøyde (B)',
    length: 'Totallengde (A)',
    
    // Results
    results: 'Resultater',
    totalHeight: 'Totalhøyde',
    totalLength: 'Totallengde',
    hypotenusLength: 'Trappevange',
    angleA: 'Vinkel A',
    angleC: 'Vinkel C',
    
    // Step details
    stepDetails: 'Trinndetaljer',
    risePerStep: 'Stigehøyde per trinn',
    runPerStep: 'Innsteg per trinn',
    
    // Validation
    tek17Compliant: 'TEK17-godkjent',
    tek17NonCompliant: 'Ikke godkjent iht. TEK17',
    
    // Units
    degrees: 'grader',
    
    // Print
    printButton: 'Skriv ut',
    
    // Placeholders
    enterValue: 'Oppgi verdi',
    optional: 'valgfritt'
  },
  
  en: {
    title: 'Stair Calculator',
    subtitle: 'Calculate stair geometry using Pythagoras',
    
    // Input labels
    hypotenuse: 'Stair Stringer (C)',
    angle: 'Rise Angle (∠A)',
    steps: 'Number of Steps',
    
    // Advanced mode
    advancedMode: 'Advanced Mode',
    height: 'Total Height (B)',
    length: 'Total Length (A)',
    
    // Results
    results: 'Results',
    totalHeight: 'Total Height',
    totalLength: 'Total Length',
    hypotenusLength: 'Stair Stringer',
    angleA: 'Angle A',
    angleC: 'Angle C',
    
    // Step details
    stepDetails: 'Step Details',
    risePerStep: 'Rise per Step',
    runPerStep: 'Run per Step',
    
    // Validation
    tek17Compliant: 'TEK17 Compliant',
    tek17NonCompliant: 'Not TEK17 Compliant',
    
    // Units
    degrees: 'degrees',
    
    // Print
    printButton: 'Print',
    
    // Placeholders
    enterValue: 'Enter value',
    optional: 'optional'
  }
};

export function getTranslation(lang, key) {
  const translation = translations[lang] || translations.en;
  return translation[key] || key;
}
