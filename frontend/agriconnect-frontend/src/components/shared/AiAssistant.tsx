'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Sprout } from 'lucide-react';

type Message = { sender: 'user' | 'bot'; text: string };

const BOT_REPLIES: [RegExp, string][] = [
  [/giá|thanh long/i, 'Giá Thanh Long ruột đỏ GlobalGAP hôm nay tại Tiền Giang dao động từ 24.000 – 27.000 VNĐ/kg tùy phân loại xuất khẩu A/B.'],
  [/escrow|thanh toán/i, 'Escrow bảo vệ bạn: Bên mua đặt cọc 67% vào tài khoản tạm khóa. Tiền chỉ giải ngân 100% khi hàng qua kiểm định Vinacontrol.'],
  [/sầu riêng|xuất khẩu/i, 'Sầu riêng xuất khẩu cần mã số vùng trồng (PUC) và mã nhà đóng gói được GACC Trung Quốc phê duyệt.'],
];

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Message[]>([
    { sender: 'bot', text: 'Xin chào! Tôi là Trợ Lý AI Nông Nghiệp AgriConnect. Tôi có thể hỗ trợ tra cứu giá B2B, tiêu chuẩn MRL xuất khẩu, hoặc tạo hợp đồng Escrow.' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setHistory((h) => [...h, { sender: 'user', text }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const matched = BOT_REPLIES.find(([rx]) => rx.test(text));
      const reply = matched
        ? matched[1]
        : 'Hệ thống AgriConnect kết nối hơn 500+ doanh nghiệp thu mua lớn. Mở mục "Sàn B2B" ở menu trên để xem chi tiết lô hàng!';
      setHistory((h) => [...h, { sender: 'bot', text: `Cảm ơn câu hỏi! ${reply}` }]);
      setLoading(false);
    }, 1000);
  };

  const QUICK = [
    { label: 'Giá Thanh Long?', prompt: 'Giá Thanh Long hôm nay?' },
    { label: 'Hợp đồng Escrow?', prompt: 'Thanh toán Escrow hoạt động như thế nào?' },
  ];

  return (
    <>
      {/* FAB toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Trợ lý AI"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#176a22] hover:bg-[#12531a] active:scale-95 text-white flex items-center justify-center shadow-2xl transition-all border-2 border-white group"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#f7fbf0] border border-[#e0e4d9] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[480px]">
          {/* Header */}
          <div className="px-5 py-4 bg-[#176a22] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-200" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Trợ Lý AI AgriConnect</h3>
                <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Powered by Gemini
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Đóng chat"
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {history.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#176a22] text-white flex items-center justify-center shrink-0 mt-1">
                    <Sprout className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#176a22] text-white rounded-tr-sm'
                    : 'bg-white border border-[#e0e4d9] text-[#181d16] shadow-xs rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start items-center text-[#707a6c] text-[11px] italic">
                <div className="w-5 h-5 rounded-full bg-[#176a22] text-white flex items-center justify-center animate-spin">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span>AI đang phân tích thị trường...</span>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div className="px-3 py-2 bg-[#f1f5ea] border-t border-[#e0e4d9] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            {QUICK.map(({ label, prompt }) => (
              <button key={label} onClick={() => setInput(prompt)}
                className="px-2.5 py-1 bg-white border border-[#bfcaba] text-[#176a22] rounded-full whitespace-nowrap hover:bg-[#176a22] hover:text-white transition-colors">
                {label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#e0e4d9] flex items-center gap-2">
            <input
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi nông sản..."
              className="flex-1 px-3 py-2 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-xs text-[#181d16] focus:outline-none focus:ring-1 focus:ring-[#176a22]"
            />
            <button type="submit"
              className="p-2 bg-[#176a22] hover:bg-[#12531a] text-white rounded-xl transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
