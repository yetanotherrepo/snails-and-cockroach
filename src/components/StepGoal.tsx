import React, { useState } from 'react';

interface Props {
    initialValue: string;
    onNext: (value: string) => void;
}

const StepGoal: React.FC<Props> = ({ initialValue, onNext }) => {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) onNext(value);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Шаг 1: Улитка 🐌</h2>
            <p className="mb-6 opacity-90">Какое хорошее и полезное дело вы хотите сделать?</p>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[120px]"
                    placeholder="например, Я хочу делать зарядку каждое утро..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                />
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={!value.trim()}
                        className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Далее
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepGoal;
