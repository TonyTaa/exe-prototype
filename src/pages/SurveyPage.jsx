import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, ProgressBar, Button, Alert, Badge } from 'react-bootstrap';
import AppInput from '../components/ui/AppInput';
import AppSelect from '../components/ui/AppSelect';
import { concernOptions, impactLevels, learningModes, regions, symptomOptions } from '../data/content';
import { useConsultation } from '../context/ConsultationContext';
import PageHero from '../components/layout/PageHero';

const steps = [
  { key: 'parentInfo', title: 'Thông tin phụ huynh', description: 'Chúng mình bắt đầu bằng một vài thông tin cơ bản để hiểu nhu cầu của gia đình.' },
  { key: 'childInfo', title: 'Thông tin của trẻ', description: 'Những chi tiết nhỏ này giúp gợi ý chương trình phù hợp hơn với lứa tuổi và phong cách phát triển.' },
  { key: 'concerns', title: 'Biểu hiện hiện tại', description: 'Bạn có thể chọn nhiều biểu hiện để giúp chúng mình hiểu rõ hơn về những điểm trẻ đang phát triển.' },
  { key: 'preferences', title: 'Mong muốn của phụ huynh', description: 'Sau cùng, hãy cho biết điều bạn mong muốn nhất cho trẻ.' },
  { key: 'results', title: 'Xem gợi ý', description: 'Bạn sẽ nhận được một lộ trình đề xuất nhẹ nhàng và dễ hiểu.' },
];

