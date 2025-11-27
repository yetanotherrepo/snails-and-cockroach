import React, { useState } from 'react';

interface Props {
    initialValue: string;
    goal: string;
    resistance: string;
    onNext: (value: string) => void;
    onBack: () => void;
}

const StepJustification: React.FC<Props> = ({ initialValue, goal, resistance, onNext, onBack }) => {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) onNext(value);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Шаг 3: Обоснование 🧐</h2>
            <p className="mb-6 opacity-90">
                Спросите себя: <strong>"Почему ты думаешь, что ЕСЛИ {goal}, ТО {resistance}?"</strong>
                <br />
                <span className="text-sm opacity-75">Запишите причину или логику вашего страха.</span>
            </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[120px]"
                    placeholder="например, Потому что мне нужно 8 часов сна, чтобы функционировать..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                />
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-white/70 hover:text-white px-4 py-2 transition-colors"
                    >
                        Назад
                    </button>
                    <button
                        type="submit"
                        disabled={!value.trim()}
                        className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Начать Анализ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepJustification;
