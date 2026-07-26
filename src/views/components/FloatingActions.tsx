import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Sparkles, X, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '919876543210';
const WHATSAPP_MESSAGE = "Namaste! I'd like to know more about your Rudraksha.";

interface ChatMessage {
  id: number;
  role: 'user' | 'ai';
  text: string;
}

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: 'ai',
      text: "Namaste I'm RudraAI. Ask me about mukhis, malas, or which Rudraksha suits your intention.",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isChatOpen]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          text: "Thank you for your question. Our Vedic team will guide you shortly — meanwhile, feel free to browse our Rudraksha Consultation page.",
        },
      ]);
    }, 700);
  };

  return (
    <>
      <style>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      {/* 1. WHATSAPP FLOATING ACTION BUTTON (Left Side - Authentic WhatsApp Green) */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35" />
        <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 text-white" />
      </a>

      {/* 2. BOTTOM RIGHT CORNER STACK (AI Assistant + Scroll To Top) */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-24px)]">
        
        {/* SCROLL TO TOP BUTTON */}
        <button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-orange/40 bg-navy-deep text-orange flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-orange hover:text-navy-deep shrink-0 ${
            showScrollTop
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* AI ASSISTANT CHAT PANEL */}
        {isChatOpen && (
          <div className="w-[calc(100vw-2rem)] sm:w-[360px] max-w-sm h-[24rem] sm:h-[28rem] rounded-2xl border border-orange/30 bg-navy-deep shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-4 border-b border-orange/20 bg-navy">
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="w-4 h-4 text-orange shrink-0" />
                <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-widest text-orange truncate">
                  Ask RudraAI
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chat"
                className="text-peach/60 hover:text-orange transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                    m.role === 'ai'
                      ? 'bg-navy/70 text-peach-soft/90 rounded-bl-sm self-start'
                      : 'bg-orange text-navy-deep rounded-br-sm self-end ml-auto'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 p-2.5 sm:p-3 border-t border-orange/20 bg-navy">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about mukhis, malas..."
                className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 text-sm font-body rounded-full border border-orange/30 bg-navy-deep/60 placeholder:text-peach/40 focus:outline-none focus:border-orange text-peach"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-orange text-navy-deep flex items-center justify-center hover:bg-orange-bright transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* AI ASSISTANT BUTTON */}
        <button
          type="button"
          onClick={() => setIsChatOpen((v) => !v)}
          aria-label="Open AI assistant"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-navy-deep border border-orange/40 text-orange flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 shrink-0 cursor-pointer"
        >
          {isChatOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>

      </div>
    </>
  );
}