function SurveyPage() {
  const navigate = useNavigate();
  const { setConsultationData } = useConsultation();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    parentName: '',
    childName: '',
    age: '',
    gender: '',
    mainConcern: '',
    symptoms: [],
    impact: '',
    goal: '',
    learningMode: '',
    region: '',
    contact: '',
  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!form.parentName.trim()) newErrors.parentName = 'Vui lòng nhập họ tên phụ huynh';
      if (!form.contact.trim()) newErrors.contact = 'Vui lòng nhập thông tin liên hệ';
    }
    if (step === 1) {
      if (!form.childName.trim()) newErrors.childName = 'Vui lòng nhập họ tên trẻ';
      if (!form.age.trim()) newErrors.age = 'Vui lòng nhập tuổi';
      if (!form.gender) newErrors.gender = 'Vui lòng chọn giới tính';
    }
    if (step === 2) {
      if (!form.mainConcern) newErrors.mainConcern = 'Vui lòng chọn nhóm phát triển chính';
      if (form.symptoms.length === 0) newErrors.symptoms = 'Vui lòng chọn ít nhất một biểu hiện';
    }
    if (step === 3) {
      if (!form.impact) newErrors.impact = 'Vui lòng chọn mức độ ảnh hưởng';
      if (!form.goal.trim()) newErrors.goal = 'Vui lòng nhập mục tiêu mong muốn';
      if (!form.learningMode) newErrors.learningMode = 'Vui lòng chọn hình thức học';
      if (!form.region) newErrors.region = 'Vui lòng chọn khu vực sinh sống';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      if (!validateStep()) return;
      setStep((current) => current + 1);
      setErrors({});
      return;
    }

    const surveyPayload = {
      parentName: form.parentName,
      contact: form.contact,
      childName: form.childName,
      age: form.age,
      gender: form.gender,
      mainConcern: form.mainConcern,
      symptoms: form.symptoms,
      impact: form.impact,
      goal: form.goal,
      learningMode: form.learningMode,
      region: form.region,
      submittedAt: new Date().toISOString(),
    };

    setConsultationData(surveyPayload);
    navigate('/recommendation', { state: surveyPayload });
  };

  const handlePrevious = () => {
    setStep((current) => current - 1);
    setErrors({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSymptomToggle = (value) => {
    setForm((current) => ({
      ...current,
      symptoms: current.symptoms.includes(value)
        ? current.symptoms.filter((item) => item !== value)
        : [...current.symptoms, value],
    }));
  };

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const trustBadges = [
    { icon: '⏱️', label: 'Chỉ mất khoảng 2 phút' },
    { icon: '🔒', label: 'Thông tin được bảo mật' },
    { icon: '👩‍⚕️', label: 'Gợi ý dựa trên định hướng chuyên môn' },
  ];

  return (
    <div>
      <PageHero
        eyebrow="Khảo sát đồng hành cùng trẻ"
        title="Khảo sát hôm nay, đồng hành dài lâu"
        description="Chỉ với vài phút khảo sát, phụ huynh sẽ có cái nhìn tổng quan về sự phát triển của trẻ và nhận những gợi ý phù hợp với nhu cầu của con"
        actions={[
          <Button key="contact" as={Link} to="/contact" variant="outline-primary">Liên hệ tư vấn</Button>,
        ]}
        image="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
        imageAlt="Trẻ em và phụ huynh trong môi trường học tập"
      />
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-2">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="d-flex align-items-center gap-2 px-3 py-2 bg-white rounded-3 shadow-sm">
                  <span>{badge.icon}</span>
                  <small className="text-muted fw-semibold">{badge.label}</small>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={9}>
            <Card className="border-0 shadow-soft rounded-4 section-card-soft">
              <Card.Body className="p-4 p-lg-5">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                  <div>
                    <p className="text-primary fw-semibold mb-1">Bước hiện tại</p>
                    <h2 className="h4 fw-bold mb-0">{steps[step].title}</h2>
                  </div>
                  <Badge bg="light" text="dark" className="fs-6">
                    {step + 1}/{steps.length}
                  </Badge>
                </div>

                <ProgressBar now={progress} className="mb-4" style={{ height: '10px' }} />
                <p className="text-muted mb-4">{steps[step].description}</p>

                {step === 0 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Họ tên phụ huynh</Form.Label>
                      <AppInput name="parentName" value={form.parentName} onChange={handleChange} placeholder="Ví dụ: Chị Hương" />
                      {errors.parentName && <div className="text-danger small mt-1">{errors.parentName}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Thông tin liên hệ</Form.Label>
                      <AppInput name="contact" value={form.contact} onChange={handleChange} placeholder="Số điện thoại hoặc email" />
                      {errors.contact && <div className="text-danger small mt-1">{errors.contact}</div>}
                    </Form.Group>
                  </>
                )}

                {step === 1 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Họ tên trẻ</Form.Label>
                      <AppInput name="childName" value={form.childName} onChange={handleChange} placeholder="Ví dụ: Bảo An" />
                      {errors.childName && <div className="text-danger small mt-1">{errors.childName}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Tuổi</Form.Label>
                      <AppInput name="age" value={form.age} onChange={handleChange} placeholder="Ví dụ: 3 tuổi" />
                      {errors.age && <div className="text-danger small mt-1">{errors.age}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Giới tính</Form.Label>
                      <AppSelect name="gender" value={form.gender} onChange={handleChange}>
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </AppSelect>
                      {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
                    </Form.Group>
                  </>
                )}

                {step === 2 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Nhóm phát triển chính</Form.Label>
                      <AppSelect name="mainConcern" value={form.mainConcern} onChange={handleChange}>
                        <option value="">Chọn nhóm phù hợp</option>
                        {concernOptions.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </AppSelect>
                      {errors.mainConcern && <div className="text-danger small mt-1">{errors.mainConcern}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Bạn có thể chọn nhiều biểu hiện phù hợp với trẻ</Form.Label>
                      <div className="row g-3 mt-1">
                        {symptomOptions.map((item) => {
                          const selected = form.symptoms.includes(item);
                          return (
                            <div className="col-md-6" key={item}>
                              <Card
                                role="checkbox"
                                aria-checked={selected}
                                tabIndex={0}
                                onClick={() => handleSymptomToggle(item)}
                                onKeyDown={(event) => {
                                  if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    handleSymptomToggle(item);
                                  }
                                }}
                                className={`h-100 border ${selected ? 'border-primary shadow-sm' : 'border-light'}`}
                                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                              >
                                <Card.Body className="d-flex align-items-center gap-3">
                                  <div className={`rounded-circle d-flex align-items-center justify-content-center ${selected ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: '38px', height: '38px' }}>
                                    {selected ? '✓' : '•'}
                                  </div>
                                  <span className="fw-semibold">{item}</span>
                                </Card.Body>
                              </Card>
                            </div>
                          );
                        })}
                      </div>
                      {errors.symptoms && <div className="text-danger small mt-1">{errors.symptoms}</div>}
                    </Form.Group>
                  </>
                )}

                {step === 3 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Mức độ ảnh hưởng</Form.Label>
                      <AppSelect name="impact" value={form.impact} onChange={handleChange}>
                        <option value="">Chọn mức độ</option>
                        {impactLevels.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </AppSelect>
                      {errors.impact && <div className="text-danger small mt-1">{errors.impact}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Mục tiêu mong muốn</Form.Label>
                      <AppInput name="goal" value={form.goal} onChange={handleChange} placeholder="Ví dụ: trẻ tự tin giao tiếp hơn" />
                      {errors.goal && <div className="text-danger small mt-1">{errors.goal}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Hình thức học</Form.Label>
                      <AppSelect name="learningMode" value={form.learningMode} onChange={handleChange}>
                        <option value="">Chọn hình thức</option>
                        {learningModes.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </AppSelect>
                      {errors.learningMode && <div className="text-danger small mt-1">{errors.learningMode}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Khu vực sinh sống</Form.Label>
                      <AppSelect name="region" value={form.region} onChange={handleChange}>
                        <option value="">Chọn khu vực</option>
                        {regions.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </AppSelect>
                      {errors.region && <div className="text-danger small mt-1">{errors.region}</div>}
                    </Form.Group>
                  </>
                )}

                {step === 4 && (
                  <Card className="border-0 rounded-4 bg-light-subtle shadow-soft">
                    <Card.Body>
                      <h3 className="h5 fw-bold mb-3">Thông tin bạn vừa chia sẻ</h3>
                      <Row className="g-3">
                        <Col md={6}>
                          <p className="fw-semibold mb-1">Phụ huynh</p>
                          <p className="text-muted mb-0">{form.parentName || '—'}</p>
                        </Col>
                        <Col md={6}>
                          <p className="fw-semibold mb-1">trẻ</p>
                          <p className="text-muted mb-0">{form.childName || '—'} · {form.age || '—'}</p>
                        </Col>
                        <Col md={6}>
                          <p className="fw-semibold mb-1">Nhóm phát triển</p>
                          <p className="text-muted mb-0">{form.mainConcern || '—'}</p>
                        </Col>
                        <Col md={6}>
                          <p className="fw-semibold mb-1">Mục tiêu</p>
                          <p className="text-muted mb-0">{form.goal || '—'}</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}

                <Alert variant="info" className="rounded-4 border-0 mt-4">
                  Đây chỉ là khảo sát ban đầu để đề xuất chương trình phù hợp. Kết quả không thay thế đánh giá chuyên gia.
                </Alert>

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="outline-primary" onClick={handlePrevious} disabled={step === 0}>
                    Quay lại
                  </Button>
                  <Button variant="primary" onClick={handleNext}>
                    {step === steps.length - 1 ? 'Xem gợi ý' : 'Tiếp tục'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SurveyPage;
