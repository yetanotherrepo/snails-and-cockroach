import React, { useState } from 'react';
import type { SnailState } from '../types';

interface Props {
    state: SnailState;
    onComplete: () => void;
    onBack: () => void;
}

const CHECKS = [
    { id: 0, title: "Стоп-слова", description: "Содержит ли текст стоп-слова?" },
    { id: 1, title: "Полнота", description: "Утверждение полное? (Кто делает Что с Чем)" },
    { id: 2, title: "Конкретика", description: "Является ли 'Кто' конкретным лицом?" },
    { id: 3, title: "Одна мысль", description: "В одном утверждении — одна мысль?" },
    { id: 4, title: "Сравнения", description: "Есть ли цифры для сравнений?" },
    { id: 5, title: "Качественные", description: "Можно ли проверить это свойство?" },
    { id: 6, title: "Наблюдаемость", description: "Это наблюдаемое действие?" },
    { id: 7, title: "Количество", description: "Ясно ли количество?" },
    { id: 8, title: "Логика", description: "Звучит ли связка ЕСЛИ-ТО-ПОТОМУ ЧТО разумно?" },
    { id: 9, title: "Тавтология", description: "Нет ли круговой логики?" },
    { id: 10, title: "Причинность", description: "Объясняет ли 'Потому что' механизм?" },
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
                        <p className="mb-4">Проверьте наличие стоп-слов, таких как "всегда", "никогда", "все", "никто".</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p><strong>Улитка:</strong> {state.goal}</p>
                            <p><strong>Таракан:</strong> {state.resistance}</p>
                            <p><strong>Обоснование:</strong> {state.justification}</p>
                        </div>
                        <p className="text-sm opacity-80">Если нашли, перепишите более конкретно.</p>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <p className="mb-4">Убедитесь, что в каждом утверждении есть четкие <strong>Субъект</strong>, <strong>Объект</strong> и <strong>Предикат</strong>.</p>
                        <div className="space-y-4">
                            <div className="bg-white/10 p-4 rounded-lg">
                                <p className="text-sm opacity-70 mb-1">Улитка</p>
                                <p>{state.goal}</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <p className="text-sm opacity-70 mb-1">Таракан</p>
                                <p>{state.resistance}</p>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <p className="mb-4">Является ли <strong>"Кто"</strong> конкретным человеком или группой?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">Примеры размытого "Кто":</p>
                            <ul className="list-disc list-inside text-sm opacity-80 mb-4">
                                <li>"Проект не двигается" (Кто его не двигает?)</li>
                                <li>"Нет времени" (У кого нет времени на что?)</li>
                            </ul>
                            <p className="font-bold">Ваш Субъект Улитки:</p>
                            <p className="italic">"{state.goal}"</p>
                        </div>
                        <p className="text-sm opacity-80">Если "Кто" размыт, уточните, КТО именно.</p>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <p className="mb-4">В одном утверждении — <strong>одна мысль</strong>?</p>
                        <p className="mb-4 text-sm">Избегайте "потому что", "из-за" внутри самого утверждения.</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2"><strong>Улитка:</strong> {state.goal}</p>
                            <p className="mb-2"><strong>Таракан:</strong> {state.resistance}</p>
                        </div>
                        <p className="text-sm opacity-80">Если видите "потому что" внутри, разделите на отдельные стикеры.</p>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <p className="mb-4">Если вы использовали <strong>сравнения</strong> (больше, меньше, дорого, долго), указали ли вы число?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">"Слишком дорого" &rarr; Сколько именно?</p>
                            <p className="mb-2">"Слишком долго" &rarr; Сколько часов/дней?</p>
                        </div>
                        <p className="text-sm opacity-80">Размытые сравнения кормят Таракана. Будьте конкретны с цифрами.</p>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <p className="mb-4">Можете ли вы <strong>проверить</strong> это свойство?</p>
                        <p className="mb-4 text-sm">Если вы говорите "Неэффективный процесс", как вы измеряете эффективность?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p><strong>Спросите себя:</strong> "Как я узнаю наверняка, что это ЭФФЕКТИВНО?"</p>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div>
                        <p className="mb-4">Это <strong>наблюдаемое</strong> действие?</p>
                        <p className="mb-4 text-sm">Избегайте интерпретаций вроде "Они нам не доверяют" или "Они ленивые".</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2"><strong>Интерпретация:</strong> "Он злится."</p>
                            <p className="mb-2"><strong>Наблюдение:</strong> "Он кричал и стучал по столу."</p>
                        </div>
                        <p className="text-sm opacity-80">Убедитесь, что ваши утверждения описывают то, что увидела бы видеокамера.</p>
                    </div>
                );
            case 7:
                return (
                    <div>
                        <p className="mb-4">Ясно ли <strong>количество</strong> для всех частей?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">"Коллеги опаздывают" &rarr; Все коллеги? Всегда? Или только Боб по вторникам?</p>
                            <p className="mb-2">"Мы срываем сроки" &rarr; Каждый срок? Или 1 из 10?</p>
                        </div>
                        <p className="text-sm opacity-80">Не обобщайте. Будьте точны.</p>
                    </div>
                );
            case 8:
                return (
                    <div>
                        <p className="mb-4">Прочитайте это вслух. Звучит разумно?</p>
                        <div className="bg-white/10 p-6 rounded-xl text-lg leading-relaxed">
                            <p><strong>ЕСЛИ</strong> {state.goal},</p>
                            <p><strong>ТО</strong> {state.resistance},</p>
                            <p><strong>ПОТОМУ ЧТО</strong> {state.justification}.</p>
                        </div>
                    </div>
                );
            case 9:
                return (
                    <div>
                        <p className="mb-4">Проверьте на <strong>Тавтологии</strong> (Круговая логика).</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">❌ "Если я сброшу вес, я буду худым." (Одно и то же)</p>
                            <p className="mb-2">✅ "Если я сброшу вес, я смогу носить свои любимые джинсы." (Новая возможность)</p>
                        </div>
                        <p className="text-sm opacity-80">Убедитесь, что Следствие отличается от Причины.</p>
                    </div>
                );
            case 10:
                return (
                    <div>
                        <p className="mb-4">Объясняет ли <strong>"Потому что"</strong> механизм?</p>
                        <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="mb-2">❌ "...потому что я так хочу." (Не механизм)</p>
                            <p className="mb-2">✅ "...потому что физическая активность создает дефицит калорий..." (Механизм)</p>
                        </div>
                        <p className="text-sm opacity-80">Обоснование должно объяснять, КАК причина приводит к следствию.</p>
                    </div>
                );
            default:
                return <p>Проверка {currentCheck + 1}: {CHECKS[currentCheck].description}</p>;
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Анализ: Шаг {currentCheck + 1}/{CHECKS.length}</h2>
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
                    Назад
                </button>
                <div className="space-x-4">
                    <button
                        onClick={handleNextCheck}
                        className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors"
                    >
                        {currentCheck === CHECKS.length - 1 ? "Завершить" : "Следующая проверка"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepAnalysis;
