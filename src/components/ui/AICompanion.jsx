import { useEffect, useMemo, useRef, useState } from 'react';

const quickActions = [
  'Tôi chưa biết chọn chương trình nào',
  'Giải thích kết quả khảo sát',
  'Tôi muốn đăng ký tư vấn',
  'Bé chậm nói nên học gì?',
  'Bé có phù hợp học online không?',
];

const actionResponses = {
  'Tôi chưa biết chọn chương trình nào':
    'Mình sẽ giúp bạn xác định chương trình phù hợp dựa trên mục tiêu của bé. Hãy chia sẻ một chút về tuổi, biểu hiện và cách học mong muốn, hoặc bạn có thể bắt đầu bằng khảo sát để nhận gợi ý nhanh.',
  'Giải thích kết quả khảo sát':
    'Kết quả khảo sát giúp xác định điểm mạnh và điểm cần hỗ trợ của bé. Mình có thể giải thích kết quả từng bước và gợi ý lộ trình phù hợp để phụ huynh yên tâm hơn.',
  'Tôi muốn đăng ký tư vấn':
    'Bạn có thể gửi yêu cầu tư vấn ngay trong trang Liên hệ hoặc sử dụng mẫu đăng ký. Mình luôn ở đây để hướng dẫn bạn từng bước.',
  'Bé chậm nói nên học gì?':
    'Với bé chậm nói, mình khuyên phụ huynh ưu tiên chương trình phát triển ngôn ngữ, giao tiếp và hỗ trợ cảm xúc. Những lộ trình nhẹ nhàng, nhiều hoạt động tương tác sẽ giúp bé tiến bộ tự nhiên hơn.',
  'Bé có phù hợp học online không?':
    'Nhiều nhóm học online phù hợp nếu bé có thể tương tác qua màn hình và phụ huynh đồng hành. Mình cũng có thể gợi ý mô hình kết hợp online và trực tiếp nếu cần sự hỗ trợ chặt chẽ hơn.',
};

function AICompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      from: 'assistant',
      text: 'Xin chào! Mình là AI đồng hành của Nghe Con Lớn. Mình có thể giúp bạn lựa chọn chương trình phù hợp hoặc giải thích kết quả khảo sát.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', openHandler);
    return () => window.removeEventListener('open-ai-chat', openHandler);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const assistantName = useMemo(() => 'Nghe AI', []);

  const addMessage = (from, text) => {
    setMessages((current) => [...current, { from, text }]);
  };

  const sendAssistantReply = (replyText) => {
    setIsTyping(true);
    window.setTimeout(() => {
      addMessage('assistant', replyText);
      setIsTyping(false);
    }, 600);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addMessage('user', trimmed);
    setInput('');
    const normalized = quickActions.find((action) => action.toLowerCase() === trimmed.toLowerCase());
    if (normalized) {
      sendAssistantReply(actionResponses[normalized]);
      return;
    }
    sendAssistantReply(
      'Mình đã nhận được câu hỏi của bạn. Hãy chờ một chút, mình sẽ giúp bạn tìm hướng đi phù hợp hoặc gợi ý những bước tiếp theo.'
    );
  };

  const handleQuickAction = (action) => {
    addMessage('user', action);
    setIsOpen(true);
    sendAssistantReply(actionResponses[action]);
  };

  return (
    <div className="ai-companion" aria-live="polite">
      {isOpen && (
        <div className="ai-companion__panel shadow-soft">
          <div className="ai-companion__header">
            <div className="ai-companion__avatar" aria-hidden="true">AI</div>
            <div className="ai-companion__header-text">
              <div className="ai-companion__title">Nghe AI</div>
              <div className="ai-companion__status">
                <span className="ai-companion__status-dot" />
                <span>Đang trực tuyến</span>
              </div>
            </div>
            <button type="button" className="ai-companion__close btn-reset" onClick={() => setIsOpen(false)} aria-label="Đóng trò chuyện">
              ×
            </button>
          </div>
          <div className="ai-companion__body" ref={scrollRef}>
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={`ai-message ai-message--${message.from}`}
              >
                <p>{message.text}</p>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message ai-message--assistant ai-message--typing">
                <span>Nghe AI đang trả lời...</span>
              </div>
            )}
            <div className="ai-companion__quick-actions">
              {quickActions.map((action) => (
                <button
                  type="button"
                  key={action}
                  className="ai-quick-action btn-reset"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
          <div className="ai-companion__footer">
            <input
              type="text"
              className="ai-companion__input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              aria-label="Nhập câu hỏi"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSend();
                }
              }}
            />
            <button type="button" className="ai-companion__send-btn btn-reset" onClick={handleSend}>
              Gửi
            </button>
          </div>
        </div>
      )}
      <button type="button" className="ai-companion__toggle btn-reset" onClick={() => setIsOpen((current) => !current)}>
        <span className="ai-companion__toggle-icon">💬</span>
        <span>Chat AI</span>
      </button>
    </div>
  );
}

export default AICompanion;
