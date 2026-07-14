import React from 'react';

const moodConfig = {
  guide: {
    eyebrow: 'Người bạn đồng hành',
    title: 'Chúng mình sẽ đi cùng bạn',
    message: 'Mỗi bước đều được thiết kế để giúp phụ huynh và bé cảm thấy nhẹ nhàng hơn.',
  },
  support: {
    eyebrow: 'Đồng hành',
    title: 'Bạn không cần làm một mình',
    message: 'Một vài câu hỏi nhỏ sẽ giúp chúng mình hiểu rõ hơn về nhu cầu của bé.',
  },
  reassure: {
    eyebrow: 'An tâm',
    title: 'Đã gần xong rồi',
    message: 'Bạn chỉ còn một vài bước nữa để nhận được gợi ý phù hợp.',
  },
  confirm: {
    eyebrow: 'Xác nhận',
    title: 'Thông tin đã được ghi nhận',
    message: 'Cảm ơn bạn đã dành thời gian cho bé. Chúng mình sẽ tiếp tục hỗ trợ bạn.',
  },
  thinking: {
    eyebrow: 'Đang chuẩn bị',
    title: 'Chúng mình đang sắp xếp thông tin',
    message: 'Chỉ một chút chờ đợi nữa là bạn sẽ thấy hướng dẫn rõ ràng hơn.',
  },
  error: {
    eyebrow: 'Hỗ trợ nhanh',
    title: 'Để mình giúp bạn kiểm tra lại',
    message: 'Một vài thông tin còn thiếu, nhưng bạn có thể khắc phục rất nhanh.',
  },
  welcome: {
    eyebrow: 'Xin chào',
    title: 'Chào bạn, mình ở đây cùng bạn',
    message: 'Bạn có thể bắt đầu từ một bước nhỏ nhất và tiến dần từng bước.',
  },
};

function BrandMascot({ mood = 'guide', title, message, compact = false, className = '' }) {
  const config = moodConfig[mood] || moodConfig.guide;
  const resolvedTitle = title || config.title;
  const resolvedMessage = message || config.message;

  return (
    <div className={`brand-mascot ${compact ? 'brand-mascot--compact' : ''} ${className}`.trim()}>
      <div className="brand-mascot__illustration" aria-hidden="true">
        <svg viewBox="0 0 240 240" role="img" aria-label={config.eyebrow}>
          <circle cx="120" cy="120" r="95" fill="#fff4f6" />
          <path d="M58 116c0-41 34-75 76-75 33 0 62 21 72 50" fill="none" stroke="#4aa7b2" strokeWidth="12" strokeLinecap="round" />
          <path d="M68 98c9-31 35-48 62-48" fill="none" stroke="#ef8a9b" strokeWidth="10" strokeLinecap="round" />
          <circle cx="92" cy="111" r="10" fill="#2f2a2d" />
          <circle cx="148" cy="111" r="10" fill="#2f2a2d" />
          <path d="M96 142c14 12 34 12 48 0" fill="none" stroke="#ef8a9b" strokeWidth="8" strokeLinecap="round" />
          <path d="M92 74c-18 8-28 24-28 44" fill="none" stroke="#ef8a9b" strokeWidth="8" strokeLinecap="round" />
          <path d="M152 78c18 7 28 22 28 41" fill="none" stroke="#4aa7b2" strokeWidth="8" strokeLinecap="round" />
          <path d="M98 56l15-16" stroke="#4aa7b2" strokeWidth="8" strokeLinecap="round" />
          <path d="M138 54l-14-16" stroke="#4aa7b2" strokeWidth="8" strokeLinecap="round" />
          <path d="M102 175c14 12 34 12 48 0" fill="none" stroke="#4aa7b2" strokeWidth="8" strokeLinecap="round" />
          <path d="M76 182c8-14 24-24 44-24" fill="none" stroke="#ef8a9b" strokeWidth="8" strokeLinecap="round" />
          <path d="M164 182c-8-14-24-24-44-24" fill="none" stroke="#4aa7b2" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>
      {!compact && (
        <div className="brand-mascot__speech">
          <span className="brand-mascot__eyebrow">{config.eyebrow}</span>
          <h3 className="brand-mascot__title">{resolvedTitle}</h3>
          <p className="brand-mascot__message">{resolvedMessage}</p>
        </div>
      )}
      {compact && (
        <div className="brand-mascot__speech brand-mascot__speech--compact">
          <span className="brand-mascot__eyebrow">{config.eyebrow}</span>
          <p className="brand-mascot__message">{resolvedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default BrandMascot;
