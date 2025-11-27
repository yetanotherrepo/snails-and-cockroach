import React, { useState } from 'react';
import type { SnailState } from '../types';

interface Props {
    state: SnailState;
    onComplete: () => void;
    onBack: () => void;
}

const CHECKS = [
    { id: 0, title: "Stop Words", description: "Does any part contain stop words?" },
    { id: 1, title: "Completeness", description: "Is the statement complete? (Who doing What with Whom)" },
    { id: 2, title: "Specificity", description: "Is 'Who' a specific person or group?" },
    { id: 3, title: "Single Thought", description: "Is there only one thought per statement?" },
    { id: 4, title: "Comparatives", description: "Are there numbers for comparisons?" },
    { id: 5, title: "Qualitatives", description: "Can you verify the properties?" },
    { id: 6, title: "Observability", description: "Is it an observable action?" },
    { id: 7, title: "Quantifiers", description: "Is the quantity clear?" },
    { id: 8, title: "Logical Flow", description: "Does the IF-THEN-BECAUSE flow make sense?" },
    { id: 9, title: "Tautology", description: "Is there any circular logic?" },
    { id: 10, title: "Causality", description: "Does the 'Because' explain the mechanism?" },
];

const StepAnalysis: React.FC<Props> = ({ state, onComplete, onBack }) => {
    const [currentCheck, setCurrentCheck] = useState(0);

    const handleNextCheck = () => {
        if (currentCheck < CHECKS.length - 1) {
            setCurrentCheck(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const renderCheckContent = () => {
        switch (currentCheck) {
            case 0:
                return (
                    <div>
                        <p className="mb-4">Check for stop words like "always", "never", "everyone", "no one".</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p><strong>Goal:</strong> {state.goal}</p>
                            <p><strong>Resistance:</strong> {state.resistance}</p>
                            <p><strong>Justification:</strong> {state.justification}</p>
                        </div>
                        <p className="text-sm opacity-80">If you find any, rewrite them to be more specific.</p>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <p className="mb-4">Ensure each statement has a clear <strong>Subject</strong>, <strong>Object</strong>, and <strong>Predicate</strong>.</p>
                        <div className="space-y-4">
                            <div className="bg-white/10 p-4 rounded-lg">
                                <p className="text-sm opacity-70 mb-1">Goal</p>
                                <p>{state.goal}</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <p className="text-sm opacity-70 mb-1">Resistance</p>
                                <p>{state.resistance}</p>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <p className="mb-4">Is the <strong>"Who"</strong> a specific person or group?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">Examples of vague "Who":</p>
                            <ul className="list-disc list-inside text-sm opacity-80 mb-4">
                                <li>"The project isn't moving" (Who isn't moving it?)</li>
                                <li>"No time" (Who doesn't have time for what?)</li>
                            </ul>
                            <p className="font-bold">Your Goal Subject:</p>
                            <p className="italic">"{state.goal}"</p>
                        </div>
                        <p className="text-sm opacity-80">If it's vague, specify exactly WHO.</p>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <p className="mb-4">Is there <strong>one thought</strong> per statement?</p>
                        <p className="mb-4 text-sm">Avoid "because", "due to" inside the statement itself.</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2"><strong>Goal:</strong> {state.goal}</p>
                            <p className="mb-2"><strong>Resistance:</strong> {state.resistance}</p>
                        </div>
                        <p className="text-sm opacity-80">If you see "because" inside these, split them into separate stickers.</p>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <p className="mb-4">If you used <strong>comparatives</strong> (more, less, expensive, long), did you specify a number?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">"Too expensive" &rarr; How much exactly?</p>
                            <p className="mb-2">"Too long" &rarr; How many hours/days?</p>
                        </div>
                        <p className="text-sm opacity-80">Vague comparisons feed the Cockroach. Be specific with numbers.</p>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <p className="mb-4">Can you <strong>verify</strong> the property?</p>
                        <p className="mb-4 text-sm">If you say "Inefficient process", how do you measure efficiency?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p><strong>Ask yourself:</strong> "How would I know for sure that it IS efficient?"</p>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div>
                        <p className="mb-4">Is the action <strong>observable</strong>?</p>
                        <p className="mb-4 text-sm">Avoid interpretations like "They don't trust us" or "They are lazy".</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2"><strong>Interpretation:</strong> "He is angry."</p>
                            <p className="mb-2"><strong>Observation:</strong> "He shouted and banged the table."</p>
                        </div>
                        <p className="text-sm opacity-80">Ensure your statements describe what a camera would see.</p>
                    </div>
                );
            case 7:
                return (
                    <div>
                        <p className="mb-4">Is the <strong>quantity</strong> clear for all parts?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">"Colleagues are late" &rarr; All colleagues? Always? Or just Bob on Tuesdays?</p>
                            <p className="mb-2">"We miss deadlines" &rarr; Every deadline? Or 1 out of 10?</p>
                        </div>
                        <p className="text-sm opacity-80">Don't generalize. Be precise.</p>
                    </div>
                );
            case 8:
                return (
                    <div>
                        <p className="mb-4">Read this aloud. Does it sound reasonable?</p>
                        <div className="bg-white/10 p-6 rounded-xl text-lg leading-relaxed">
                            <p><strong>IF</strong> {state.goal},</p>
                            <p><strong>THEN</strong> {state.resistance},</p>
                            <p><strong>BECAUSE</strong> {state.justification}.</p>
                        </div>
                    </div>
                );
            case 9:
                return (
                    <div>
                        <p className="mb-4">Check for <strong>Tautologies</strong> (Circular Logic).</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">❌ "If I lose weight, I will be thinner." (Same thing)</p>
                            <p className="mb-2">✅ "If I lose weight, I can wear my favorite jeans." (New capability)</p>
                        </div>
                        <p className="text-sm opacity-80">Ensure the Effect is distinct from the Cause.</p>
                    </div>
                );
            case 10:
                return (
                    <div>
                        <p className="mb-4">Does the <strong>"Because"</strong> explain the mechanism?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">❌ "...because I want to." (Not a mechanism)</p>
                            <p className="mb-2">✅ "...because physical activity creates a calorie deficit..." (Mechanism)</p>
                        </div>
                        <p className="text-sm opacity-80">The justification should explain HOW the cause leads to the effect.</p>
                    </div>
                );
            default:
                return <p>Check {currentCheck + 1}: {CHECKS[currentCheck].description}</p>;
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Analysis: Step {currentCheck + 1}/{CHECKS.length}</h2>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {CHECKS[currentCheck].title}
                </span>
            </div>

            <div className="min-h-[200px] mb-8">
                {renderCheckContent()}
            </div>

            <div className="flex justify-between">
                <button
                    onClick={currentCheck === 0 ? onBack : () => setCurrentCheck(prev => prev - 1)}
                    className="text-white/70 hover:text-white px-4 py-2 transition-colors"
                >
                    Back
                </button>
                <div className="space-x-4">
                    <button
                        onClick={handleNextCheck}
                        className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors"
                    >
                        {currentCheck === CHECKS.length - 1 ? "Finish" : "Next Check"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepAnalysis;
