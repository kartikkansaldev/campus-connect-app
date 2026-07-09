import { useState } from 'react';

export default function AI() {
  const [query, setQuery] = useState('');
  
  return (
    <div className="animate-in max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold font-heading mb-2 text-center">Campus AI Assistant</h1>
      <p className="text-[var(--color-text-secondary)] font-medium mb-8 text-center">Ask anything about campus facilities, rules, or get directions.</p>

      <div className="neo-card-static p-6 bg-white min-h-[400px] flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center text-center opacity-50 mb-6">
          <div className="text-6xl mb-4">🤖</div>
          <p className="font-bold text-lg">How can I help you today?</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">Try asking: "Where is the Robotics Club?" or "When does the library close?"</p>
        </div>

        <div className="relative w-full flex items-center">
          <div className="absolute left-4 text-[var(--color-text-muted)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI..."
            className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] text-base font-medium font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-muted)] shadow-[4px_4px_0_0_var(--color-border)]"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-[var(--color-accent)] text-white px-4 rounded-lg font-bold text-sm uppercase tracking-wider border-2 border-[var(--color-border)] hover:bg-[var(--color-accent-hover)] transition-colors cursor-pointer">
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
