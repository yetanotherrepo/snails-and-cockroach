import Wizard from './components/Wizard';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-md">🐌 Snails vs Cockroaches 🪳</h1>
          <p className="text-lg opacity-90">Overcome your resistance with Jedi Techniques</p>
        </header>
        <main>
          <Wizard />
        </main>
      </div>
    </div>
  );
}

export default App;
