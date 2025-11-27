import React, { useState } from 'react';
import type { SnailState, WizardStep } from '../types';
import StepGoal from './StepGoal';
import StepResistance from './StepResistance';
import StepJustification from './StepJustification';
import StepAnalysis from './StepAnalysis';

const Wizard: React.FC = () => {
    const [step, setStep] = useState<WizardStep>('GOAL');
    const [state, setState] = useState<SnailState>({
        goal: '',
        resistance: '',
        justification: '',
        analysis: { currentStep: 0, completed: false }
    });

    const handleGoalSubmit = (goal: string) => {
        setState(prev => ({ ...prev, goal }));
        setStep('RESISTANCE');
    };

    const handleResistanceSubmit = (resistance: string) => {
        setState(prev => ({ ...prev, resistance }));
        setStep('JUSTIFICATION');
    };

    const handleJustificationSubmit = (justification: string) => {
        setState(prev => ({ ...prev, justification }));
        setStep('ANALYSIS');
    };

    const handleAnalysisComplete = () => {
        setStep('RESULT');
    };

    return (
        <div className="glass p-8 rounded-2xl shadow-2xl transition-all duration-500">
            {step === 'GOAL' && (
                <StepGoal
                    initialValue={state.goal}
                    onNext={handleGoalSubmit}
                />
            )}
            {step === 'RESISTANCE' && (
                <StepResistance
                    initialValue={state.resistance}
                    onNext={handleResistanceSubmit}
                    onBack={() => setStep('GOAL')}
                />
            )}
            {step === 'JUSTIFICATION' && (
                <StepJustification
                    initialValue={state.justification}
                    onNext={handleJustificationSubmit}
                    onBack={() => setStep('RESISTANCE')}
                />
            )}
            {step === 'ANALYSIS' && (
                <StepAnalysis
                    state={state}
                    onComplete={handleAnalysisComplete}
                    onBack={() => setStep('JUSTIFICATION')}
                />
            )}
            {step === 'RESULT' && (
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
                    <p className="text-xl mb-6">You have successfully analyzed your resistance.</p>
                    <div className="bg-white/10 p-6 rounded-xl text-left mb-6">
                        <p className="mb-2"><strong>Goal:</strong> {state.goal}</p>
                        <p className="mb-2"><strong>Resistance:</strong> {state.resistance}</p>
                        <p className="mb-2"><strong>Justification:</strong> {state.justification}</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-purple-100 transition-colors"
                    >
                        Start Over
                    </button>
                </div>
            )}
        </div>
    );
};

export default Wizard;
