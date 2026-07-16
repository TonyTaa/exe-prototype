import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Accordion, ListGroup, Image } from 'react-bootstrap';
import { programs } from '../data/content';
import AppButton from '../components/ui/AppButton';
import PageHero from '../components/layout/PageHero';

function ProgramDetailPage() {
  const { slug } = useParams();

  const program = useMemo(() => programs.find((item) => item.slug === slug), [slug]);
  const relatedPrograms = useMemo(() => programs.filter((item) => item.slug !== slug).slice(0, 2), [slug]);

  if (!program) {
    return (
      <Container className="py-5">
        <h1 className="h3 fw-bold">Không tìm thấy chương trình</h1>
        <Button as={Link} to="/programs" variant="primary" className="mt-3">
          Quay lại danh sách chương trình
        </Button>
      </Container>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Chương trình dành cho trẻ"
        title={program.title}
        description={program.description}
        actions={[
          <AppButton key="survey" as={Link} to="/survey" variant="primary" size="lg">Khảo sát ngay</AppButton>,
          <AppButton key="contact" as={Link} to="/contact" variant="outline-primary" size="lg">Đăng ký tư vấn</AppButton>,
        ]}
        image={program.image}
        imageAlt={program.title}
      >
        <AppButton
          as={Link}
          to="/programs"
          variant="outline-primary"
          size="md"
          className="mb-4 mt-4"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Quay lại danh sách chương trình
        </AppButton>
      </PageHero>

      {/* Quick Info */}
      <section className="section-shell">
        <Container>
          <Row className="g-4 mb-5">
            <Col md={6} lg={3}>
              <Card className="border-0 detail-surface-card h-100">
                <Card.Body className="text-center">
                  <p className="text-primary fs-3 mb-2">📅</p>
                  <h3 className="h6 fw-bold mb-2">Thời lượng</h3>
                  <p className="text-muted mb-0">{program.duration}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="border-0 detail-surface-card h-100">
                <Card.Body className="text-center">
                  <p className="text-primary fs-3 mb-2">👥</p>
                  <h3 className="h6 fw-bold mb-2">Hình thức</h3>
                  <p className="text-muted mb-0">{program.format}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="border-0 detail-surface-card h-100">
                <Card.Body className="text-center">
                  <p className="text-primary fs-3 mb-2">👶</p>
                  <h3 className="h6 fw-bold mb-2">Độ tuổi</h3>
                  <p className="text-muted mb-0">{program.ageRange}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="border-0 detail-surface-card h-100">
                <Card.Body className="text-center">
                  <p className="text-primary fs-3 mb-2">💬</p>
                  <h3 className="h6 fw-bold mb-2">Tư vấn</h3>
                  <p className="text-muted mb-0">{program.consultation ? '✓ Có' : '✗ Không'}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Who is this for */}
      <section className="section-shell section-shell--soft">
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="border-0 detail-surface-card h-100">
                <Card.Body>
                  <div className="section-heading-row">
                    <span className="section-kicker">🎯 Chương trình phù hợp với ai?</span>
                    <h2>Những trẻ phù hợp nhất với lộ trình này</h2>
                    <p className="section-description">Lộ trình được thiết kế để hỗ trợ những trẻ đang cần thêm cơ hội thực hành và phản hồi rõ ràng.</p>
                  </div>
                  <ul className="list-unstyled mb-0">
                    {program.symptoms.map((symptom) => (
                      <li key={symptom} className="detail-list-item">
                        <span className="detail-list-icon">✓</span>
                        <span className="text-muted">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="border-0 detail-surface-card h-100">
                <Card.Body>
                  <div className="section-heading-row">
                    <span className="section-kicker">✨ trẻ sẽ học những gì?</span>
                    <h2>Các kỹ năng và hoạt động giúp trẻ tiến bộ từng bước</h2>
                    <p className="section-description">Mỗi hoạt động đều tập trung vào một mục tiêu phát triển cụ thể, vừa vui vừa có cấu trúc.</p>
                  </div>
                  <ul className="list-unstyled mb-0">
                    {program.goals.map((goal) => (
                      <li key={goal} className="detail-list-item">
                        <span className="detail-list-icon">★</span>
                        <span className="text-muted">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Teaching Methods */}
      <section className="section-shell">
        <Container>
          <div className="section-heading-row">
            <span className="section-kicker">🧠 Phương pháp giảng dạy</span>
            <h2>Giáo án được thiết kế vừa nhẹ nhàng vừa hiệu quả</h2>
            <p className="section-description">Mỗi hoạt động đều có mục tiêu rõ ràng, phù hợp với nhu cầu riêng của từng trẻ và gia đình.</p>
          </div>
          <Row className="g-4">
            {program.teachingMethods.map((method, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="border-0 detail-surface-card h-100 transition">
                  <Card.Body>
                    <div className="section-icon-circle mb-3">{index + 1}</div>
                    <p className="text-muted mb-0">{method}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Timeline */}
      <section className="section-shell section-shell--soft">
        <Container>
          <div className="section-heading-row">
            <span className="section-kicker">🗓️ Lộ trình học tập</span>
            <h2>Từng giai đoạn được chia rõ để phụ huynh dễ theo dõi</h2>
            <p className="section-description">Mỗi bước đều có mục tiêu và cách hỗ trợ cụ thể để trẻ tiến bộ một cách tự nhiên.</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={10}>
              {program.timeline.map((item, index) => (
                <div key={item.week}>
                  <Card className="border-0 detail-surface-card mb-4">
                    <Card.Body className="d-flex gap-4">
                      <div className="detail-list-icon" style={{ width: '60px', height: '60px', minWidth: '60px', fontSize: '14px' }}>
                        {item.week}
                      </div>
                      <div>
                        <h3 className="h6 fw-bold mb-1">{item.title}</h3>
                        <p className="text-muted mb-0">{item.description}</p>
                      </div>
                    </Card.Body>
                  </Card>
                  {index < program.timeline.length - 1 && (
                    <div className="text-center mb-3 text-primary fw-bold">↓</div>
                  )}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Expected Results */}
      <section className="section-shell">
        <Container>
          <div className="section-heading-row">
            <span className="section-kicker">🎯 Kết quả mong đợi</span>
            <h2>Những tiến bộ trẻ có thể thấy rõ hơn sau từng giai đoạn</h2>
            <p className="section-description">Các mục tiêu được truyền tải rõ ràng để phụ huynh hiểu được hướng đi và giá trị của quá trình học.</p>
          </div>
          <Row className="g-4">
            {program.expectedResults.map((result) => (
              <Col md={6} lg={3} key={result}>
                <Card className="border-0 detail-surface-card h-100 transition">
                  <Card.Body>
                    <p className="text-primary fs-3 mb-2">🎯</p>
                    <p className="text-muted mb-0">{result}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Activity Images */}
      <section className="section-shell section-shell--soft">
        <Container>
          <div className="section-heading-row">
            <span className="section-kicker">📸 Hình ảnh hoạt động</span>
            <h2>Những trải nghiệm gần gũi và giàu cảm xúc</h2>
            <p className="section-description">Các hoạt động được thiết kế để trẻ học thông qua trò chơi, quan sát và tương tác tự nhiên.</p>
          </div>
          <Row className="g-4">
            {program.activityImages.map((image, index) => (
              <Col md={6} key={index}>
                <img
                  src={image}
                  alt={`Hoạt động ${index + 1}`}
                  className="img-fluid rounded-4 shadow-sm"
                  loading="lazy"
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Reviews */}
      <section className="section-shell">
        <Container>
          <div className="section-heading-row">
            <span className="section-kicker">💬 Đánh giá của phụ huynh</span>
            <h2>Những phản hồi tích cực từ gia đình đã đồng hành</h2>
            <p className="section-description">Đây là những câu chuyện thực tế về tiến bộ của trẻ và niềm tin của phụ huynh trong suốt hành trình.</p>
          </div>
          <Row className="g-4">
            {program.reviews && program.reviews.map((review, index) => (
              <Col md={6} key={index}>
                <Card className="border-0 detail-surface-card h-100">
                  <Card.Body>
                    <div className="mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-warning">★</span>
                      ))}
                    </div>
                    <p className="text-muted mb-3">{review.text}</p>
                    <div className="border-top pt-3">
                      <p className="fw-bold small mb-0">{review.name}</p>
                      <p className="text-muted small mb-0">{review.role}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-shell section-shell--soft">
        <Container>
          <div className="section-heading-row">
            <span className="section-kicker">❓ Câu hỏi thường gặp</span>
            <h2>Những điều phụ huynh thường quan tâm nhất</h2>
            <p className="section-description">Thông tin được trình bày rõ ràng để bạn dễ dàng quyết định lộ trình phù hợp cho con.</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion defaultActiveKey="0" className="shadow-sm rounded-4 overflow-hidden">
                {program.programFaqs.map((faq, index) => (
                  <Accordion.Item eventKey={String(index)} key={faq.question} className="border-0">
                    <Accordion.Header className="fw-semibold">{faq.question}</Accordion.Header>
                    <Accordion.Body className="text-muted">{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Related Programs */}
      {relatedPrograms.length > 0 && (
        <section className="section-shell section-shell--soft">
          <Container>
            <div className="section-heading-row">
              <span className="section-kicker">🔗 Các chương trình liên quan</span>
              <h2>Khám phá thêm những lộ trình phù hợp khác</h2>
              <p className="section-description">Nếu chương trình này phù hợp với nhu cầu hiện tại, nhiều lựa chọn khác cũng có thể hỗ trợ trẻ tốt hơn.</p>
            </div>
            <Row className="g-4">
              {relatedPrograms.map((relProgram) => (
                <Col md={6} lg={4} key={relProgram.id}>
                  <Card className="h-100 border-0 detail-surface-card transition">
                    <img
                      src={relProgram.image}
                      alt={relProgram.title}
                      className="card-img-top rounded-4"
                      style={{ height: '180px', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <Card.Body>
                      <h3 className="h6 fw-bold mb-2">{relProgram.title}</h3>
                      <p className="text-muted small mb-3">{relProgram.description}</p>
                      <AppButton as={Link} to={`/programs/${relProgram.slug}`} variant="primary" size="sm">
                        Xem chi tiết
                      </AppButton>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-shell">
        <Container>
          <Card className="border-0 playful-card bg-primary p-4 text-center">
            <h2 className="h3 fw-bold mb-3">Sẵn sàng bắt đầu?</h2>
            <p className="text-muted mb-4">Liên hệ chúng tôi ngay để được tư vấn chi tiết về chương trình và lên lịch khảo sát miễn phí.</p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <AppButton as={Link} to="/survey" variant="warning" size="lg">Khảo sát miễn phí</AppButton>
              <AppButton as={Link} to="/contact" variant="outline-primary" size="lg">Liên hệ tư vấn</AppButton>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}

export default ProgramDetailPage;
