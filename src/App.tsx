import Counter from './components/Counter';

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <Counter />
      <footer className="mt-8 text-slate-400 text-sm">
        Built with DevForge AI & Vite
      </footer>
    </div>
  );
}