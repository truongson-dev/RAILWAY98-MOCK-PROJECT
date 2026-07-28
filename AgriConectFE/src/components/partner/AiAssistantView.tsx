import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { ChatMessage } from './types';

interface AiAssistantViewProps {
  initialPrompt?: string;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content:
        'Xin chào! Tôi là **Trợ lý AI Nông sản AgriConnect** (Gemini AI). Tôi có thể hỗ trợ bạn dự báo biến động giá sỉ, tư vấn quy chuẩn VietGAP/GlobalGAP, cũng như đàm phán hợp đồng mua chung nông sản. Bạn cần hỗ trợ gì hôm nay?',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const suggestedPrompts = [
    'Giá bắp cải Đà Lạt tuần này ra sao?',
    'Tiêu chuẩn VietGAP cần đáp ứng những tiêu chí nào?',
    'Tư vấn quy trình thu mua sỉ thanh long Bình Thuận',
    'Dự báo giá cà phê vụ thu hoạch 2026',
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: data.reply || data.error || 'Rất tiếc, đã xảy ra sự cố khi phản hồi.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          content: 'Không thể kết nối với server Trợ lý AI. Vui lòng kiểm tra kết nối mạng.',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#bfcaba]/30 shadow-xs flex flex-col h-[75vh] max-h-[750px]">
      {/* Header */}
      <div className="p-4 bg-[#f7fbf0] border-b border-[#bfcaba]/30 rounded-t-3xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#181d16] flex items-center gap-1.5">
              <span>Trợ Lý AI Nông Sản AgriConnect</span>
              <span className="bg-[#9d3c5f]/15 text-[#9d3c5f] text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Gemini 2.5
              </span>
            </h3>
            <p className="text-xs text-[#707a6c]">
              Tư vấn thị trường, quy chuẩn chất lượng & hợp đồng sỉ
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'm1',
                role: 'assistant',
                content:
                  'Tôi đã làm mới đoạn chat. Bạn muốn hỏi gì về nông sản bán buôn?',
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="p-2 text-[#707a6c] hover:text-[#181d16] hover:bg-stone-200 rounded-lg transition-colors"
          title="Làm mới hội thoại"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Prompts Header */}
      <div className="p-3 bg-stone-50 border-b border-stone-100 overflow-x-auto hide-scrollbar flex gap-2">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="text-xs bg-white hover:bg-[#176a22]/10 hover:border-[#176a22] hover:text-[#176a22] border border-stone-200 text-[#40493d] font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all shadow-2xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                m.role === 'user'
                  ? 'bg-[#176a22] text-white rounded-br-xs'
                  : 'bg-[#f7fbf0] border border-[#bfcaba]/40 text-[#181d16] rounded-bl-xs'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{m.content}</div>
              <span
                className={`text-[10px] block mt-1.5 text-right opacity-70 font-mono`}
              >
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#f7fbf0] border border-[#bfcaba]/40 text-[#176a22] p-3 rounded-2xl rounded-bl-xs flex items-center gap-2 text-xs font-semibold">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AgriConnect AI đang tra cứu dữ liệu thị trường...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-[#bfcaba]/30 bg-[#f7fbf0] rounded-b-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi AI về giá sỉ, vận chuyển, VietGAP, nguồn hàng..."
            className="flex-1 bg-white border border-[#bfcaba] rounded-xl px-4 py-2.5 text-sm text-[#181d16] outline-none focus:border-[#176a22] focus:ring-2 focus:ring-[#176a22]/20 font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[#176a22] hover:bg-[#358439] disabled:opacity-50 text-white p-2.5 rounded-xl transition-all shadow-xs shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
