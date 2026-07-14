import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { featuredPrograms } from '../data/content';
import { useConsultation } from '../context/ConsultationContext';
import BrandMascot from '../components/ui/BrandMascot';

function RecommendationPage() {
  const location = useLocation();
  const { consultationData } = useConsultation();
  const form = location.state || consultationData || {};

  const recommendedProgram = featuredPrograms[0];
  const relatedPrograms = featuredPrograms.slice(1);
  const reasons = [
    'Lộ trình được xây dựng riêng cho những nhu cầu phát triển phù hợp với trẻ.',
    'Cách tiếp cận nhẹ nhàng, tích cực và dễ áp dụng cùng phụ huynh.',
    'Có thể kết hợp với tư vấn chuyên môn để theo dõi tiến bộ lâu dài.',
  ];
  const freeResources = [
    { title: 'Checklist các mốc phát triển theo độ tuổi', description: 'Những dấu hiệu nên quan tâm ở từng giai đoạn.', cta: 'Tải miễn phí' },
    { title: 'Hoạt động kích thích ngôn ngữ tại nhà', description: 'Những hoạt động ngắn, vui và phù hợp cho phụ huynh.', cta: 'Tải miễn phí' },
    { title: 'Trò chơi phát triển giao tiếp', description: 'Các trò chơi giúp trẻ tương tác tự tin hơn.', cta: 'Tải miễn phí' },
    { title: 'Bài tập vận động đơn giản', description: 'Những bài tập nhẹ nhàng để trẻ vận động mỗi ngày.', cta: 'Tải miễn phí' },
  ];
  const nextSteps = [
    'Hoàn thành khảo sát',
    'Nhận gợi ý phù hợp',
    'Đăng ký tư vấn',
    'Chuyên gia liên hệ',
    'Xây dựng lộ trình phù hợp',
  ];

  return (
    <div className="py-5 py-lg-6 bg-light-subtle">
      <Container>
        <section className="mb-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <p className="text-primary fw-semibold mb-3">Kết quả khảo sát</p>
              <h1 className="display-6 fw-bold mb-3">Cảm ơn phụ huynh đã dành thời gian cho trẻ</h1>
              <p className="lead text-muted mb-4">
                Dựa trên những thông tin bạn vừa chia sẻ, chúng mình đã sàng lọc một số chương trình phù hợp nhất để trẻ có thể phát triển tự tin hơn.
              </p>
              <div className="d-flex justify-content-center mt-4">
                <BrandMascot mood="reassure" />
              </div>
            </Col>
          </Row>
        </section>

        <Alert variant="info" className="rounded-4 border-0 mb-4">
          Kết quả này chỉ là bước sàng lọc ban đầu và không thay thế đánh giá chuyên môn. Nếu cần, phụ huynh có thể đăng ký tư vấn để nhận lời khuyên phù hợp hơn.
        </Alert>

        <Row className="g-4 mb-4">
          <Col lg={8}>
            <Card className="border-0 rounded-4 shadow-sm mb-4">
              <Card.Body>
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                  <div>
                    <p className="text-primary fw-semibold mb-1">Tóm tắt thông tin</p>
                    <h2 className="h4 fw-bold mb-0">trẻ của bạn có thể phù hợp với lộ trình phát triển tích cực</h2>
                  </div>
                  <Badge bg="light" text="dark">Gợi ý ban đầu</Badge>
                </div>
                <Row className="g-3">
                  <Col md={6}>
                    <p className="fw-semibold mb-1">Tên trẻ</p>
                    <p className="text-muted mb-0">{form.childName || '—'}</p>
                  </Col>
                  <Col md={6}>
                    <p className="fw-semibold mb-1">Độ tuổi</p>
                    <p className="text-muted mb-0">{form.age || '—'}</p>
                  </Col>
                  <Col md={6}>
                    <p className="fw-semibold mb-1">Nhóm phát triển</p>
                    <p className="text-muted mb-0">{form.mainConcern || '—'}</p>
                  </Col>
                  <Col md={6}>
                    <p className="fw-semibold mb-1">Khu vực</p>
                    <p className="text-muted mb-0">{form.region || '—'}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 rounded-4 shadow-sm">
              <Card.Body>
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                  <div>
                    <p className="text-primary fw-semibold mb-1">Chương trình được đề xuất</p>
                    <h3 className="h4 fw-bold mb-0">{recommendedProgram.title}</h3>
                  </div>
                  <Badge bg="light" text="dark">Phù hợp cho khởi đầu</Badge>
                </div>
                <Row className="g-4 align-items-center">
                  <Col md={5}>
                    <img src={recommendedProgram.image} alt={recommendedProgram.title} className="img-fluid rounded-4" loading="lazy" />
                  </Col>
                  <Col md={7}>
                    <p className="text-muted mb-3">Độ tuổi: {recommendedProgram.ageRange} • Thời lượng: {recommendedProgram.duration}</p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {recommendedProgram.goals.slice(0, 3).map((goal) => (
                        <Badge key={goal} bg="light" text="dark">{goal}</Badge>
                      ))}
                    </div>
                    <ul className="ps-3 text-muted mb-3">
                      {recommendedProgram.skills.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <Button as={Link} to="/programs" variant="primary">Xem chi tiết</Button>
                      <Button as={Link} to="/contact" state={form} variant="outline-primary">Đăng ký tư vấn với chuyên gia</Button>
                    </div>
                    <p className="text-muted small mb-0">Thông tin khảo sát sẽ được tự động chuyển sang form tư vấn, giúp bạn không cần nhập lại.</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 rounded-4 shadow-sm mb-4">
              <Card.Body>
                <h3 className="h5 fw-bold mb-3">Vì sao chương trình này phù hợp?</h3>
                <div className="d-grid gap-3">
                  {reasons.map((reason) => (
                    <div key={reason} className="d-flex gap-2 align-items-start">
                      <span className="text-primary fw-bold">✓</span>
                      <span className="text-muted small">{reason}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 rounded-4 shadow-sm">
              <Card.Body>
                <h3 className="h5 fw-bold mb-3">Chương trình liên quan</h3>
                <div className="d-grid gap-3">
                  {relatedPrograms.map((program) => (
                    <div key={program.id} className="border rounded-4 p-3">
                      <h4 className="h6 fw-bold mb-1">{program.title}</h4>
                      <p className="text-muted small mb-2">{program.ageRange} • {program.duration}</p>
                      <Button as={Link} to="/programs" variant="outline-primary" size="sm">
                        Xem chi tiết
                      </Button>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <section className="mb-5">
          <Card className="border-0 rounded-4 shadow-sm">
            <Card.Body>
              <h3 className="h4 fw-bold mb-3">Tài liệu miễn phí dành cho phụ huynh</h3>
              <Row className="g-3">
                {freeResources.map((resource) => (
                  <Col md={6} lg={3} key={resource.title}>
                    <Card className="h-100 border-0 rounded-4 bg-light-subtle">
                      <Card.Body>
                        <h4 className="h6 fw-bold mb-2">{resource.title}</h4>
                        <p className="text-muted small mb-3">{resource.description}</p>
                        <Button as={Link} to="/contact" variant="outline-primary" size="sm">
                          {resource.cta}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </section>

        <section className="mb-5">
          <Card className="border-0 rounded-4 shadow-sm">
            <Card.Body>
              <h3 className="h4 fw-bold mb-3">Quy trình sau khảo sát</h3>
              <Row className="g-3">
                {nextSteps.map((item, index) => (
                  <Col md={6} lg={2} key={item}>
                    <div className="text-center p-3 rounded-4 bg-light-subtle h-100">
                      <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto text-white fw-bold mb-2" style={{ width: '36px', height: '36px' }}>
                        {index + 1}
                      </div>
                      <p className="small fw-semibold mb-0">{item}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </section>

        <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
          <Button as={Link} to="/survey" variant="outline-primary">Khảo sát lại</Button>
          <Button as={Link} to="/contact" state={form} variant="primary">Đăng ký tư vấn</Button>
        </div>
      </Container>
    </div>
  );
}

export default RecommendationPage;
