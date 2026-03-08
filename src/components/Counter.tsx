import React, { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-slate-500 font-medium uppercase tracking-widest text-sm">
          Simple Counter
        </h2>
        
        <div className="text-8xl font-black text-slate-800 tabular-nums">
          {count}
        </div>

        <div className="flex items-center gap-4 w-full">
          <button
            onClick={decrement}
            className="flex-1 flex items-center justify-center p-4 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors active:scale-95"
            aria-label="Decrement"
          >
            <Minus size={24} strokeWidth={3} />
          </button>

          <button
            onClick={increment}
            className="flex-1 flex items-center justify-center p-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors active:scale-95"
            aria-label="Increment"
          >
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-2 text-slate-400 hover:text-slate-600 transition-colors uppercase text-xs font-bold tracking-tighter"
        >
          <RotateCcw size={14} />
          Reset Counter
        </button>
      </div>
    </div>
  );
}