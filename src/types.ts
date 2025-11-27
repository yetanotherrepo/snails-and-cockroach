export interface SnailState {
    goal: string; // The "Snail" - what the user wants to do
    resistance: string; // The "Cockroach" - the negative effect
    justification: string; // Why the resistance exists
    analysis: AnalysisState;
}

export interface AnalysisState {
    currentStep: number;
    completed: boolean;
    // We can store specific flags for each check if needed, 
    // but for now we just track progress.
}

export type WizardStep = 'GOAL' | 'RESISTANCE' | 'JUSTIFICATION' | 'ANALYSIS' | 'RESULT';
