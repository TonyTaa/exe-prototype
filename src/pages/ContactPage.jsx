import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, Accordion } from 'react-bootstrap';
import { useConsultation } from '../context/ConsultationContext';
import { siteConfig, contactInfo } from '../data/content';
import AppInput from '../components/ui/AppInput';
import BrandMascot from '../components/ui/BrandMascot';
import PageHero from '../components/layout/PageHero';

function ContactPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { consultationData, setConsultationData, clearConsultationData } = useConsultation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    childAge: '',
    message: '',
    preferredTime: '',
    agreement: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const sourcedFromSurvey = useMemo(() => Boolean(location.state || consultationData), [location.state, consultationData]);

  useEffect(() => {
    if (location.state || consultationData) {
      const payload = location.state || consultationData;
      setFormData((current) => ({
        ...current,
        name: payload.parentName || current.name,
        phone: payload.contact || current.phone,
        email: payload.email || current.email,
        childAge: payload.age || current.childAge,
        message: payload.goal ? `Mục tiêu: ${payload.goal}. ${payload.mainConcern ? `Nhóm phát triển: ${payload.mainConcern}.` : ''}` : current.message,
      }));
    }
  }, [location.state, consultationData]);

  const handleEditPrefill = () => {
    if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const phoneDigits = contactInfo.phone ? contactInfo.phone.replace(/\D/g, '') : '0909123456';

  const contactCards = [
    {
      icon: '📍',
      title: 'Địa chỉ',
      value: 'Đại học FPT, Hòa Lạc, Hà Nội, Việt Nam',
      actionLabel: 'Chỉ đường',
      href: 'https://maps.app.goo.gl/Z9cq8hLwSesPHCtv8',
    },
    {
      icon: '☎️',
      title: 'Hotline',
      value: contactInfo.phone,
      actionLabel: 'Gọi ngay',
      href: `tel:${phoneDigits}`,
    },
    {
      icon: '✉️',
      title: 'Email',
      value: contactInfo.email,
      actionLabel: 'Gửi email',
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: '💬',
      title: 'Zalo',
      value: 'Chat trực tiếp với đội ngũ tư vấn',
      actionLabel: 'Chat Zalo',
      href: `https://zalo.me/${phoneDigits}`,
    },
    {
      icon: '🤝',
      title: 'Messenger',
      value: 'Nhắn tin nhanh để được hỗ trợ',
      actionLabel: 'Nhắn tin',
      href: 'https://m.me/ngheconlon',
    },
    {
      icon: '🕒',
      title: 'Giờ làm việc',
      value: 'Thứ Hai - Thứ Sáu: 8:30 - 20:00',
      actionLabel: 'Xem lịch',
      href: '#consultation-process',
    },
  ];

  const trustBadges = [
    { icon: '👩‍⚕️', label: 'Đồng hành cùng chuyên gia' },
    { icon: '🔒', label: 'Bảo mật thông tin' },
    { icon: '⏱️', label: 'Phản hồi trong vòng 24 giờ' },
  ];


  const teamMembers = [
    {
      name: 'ThS. Nguyễn Minh An',
      specialization: 'Chuyên gia phát triển ngôn ngữ',
      focus: 'Lộ trình can thiệp sớm và tư vấn giao tiếp',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Ms. Trần Hồng Nhung',
      specialization: 'Chuyên viên phát triển cảm xúc - xã hội',
      focus: 'Hỗ trợ phụ huynh trong các tình huống giao tiếp',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Mr. Phạm Quốc Bảo',
      specialization: 'Tư vấn chương trình và vận động phát triển',
      focus: 'Định hướng lộ trình phù hợp cho từng giai đoạn',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    },
  ];

  const faqItems = [
    {
      question: 'Khi nào nên đưa trẻ đi đánh giá?',
      answer: 'Nếu trẻ có dấu hiệu chậm nói, khó hòa nhập, hoặc phụ huynh cảm thấy có điều bất thường so với các bạn cùng lứa, nên đưa trẻ đi đánh giá sớm để có hướng hỗ trợ phù hợp.',
    },
    {
      question: 'trẻ chậm nói có nên can thiệp sớm?',
      answer: 'Có. Can thiệp sớm giúp trẻ phát triển tốt hơn ở nhiều lĩnh vực, đặc biệt là ngôn ngữ và giao tiếp.',
    },
    {
      question: 'Có thể học online không?',
      answer: 'Có. Một số chương trình có thể được triển khai trực tuyến hoặc kết hợp giữa trực tiếp và online tùy nhu cầu của gia đình.',
    },
    {
      question: 'Có học thử không?',
      answer: 'Thông thường chúng tôi có thể sắp xếp buổi trao đổi đầu tiên để phụ huynh hiểu rõ hơn về lộ trình phù hợp trước khi quyết định.',
    },
    {
      question: 'Tư vấn có mất phí không?',
      answer: 'Buổi tư vấn ban đầu thường không phát sinh chi phí, tùy vào từng chương trình và quy định hiện hành.',
    },
    {
      question: 'Có thể thay đổi lịch hẹn không?',
      answer: 'Được. Nếu cần đổi lịch, phụ huynh chỉ cần báo trước để đội ngũ hỗ trợ sắp xếp lại thuận tiện hơn.',
    },
  ];

  const consultationSteps = [
    'Gửi thông tin',
    'Chuyên gia liên hệ',
    'Trao đổi nhu cầu',
    'Đề xuất chương trình phù hợp',
    'Đồng hành cùng gia đình',
  ];

  const confirmationSteps = [
    'Đã nhận yêu cầu',
    'Chuyên gia sẽ liên hệ',
    'Trao đổi nhu cầu',
    'Đề xuất lộ trình',
    'Đồng hành cùng gia đình',
  ];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Vui lòng nhập tên của bạn.';
    if (!formData.phone.trim() && !formData.email.trim()) {
      nextErrors.contact = 'Vui lòng điền số điện thoại hoặc email để chúng tôi phản hồi.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Email chưa đúng định dạng.';
    }
    if (!formData.message.trim()) nextErrors.message = 'Vui lòng cho biết bạn cần hỗ trợ điều gì.';
    if (!formData.agreement) nextErrors.agreement = 'Vui lòng xác nhận đồng ý với điều khoản.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    window.setTimeout(() => {
      setStatus('success');
      const payload = {
        ...consultationData,
        parentName: formData.name,
        phone: formData.phone,
        email: formData.email,
        age: formData.childAge,
        message: formData.message,
        preferredTime: formData.preferredTime,
      };
      setConsultationData(payload);
      setFormData({ name: formData.name, phone: formData.phone, email: formData.email, childAge: formData.childAge, message: formData.message, preferredTime: formData.preferredTime, agreement: true });
    }, 900);
  };

  return (
    <div className="section-shell bg-light-subtle">
      <PageHero
        eyebrow={`Liên hệ với ${siteConfig.name}`}
        title="Chúng tôi luôn sẵn sàng đồng hành cùng gia đình bạn"
        description="Dù bạn đang quan tâm về ngôn ngữ, giao tiếp hay các mốc phát triển của trẻ, đội ngũ của chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn một cách ấm áp, gần gũi."
        actions={[
          <Button key="mail" href={`mailto:${contactInfo.email}`} as="a" variant="primary" size="lg">Đặt lịch tư vấn</Button>,
          <Button key="call" href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} as="a" variant="outline-primary" size="lg">Gọi ngay</Button>,
        ]}
        highlight={
          <div className="d-flex flex-column gap-2">
            {trustBadges.map((badge) => (
              <Badge key={badge.label} bg="light" text="dark" className="px-3 py-2 rounded-pill">
                <span className="me-2">{badge.icon}</span>
                {badge.label}
              </Badge>
            ))}
            <BrandMascot mood={sourcedFromSurvey ? 'confirm' : 'guide'} />
          </div>
        }
        image="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
        imageAlt="Phụ huynh và chuyên gia đồng hành"
      />
      <Container>
        <section className="mb-5 fade-in-up">
          <Row className="g-3">
            {contactCards.map((card) => (
              <Col md={6} lg={4} key={card.title}>
                <Card className="contact-card h-100 border-0 rounded-4 shadow-soft">
                  <Card.Body>
                    <div className="contact-icon rounded-circle d-flex align-items-center justify-content-center mb-3">{card.icon}</div>
                    <h3 className="h6 fw-bold mb-2">{card.title}</h3>
                    <p className="text-muted mb-3">{card.value}</p>
                    <Button as="a" href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined} variant="outline-primary" size="sm">
                      {card.actionLabel}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="mb-5 fade-in-up">
          <Row className="g-4">
            <Col lg={7}>
              <Card className="border-0 rounded-4 shadow-sm h-100">
                <Card.Body className="p-4 p-lg-5">
                  <p className="text-primary fw-semibold mb-2">Nhận tư vấn</p>
                  <h2 className="h3 fw-bold mb-3">Gửi câu hỏi và để đội ngũ của chúng tôi hỗ trợ bạn</h2>
                  <p className="text-muted mb-4">
                    {sourcedFromSurvey
                      ? 'Chúng tôi đã chuẩn bị sẵn thông tin từ kết quả khảo sát của bạn. Chỉ cần xác nhận và chuyên gia sẽ liên hệ lại.'
                      : 'Chúng tôi sẽ tiếp nhận thông tin và phản hồi trong vòng 24 giờ làm việc. Nếu câu hỏi của bạn cần trao đổi sâu hơn, một buổi tư vấn sẽ được sắp xếp phù hợp.'}
                  </p>
                  {status === 'loading' && (
                    <div className="rounded-4 border p-4 bg-light-subtle">
                      <div className="d-flex justify-content-center mb-3">
                        <BrandMascot mood="thinking" compact />
                      </div>
                      <div className="placeholder-glow">
                        <span className="placeholder col-7 mb-3" />
                        <span className="placeholder col-5 mb-3" />
                        <span className="placeholder col-12 mb-2" />
                        <span className="placeholder col-10 mb-2" />
                        <span className="placeholder col-8" />
                      </div>
                    </div>
                  )}

                  {status !== 'loading' && status !== 'success' && (
                    <>
                      {sourcedFromSurvey && (
                        <Alert variant="info" className="rounded-4 border-0 mb-4">
                          <div className="d-flex justify-content-between align-items-start gap-3">
                            <div>
                              <div className="fw-semibold">Chúng tôi đã nhận được thông tin từ khảo sát</div>
                              <div className="small text-muted">Phụ huynh: <strong>{formData.name || '—'}</strong> • trẻ: <strong>{formData.childAge || '—'}</strong></div>
                            </div>
                            <div>
                              <Button variant="outline-primary" size="sm" onClick={handleEditPrefill}>Chỉnh sửa</Button>
                            </div>
                          </div>
                        </Alert>
                      )}

                      <Form ref={formRef} onSubmit={handleSubmit} noValidate>
                      <Row className="g-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="fw-semibold">Tên của bạn</Form.Label>
                            <AppInput name="name" value={formData.name} onChange={handleChange} placeholder="Ví dụ: Chị Hương" isInvalid={!!errors.name} />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="fw-semibold">Số điện thoại</Form.Label>
                            <AppInput name="phone" value={formData.phone} onChange={handleChange} placeholder="0909 123 456" isInvalid={!!errors.contact} />
                            <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="fw-semibold">Email</Form.Label>
                            <AppInput type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" isInvalid={!!errors.email} />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="fw-semibold">Tuổi của trẻ</Form.Label>
                            <AppInput name="childAge" value={formData.childAge} onChange={handleChange} placeholder="Ví dụ: 3 tuổi" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="fw-semibold">Thời gian mong muốn được liên hệ</Form.Label>
                            <AppInput name="preferredTime" value={formData.preferredTime} onChange={handleChange} placeholder="Ví dụ: sáng mai, cuối tuần" />
                          </Form.Group>
                        </Col>
                        <Col xs={12}>
                          <Form.Group>
                            <Form.Label className="fw-semibold">Nội dung cần hỗ trợ</Form.Label>
                            <AppInput as="textarea" rows={5} name="message" value={formData.message} onChange={handleChange} placeholder="Bạn đang băn khoăn điều gì về sự phát triển của trẻ? Hãy chia sẻ để chúng tôi hỗ trợ phù hợp." isInvalid={!!errors.message} />
                            <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col xs={12}>
                          <Form.Check
                            name="agreement"
                            label={`Tôi đồng ý để ${siteConfig.name} liên hệ lại cho tôi về nhu cầu tư vấn này.`}
                            checked={formData.agreement}
                            onChange={handleChange}
                            isInvalid={!!errors.agreement}
                          />
                          {errors.agreement && <div className="text-danger small mt-1">{errors.agreement}</div>}
                        </Col>
                      </Row>

                      {status === 'error' && (
                        <Alert variant="warning" className="rounded-4 border-0 mt-4">
                          Vui lòng kiểm tra lại các trường còn thiếu trước khi gửi.
                        </Alert>
                      )}

                      <div className="d-flex flex-wrap gap-3 mt-4">
                        <Button variant="primary" type="submit" disabled={status === 'loading'}>
                          {status === 'loading' ? 'Đang gửi...' : sourcedFromSurvey ? 'Xác nhận đăng ký' : 'Nhận tư vấn'}
                        </Button>
                        <Button variant="outline-primary" type="button" onClick={() => {
                          setFormData({ name: '', phone: '', email: '', childAge: '', message: '', preferredTime: '', agreement: false });
                          clearConsultationData();
                          navigate('/survey');
                        }}>
                          Làm mới
                        </Button>
                      </div>
                      </Form>
                    </>
                  )}

                  {status === 'success' && (
                    <div className="rounded-4 border border-success-subtle bg-success-subtle p-4">
                      <div className="d-flex justify-content-center mb-3">
                        <BrandMascot mood="confirm" compact />
                      </div>
                      <div className="d-flex align-items-center gap-2 text-success fw-semibold mb-3">
                        <span>✓</span>
                        <span>Cảm ơn bạn đã đăng ký tư vấn.</span>
                      </div>
                      <p className="text-muted mb-4">
                        Chúng tôi đã nhận được yêu cầu và sẽ liên hệ với bạn trong thời gian sớm nhất. Thông tin bạn cung cấp đã được lưu lại để hỗ trợ chuyên gia hiểu rõ hơn về nhu cầu của gia đình.
                      </p>
                      <Row className="g-3 mb-4">
                        {confirmationSteps.map((step, index) => (
                          <Col md={6} lg={2} key={step}>
                            <div className="text-center p-3 rounded-4 bg-white h-100">
                              <div className="timeline-badge rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2">{index + 1}</div>
                              <p className="small fw-semibold mb-0">{step}</p>
                            </div>
                          </Col>
                        ))}
                      </Row>
                      <div className="d-flex flex-wrap gap-3">
                        <Button as="a" href="/" variant="primary">Quay về Trang chủ</Button>
                        <Button as="a" href="/programs" variant="outline-primary">Xem lại chương trình</Button>
                        <Button as="a" href={`mailto:${contactInfo.email}`} variant="outline-primary">Tải tài liệu miễn phí</Button>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5}>
              <Card className="border-0 rounded-4 shadow-sm h-100">
                <Card.Body className="p-4 p-lg-5">
                  <p className="text-primary fw-semibold mb-2">Cam kết</p>
                  <h3 className="h4 fw-bold mb-3">Một trải nghiệm tư vấn nhẹ nhàng và đáng tin cậy</h3>
                  <ul className="ps-3 text-muted mb-4">
                    <li>Phản hồi trong vòng 24 giờ làm việc.</li>
                    <li>Bảo mật thông tin cá nhân và nội dung trao đổi.</li>
                    <li>Không phát sinh chi phí cho buổi tư vấn ban đầu.</li>
                  </ul>
                  <div className="rounded-4 p-3 bg-light-subtle">
                    <h4 className="h6 fw-bold mb-2">Gần đây nhiều phụ huynh lựa chọn</h4>
                    <p className="text-muted small mb-0">Đặt lịch tư vấn qua hotline hoặc để lại thông tin để được chuyên gia liên hệ lại trong ngày.</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        <section id="consultation-process" className="mb-5 fade-in-up">
          <Card className="border-0 rounded-4 shadow-sm">
            <Card.Body className="p-4 p-lg-5">
              <p className="text-primary fw-semibold mb-2">Quy trình tư vấn</p>
              <h2 className="h3 fw-bold mb-4">Một quy trình rõ ràng giúp bạn yên tâm từng bước</h2>
              <Row className="g-3">
                {consultationSteps.map((step, index) => (
                  <Col md={6} lg={2} key={step}>
                    <div className="timeline-step text-center p-3 rounded-4 h-100">
                      <div className="timeline-badge rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2">{index + 1}</div>
                      <p className="fw-semibold mb-0">{step}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </section>

        <section className="mb-5 fade-in-up">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
            <div>
              <p className="text-primary fw-semibold mb-2">Đội ngũ</p>
              <h2 className="h3 fw-bold mb-0">Những người luôn sẵn sàng lắng nghe và đồng hành</h2>
            </div>
          </div>
          <Row className="g-4">
            {teamMembers.map((member) => (
              <Col md={6} lg={4} key={member.name}>
                <Card className="border-0 rounded-4 shadow-soft h-100">
                  <Card.Body className="p-0">
                    <img src={member.image} alt={member.name} className="img-fluid w-100" style={{ height: '220px', objectFit: 'cover' }} />
                    <div className="p-4">
                      <h3 className="h5 fw-bold mb-1">{member.name}</h3>
                      <p className="text-primary fw-semibold mb-2">{member.specialization}</p>
                      <p className="text-muted mb-0">{member.focus}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="mb-5 fade-in-up">
          <Card className="border-0 rounded-4 shadow-sm">
            <Card.Body className="p-4 p-lg-5">
              <p className="text-primary fw-semibold mb-2">Câu hỏi thường gặp</p>
              <h2 className="h3 fw-bold mb-4">Những điều phụ huynh thường quan tâm</h2>
              <Accordion alwaysOpen>
                {faqItems.map((item) => (
                  <Accordion.Item eventKey={item.question} key={item.question}>
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </section>

        <section className="pb-4 fade-in-up">
          <Card className="border-0 rounded-4 shadow-soft bg-gradient-primary text-dark">
            <Card.Body className="p-4 p-lg-5 text-center">
              <h2 className="h3 fw-bold mb-3">Hãy để {siteConfig.name} đồng hành cùng gia đình bạn.</h2>
              <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
                Cho dù bạn đang cần lời khuyên đầu tiên hay muốn tìm hiểu thêm về một chương trình phù hợp, chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button variant="primary" size="lg" href={`mailto:${contactInfo.email}`} as="a">
                  Đăng ký tư vấn
                </Button>
                <Button variant="outline-primary" size="lg" href="tel:0909123456" as="a">
                  Gọi ngay
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </div>
  );
}

export default ContactPage;
