// ─── Next.js API Route: /api/ai-assistant ─────────────────────────────────────
// Thay thế server.ts của Partner app — tích hợp Gemini AI trực tiếp vào Next.js.
//
// Luồng hoạt động:
//   Frontend (AiAssistantView) → POST /api/ai-assistant
//   → Route này gọi Google Gemini 2.5 Flash API
//   → Trả về phản hồi tiếng Việt về thị trường nông sản
//
// Biến môi trường cần thiết (thêm vào .env.local):
//   GEMINI_API_KEY=your_key_here

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// ─── Hệ thống prompt — định nghĩa vai trò trợ lý AI ──────────────────────────
const SYSTEM_INSTRUCTION = `Bạn là "Trợ lý Chuyên gia Nông sản AgriConnect" (AgriConnect AI Assistant).
Bạn tư vấn cho các doanh nghiệp, nhà thu mua, chuỗi siêu thị và đại lý bán buôn nông sản Việt Nam.

Nhiệm vụ của bạn:
1. Giải đáp thắc mắc về giá cả thị trường, xu hướng biến động giá nông sản
   (Bắp cải Đà Lạt, Thanh long Bình Thuận, Cà phê Lâm Đồng, Dứa Long An, 
    Ớt Tây Ninh, Cải thìa, Chanh dây Đắk Lắk, Gừng Gia Lai...).
2. Tư vấn quy chuẩn chất lượng VietGAP, GlobalGAP, tiêu chuẩn xuất khẩu.
3. Hướng dẫn quy trình đặt mua sỉ, gom đơn mua chung (Group Buying) 
   và ký Hợp đồng tương lai (Future Contracts) nông sản.
4. Đưa ra lời khuyên về bảo quản, vận chuyển và tối ưu chi phí logistics chuỗi cung ứng.

Hãy trả lời ngắn gọn, lịch sự, chuyên nghiệp bằng tiếng Việt, 
dùng định dạng Markdown rõ ràng khi thích hợp.`;

export async function POST(request: NextRequest) {
  try {
    // Đọc payload từ body request
    const { message, history } = await request.json();

    // Kiểm tra message không rỗng
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Vui lòng nhập nội dung câu hỏi' },
        { status: 400 }
      );
    }

    // Lấy API key từ biến môi trường
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'GEMINI_API_KEY chưa được cấu hình. Vui lòng thêm vào file .env.local: GEMINI_API_KEY=your_key',
        },
        { status: 500 }
      );
    }

    // Khởi tạo Gemini AI client
    const ai = new GoogleGenAI({ apiKey });

    // Xây dựng lịch sử hội thoại cho AI (context)
    const contents: { role: string; parts: { text: string }[] }[] = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        // Chuyển đổi role: 'assistant' → 'model' (định dạng Gemini API yêu cầu)
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }],
        });
      }
    }
    // Thêm tin nhắn mới nhất của user
    contents.push({ role: 'user', parts: [{ text: message }] });

    // Gọi Gemini 2.5 Flash API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Cân bằng giữa sáng tạo và độ chính xác
      },
    });

    // Trả về phản hồi AI
    const replyText =
      response.text ||
      'Rất tiếc, tôi không thể xử lý yêu cầu lúc này. Vui lòng thử lại sau.';

    return NextResponse.json({ reply: replyText });
  } catch (err: unknown) {
    // Xử lý lỗi — ghi log và trả về thông báo thân thiện
    const message = err instanceof Error ? err.message : 'Lỗi server không xác định';
    console.error('[AI Assistant Error]:', message);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi kết nối với Trợ lý AI: ' + message },
      { status: 500 }
    );
  }
}
