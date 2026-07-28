import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  X, 
  Minimize2, 
  Maximize2, 
  RefreshCw, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Check, 
  Zap, 
  Sprout, 
  ShieldAlert, 
  TrendingUp, 
  SunMedium, 
  Mic,
  MessageSquare,
  ChevronDown,
  Info
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  attachmentUrl?: string;
  suggestedActions?: string[];
  cards?: {
    type: 'weather' | 'disease' | 'price_forecast' | 'harvest';
    title: string;
    details: string;
    badge?: string;
  }[];
}

interface AiChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Xin chào anh Minh! Tôi là **Trợ Lý AI AgriConnect** 🌾.\n\nTôi sẵn sàng tư vấn kỹ thuật canh tác, chẩn đoán bệnh qua hình ảnh, dự báo thời tiết & biến động giá thị trường cho vườn nông sản của anh.',
      timestamp: '10:30 AM',
      cards: [
        {
          type: 'weather',
          title: 'Dự báo thời tiết Đắk Lắk',
          details: 'Độ ẩm tăng 15% trong 3 ngày tới. Nguy cơ phát sinh rầy nâu nhẹ.',
          badge: 'Cảnh báo dịch hại'
        }
      ],
      suggestedActions: [
        '🌿 Tư vấn xử lý rầy nâu lô A2',
        '📈 Dự báo giá Sầu riêng tháng tới',
        '📦 Lập kế hoạch thu hoạch Cà phê'
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() && !attachedImage) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachmentUrl: attachedImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setAttachedImage(null);
    setIsTyping(true);

    // Simulated intelligent AI response for realistic interactive demonstration
    setTimeout(() => {
      let replyText = '';
      let replyCards: ChatMessage['cards'] = undefined;
      let replyActions: string[] = [];

      const lower = text.toLowerCase();

      if (lower.includes('rầy nâu') || lower.includes('lô a2') || lower.includes('dịch bệnh')) {
        replyText = '### 🌿 Đánh giá & Phác đồ điều trị Rầy Nâu trên Lô A2:\n\n- **Tình trạng:** Phát hiện mật độ rầy cám 2-3 con/lá tại khu vực giáp ranh.\n- **Khuyến nghị sinh học:**\n  - Phun chế phẩm nấm trắng (*Beauveria bassiana*) hoặc nấm xanh (*Metarhizium*).\n  - Rút nước cạn lòng mương để hạ độ ẩm không khí tầng gốc.\n- **Lưu ý:** Tạm dừng bón phân đạm dư thừa trong 5 ngày tới.';
        replyCards = [
          {
            type: 'disease',
            title: 'Chẩn đoán Rầy Nâu',
            details: 'Mức độ: Nhẹ (Giai đoạn đầu). Khuyến cáo dùng chế phẩm sinh học.',
            badge: 'An toàn VietGAP'
          }
        ];
        replyActions = ['Xem danh mục thuốc sinh học', 'Đăng ký lịch phun xịt', 'Hỏi chuyên gia kỹ thuật'];
      } else if (lower.includes('giá') || lower.includes('sầu riêng') || lower.includes('dự báo')) {
        replyText = '### 📈 Dự báo Giá Sầu Riêng Ri6 (T8/2026 - T10/2026):\n\n- **Giá hiện tại tại vườn:** 78.000 - 85.000 VNĐ/kg.\n- **Xu hướng 30 ngày tới:** Tăng nhẹ 5-8% do nhu cầu xuất khẩu sang thị trường Trung Quốc và Trung Đông tăng đột biến.\n- **Khuyên dùng:** Anh nên duy trì tiêu chuẩn VietGAP để nâng hạng xuất khẩu cấp A.';
        replyCards = [
          {
            type: 'price_forecast',
            title: 'Biến động giá Sầu Riêng',
            details: 'Dự báo chạm mốc 92.000 VNĐ/kg vào giữa tháng 09/2026.',
            badge: 'Xu hướng TĂNG (+6.5%)'
          }
        ];
        replyActions = ['Kết nối đối tác bao tiêu', 'Xem lịch thu hoạch tối ưu'];
      } else if (lower.includes('kế hoạch') || lower.includes('thu hoạch') || lower.includes('cà phê')) {
        replyText = '### 📦 Kế hoạch Thu hoạch Cà phê Robusta Lô B1:\n\n- **Dự kiến thu hoạch:** 12/11/2026 - 18/11/2026\n- **Sản lượng ước tính:** 8.5 Tấn\n- **Nhiệt độ phơi sấy tối ưu:** 28 - 32°C. Nên thu hái khi tỷ lệ chín đạt trên 90% để đảm bảo chất lượng hạt nhân xuất khẩu.';
        replyCards = [
          {
            type: 'harvest',
            title: 'Lộ trình Cà phê Robusta',
            details: 'Chuẩn bị bạt phơi và giàn sấy năng lượng mặt trời tại kho B1.',
            badge: 'Chuẩn bị thu hoạch'
          }
        ];
      } else {
        replyText = `Cảm ơn anh Minh đã đặt câu hỏi!\n\nDựa trên dữ liệu cảm biến nông trại và mô hình AI AgriConnect, tôi đã ghi nhận yêu cầu: **"${text}"**.\n\nHệ thống khuyến nghị anh tiếp tục theo dõi độ ẩm đất và duy trì nhật ký canh tác điện tử định kỳ.`;
        replyActions = ['Tư vấn thời tiết', 'Dự báo giá thị trường', 'Kiểm tra độ ẩm đất'];
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cards: replyCards,
        suggestedActions: replyActions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulatedImageUpload = () => {
    const sampleImage = 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80';
    setAttachedImage(sampleImage);
  };

  return (
    <div 
      className={`fixed z-50 transition-all duration-300 ease-in-out ${
        isExpanded 
          ? 'inset-2 sm:inset-6 max-w-none' 
          : 'bottom-4 right-4 w-full sm:w-[420px] max-w-[calc(100vw-2rem)]'
      }`}
    >
      <div className={`bg-white rounded-2xl shadow-2xl border border-[#bfcaba] flex flex-col overflow-hidden transition-all duration-300 ${
        isMinimized ? 'h-16' : isExpanded ? 'h-full' : 'h-[620px] max-h-[85vh]'
      }`}>
        
        {/* Chat Header */}
        <div className="bg-[#176a22] text-white px-4 py-3 flex items-center justify-between shrink-0 cursor-pointer select-none">
          <div 
            className="flex items-center gap-3 flex-1"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white shadow-inner">
                <Bot size={22} className="text-[#a3f69c]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#40e0d0] border-2 border-[#176a22] rounded-full animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-wide">Trợ Lý AI AgriConnect</h3>
                <span className="text-[10px] bg-[#c9ecc1] text-[#176a22] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={10} />
                  Gemini AI
                </span>
              </div>
              <p className="text-[11px] text-[#e0f3dd] font-medium opacity-90">
                Sẵn sàng tư vấn nông nghiệp 24/7
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title={isMinimized ? 'Mở rộng' : 'Thu nhỏ'}
            >
              <Minimize2 size={16} />
            </button>

            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden sm:block p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title={isExpanded ? 'Kích thước chuẩn' : 'Toàn màn hình'}
            >
              <Maximize2 size={16} />
            </button>

            <button 
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Đóng chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat Body (Hidden when minimized) */}
        {!isMinimized && (
          <>
            {/* Quick System Status Bar */}
            <div className="bg-[#f1f5ea] px-4 py-2 border-b border-[#e0e4d9] text-[11px] text-[#40493d] flex items-center justify-between font-semibold shrink-0">
              <span className="flex items-center gap-1.5 text-[#176a22]">
                <SunMedium size={14} className="text-[#e29300]" />
                Đắk Lắk: 28.5°C • Độ ẩm 78%
              </span>
              <button 
                onClick={() => {
                  setMessages([
                    {
                      id: `msg-reset-${Date.now()}`,
                      sender: 'ai',
                      text: 'Đã làm mới cuộc trò chuyện. Anh Minh cần Trợ lý AI hỗ trợ vấn đề gì mới?',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ]);
                }}
                className="text-[#5e6958] hover:text-[#176a22] flex items-center gap-1 cursor-pointer font-bold"
              >
                <RefreshCw size={12} />
                Làm mới
              </button>
            </div>

            {/* Message History List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f7fbf0]">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* AI Avatar */}
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-[#176a22] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Sparkles size={16} />
                    </div>
                  )}

                  {/* Message Bubble Container */}
                  <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    
                    {/* Message Bubble */}
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#176a22] text-white rounded-tr-none font-medium'
                        : 'bg-white text-[#181d16] border border-[#bfcaba]/40 rounded-tl-none'
                    }`}>
                      
                      {/* Optional Attached Image */}
                      {msg.attachmentUrl && (
                        <div className="mb-2 rounded-xl overflow-hidden border border-white/20 max-h-40">
                          <img src={msg.attachmentUrl} alt="Ảnh đính kèm" className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Formatting markdown text simply */}
                      <div className="whitespace-pre-wrap font-sans">
                        {msg.text.split('\n').map((line, idx) => {
                          if (line.startsWith('### ')) {
                            return <h4 key={idx} className="font-extrabold text-sm mb-1 text-[#176a22]">{line.replace('### ', '')}</h4>;
                          }
                          return <p key={idx} className="mb-1 last:mb-0">{line}</p>;
                        })}
                      </div>

                      <div className={`text-[10px] mt-1.5 text-right font-medium ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-[#707a6c]'
                      }`}>
                        {msg.timestamp}
                      </div>
                    </div>

                    {/* Optional Embedded Rich Cards */}
                    {msg.cards && msg.cards.map((card, cIdx) => (
                      <div key={cIdx} className="bg-white p-3 rounded-xl border border-[#a3f69c] shadow-2xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-xs text-[#176a22] flex items-center gap-1">
                            <ShieldAlert size={14} />
                            {card.title}
                          </span>
                          {card.badge && (
                            <span className="text-[10px] bg-[#c9ecc1] text-[#176a22] font-bold px-2 py-0.5 rounded-full">
                              {card.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#40493d]">{card.details}</p>
                      </div>
                    ))}

                    {/* Quick Action Suggestion Buttons */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedActions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleSendMessage(action)}
                            className="text-[11px] bg-white hover:bg-[#ebefe4] text-[#176a22] border border-[#176a22]/30 px-3 py-1.5 rounded-full font-bold transition-all shadow-2xs cursor-pointer text-left"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Message Action Footer for AI */}
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-2 text-[#707a6c] text-[10px] pl-1">
                        <button 
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="hover:text-[#176a22] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === msg.id ? <Check size={12} className="text-[#176a22]" /> : <Copy size={12} />}
                          <span>{copiedId === msg.id ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                        <span>•</span>
                        <button className="hover:text-[#176a22] cursor-pointer" title="Hữu ích"><ThumbsUp size={12} /></button>
                        <button className="hover:text-[#ba1a1a] cursor-pointer" title="Chưa chính xác"><ThumbsDown size={12} /></button>
                      </div>
                    )}

                  </div>

                  {/* User Avatar */}
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-[#c9ecc1] text-[#176a22] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      MN
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-xl bg-[#176a22] text-white flex items-center justify-center shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-[#bfcaba]/40 flex items-center gap-1.5 shadow-2xs">
                    <span className="w-2 h-2 bg-[#176a22] rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#176a22] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-[#176a22] rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-[#707a6c] font-medium ml-1">AI đang phân tích...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Image Preview Box before send */}
            {attachedImage && (
              <div className="px-4 py-2 bg-[#ebefe4] border-t border-[#e0e4d9] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#176a22] font-semibold">
                  <ImageIcon size={16} />
                  <span>Đã chọn 1 ảnh lá/vườn nông sản để phân tích bệnh</span>
                </div>
                <button onClick={() => setAttachedImage(null)} className="text-[#ba1a1a] hover:opacity-80">
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-[#e0e4d9] space-y-2 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="flex-1 bg-[#f1f5ea] border border-[#bfcaba]/60 rounded-xl px-3 py-1.5 flex items-center gap-2 focus-within:ring-2 focus-within:ring-[#176a22] focus-within:bg-white transition-all">
                  <input
                    type="text"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    placeholder="Hỏi AI về kỹ thuật, sâu bệnh, giá cả..."
                    className="flex-1 bg-transparent border-none outline-none text-xs text-[#181d16] placeholder:text-[#707a6c]"
                  />

                  <button
                    type="button"
                    onClick={handleSimulatedImageUpload}
                    className="p-1 text-[#5e6958] hover:text-[#176a22] rounded-lg cursor-pointer"
                    title="Tải ảnh thực địa để chẩn đoán"
                  >
                    <ImageIcon size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputPrompt('Cho tôi hỏi tình trạng thời tiết lô A2')}
                    className="p-1 text-[#5e6958] hover:text-[#176a22] rounded-lg cursor-pointer hidden sm:block"
                    title="Nhập giọng nói"
                  >
                    <Mic size={18} />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!inputPrompt.trim() && !attachedImage}
                  className="w-10 h-10 bg-[#176a22] hover:bg-[#12541b] disabled:bg-[#bfcaba] text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  <Send size={18} />
                </button>
              </form>

              <div className="text-[10px] text-center text-[#707a6c]">
                AgriConnect AI được tối ưu hóa cho dữ liệu nông nghiệp Việt Nam
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
