import React, { useState, useRef, useEffect } from 'react';

export default function VisitorAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Greetings, traveler! I am your Chitkara Guide. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setInput('');

    // Simulate AI response based on keywords
    setTimeout(() => {
      let response = "I'm not entirely sure where that is. Try using the global search or looking at the map above!";
      const lower = userMsg.toLowerCase();

      if (lower.includes('park')) {
        response = "You can park your vehicle at the 'Campus Parking Zone' near the Exploretorium or the 'West Car Parking' on the west side. Both are monitored 24/7!";
      } else if (lower.includes('hotel') || lower.includes('stay') || lower.includes('guest house')) {
        response = "For accommodation, I recommend the 'Chitkara Guest House' inside the campus or the 'Royal Residency Hotel' just outside the main gate.";
      } else if (lower.includes('medical') || lower.includes('emergency') || lower.includes('hospital')) {
        response = "If it is an emergency, please use the Emergency button on the page! We have a 24/7 Medical Room (Dispensary) and a Campus Pharmacy on site.";
      } else if (lower.includes('print') || lower.includes('copy') || lower.includes('lamination')) {
        response = "You can get printing and photocopying done at 'Sharma Photocopy & Print' near Tuck Shop 1.";
      } else if (lower.includes('food') || lower.includes('eat') || lower.includes('hungry')) {
        response = "We have many options! Square 1 Food Court has Domino's and Subway, or you can check out Blue Tokai for premium coffee.";
      } else if (lower.includes('block c') || lower.includes('academic')) {
        response = "Academic blocks like Galileo and Fleming are marked on the map with the purple academic icon. Let me know if you need walking directions!";
      } else if (lower.includes('atm') || lower.includes('grocery') || lower.includes('supermarket')) {
        response = "The 'Daily Needs Supermarket' is located near the Student Center for all your essentials.";
      } else if (lower.includes('library')) {
        response = "The Central Library is located centrally on campus, featuring 50,000+ books and silent study zones. Open Mon-Fri, 9 AM - 8 PM.";
      }

      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] flex items-center justify-center text-2xl shadow-xl border-2 border-transparent hover:scale-105 transition-transform z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      >
        ✨
        {/* Glow effect */}
        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-20"></span>
      </button>

      {/* Chat Interface */}
      <div 
        className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-[var(--color-card)] border-2 border-[var(--color-border)] flex flex-col z-50 transition-all duration-300 origin-bottom-right shadow-[8px_8px_0_0_var(--color-border)] rounded-xl overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-[var(--color-text)] text-[var(--color-bg)] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-lg">
              ✨
            </div>
            <div>
              <h3 className="font-extrabold text-sm font-heading tracking-wide">Chitkara AI</h3>
              <p className="text-[10px] opacity-70 font-mono uppercase">Visitor Assistant</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-[var(--color-bg)] opacity-70 hover:opacity-100 font-bold">
            ✕
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#FAF9F6] flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-[var(--color-text)] text-[var(--color-bg)] rounded-tr-sm' 
                    : 'bg-white border-2 border-[var(--color-border-light)] text-[var(--color-text)] rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 border-t-2 border-[var(--color-border-light)] bg-white flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about parking, food, hotels..."
            className="flex-1 bg-[var(--color-bg)] border-2 border-[var(--color-border-light)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-text)] transition-colors"
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="w-10 flex-shrink-0 bg-[var(--color-text)] text-[var(--color-bg)] rounded-lg flex items-center justify-center font-bold disabled:opacity-50 transition-opacity"
          >
            ↑
          </button>
        </form>
      </div>
    </>
  );
}
