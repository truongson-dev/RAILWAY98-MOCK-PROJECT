import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Tractor } from 'lucide-react';
import { ChatMessage } from '../types';

export const AgriChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'system',
      text: 'Trợ lý AgriShipper AI xin chào! Tôi có thể hỗ trợ gì về lộ trình vận chuyển, kiểm định nông sản hoặc cập nhật kẹt xe hôm nay?',
      timestamp: 'Vừa xong'
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentText = input;
    setInput('');

    // Simulate response
    setTimeout(() => {
      let replyText = 'Tôi đã ghi nhận yêu cầu của bạn. Đội điều phối AgriShipper đang kiểm tra lộ trình thực tế!';
      const lower = currentText.toLowerCase();
      if (lower.includes('nhiệt độ') || lower.includes('lạnh')) {
        replyText = 'Tiêu chuẩn nhiệt độ thùng lạnh cho Rau củ quả là 4°C - 8°C. Hãy chắc chắn cảm biến IoT đã được kích hoạt trên ứng dụng.';
      } else if (lower.includes('kẹt xe') || lower.includes('đường')) {
        replyText = 'Tuyến QL1A hướng về Kho Bình Điền giao thông đang thông thoáng. Dự kiến thời gian di chuyển giảm 15 phút.';
      } else if (lower.includes('tiền') || lower.includes('thu nhập')) {
        replyText = 'Doanh thu đơn hàng sẽ tự động chuyển vào tài khoản ví đối tác AgriShipper ngay sau khi có xác nhận biên nhận giao hàng.';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#176a22] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#12541a] transition-all hover:scale-110 z-50 group border-2 border-white"
        title="Trợ lý hỗ trợ AgriShipper"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
      </button>

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#bfcaba] overflow-hidden flex flex-col h-[480px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Drawer Header */}
          <div className="bg-[#176a22] text-white p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Tractor className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Trợ lý Vận tải AgriShipper</h4>
                <p className="text-[10px] opacity-80">Hỗ trợ tài xế & điều phối 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f7fbf0] text-xs">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#176a22] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      isUser
                        ? 'bg-[#176a22] text-white rounded-br-none'
                        : 'bg-white border border-[#bfcaba] text-[#181d16] rounded-bl-none shadow-2xs'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <span
                      className={`text-[9px] block mt-1 text-right ${
                        isUser ? 'text-white/70' : 'text-[#40493d]'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#bfcaba] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi hoặc sự cố..."
              className="flex-1 px-3 py-2 border border-[#bfcaba] rounded-xl text-xs focus:ring-2 focus:ring-[#176a22] focus:outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-[#176a22] text-white rounded-xl hover:bg-[#12541a] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
