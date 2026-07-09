import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function AI() {
  const { data } = useApp();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMsg = { role: 'user', content: query.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setQuery('');
    setIsLoading(true);

    try {
      // Build a basic context string from Supabase data so the AI knows about the campus
      const campusContext = `
You are a helpful, friendly AI assistant for Chitkara University's Campus Connect app.
You help students find clubs, events, and campus facilities.
Here is live context from the database:
- Clubs: ${data.clubs?.map(c => c.name).join(', ') || 'None'}
- Places: ${data.places?.map(p => p.name).join(', ') || 'None'}
- Events: ${data.events?.map(e => e.title).join(', ') || 'None'}
- Staff: ${data.staff?.map(s => s.name).join(', ') || 'None'}

Answer concisely in a friendly, conversational tone. Do not use markdown unless necessary.
      `;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: campusContext },
            ...newMessages
          ],
          temperature: 0.7,
          max_tokens: 500,
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Groq API Error Response:", errText);
        throw new Error(`API error: ${response.status} - ${errText}`);
      }

      const resData = await response.json();
      if (resData.choices && resData.choices[0]) {
        setMessages([...newMessages, resData.choices[0].message]);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const keyStatus = import.meta.env.VITE_GROQ_API_KEY ? "Key is loaded." : "Key is MISSING!";
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: `Error: ${error.message}. ${keyStatus}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="text-center mb-6 shrink-0">
        <h1 className="text-3xl font-extrabold font-heading mb-2">Campus AI Assistant</h1>
        <p className="text-[var(--color-text-secondary)] font-medium">Ask anything about campus facilities, rules, or get directions.</p>
      </div>

      <div className="neo-card-static bg-white flex flex-col flex-1 overflow-hidden">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[var(--color-bg)]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center opacity-50">
              <div className="text-6xl mb-4">🤖</div>
              <p className="font-bold text-lg mb-2">How can I help you today?</p>
              <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">Try asking: "Where is the Robotics Club?" or "What are the timings for Chitkara Woods?"</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[var(--color-text)] text-white rounded-br-sm' 
                    : 'bg-white border-2 border-[var(--color-border)] shadow-[4px_4px_0_0_var(--color-border)] rounded-bl-sm text-[var(--color-text)]'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-[var(--color-border)] shadow-[4px_4px_0_0_var(--color-border)] rounded-2xl rounded-bl-sm px-5 py-4 flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t-2 border-[var(--color-border)]">
          <form onSubmit={handleSend} className="relative w-full flex items-center">
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
              disabled={isLoading}
              className="w-full h-14 pl-12 pr-24 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] text-base font-medium font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-muted)] disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-2 bottom-2 bg-[var(--color-accent)] text-white px-5 rounded-lg font-bold text-sm uppercase tracking-wider border-2 border-[var(--color-border)] hover:bg-[var(--color-accent-hover)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0_0_var(--color-border)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
