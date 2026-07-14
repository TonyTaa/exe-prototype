import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { programs, trustBadges } from '../data/content';
import AppButton from '../components/ui/AppButton';
import PageHero from '../components/layout/PageHero';

function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAge, setSelectedAge] = useState('');

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAge = !selectedAge || program.ageRange.includes(selectedAge);
    return matchesSearch && matchesAge;
  });

  const handleReset = () => {
    setSearchTerm('');
    setSelectedAge('');
  };

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('[data-program-card]'));
    if (!cards.length) return undefined;

    const balanceHeights = () => {
      const heights = cards.map((card) => card.getBoundingClientRect().height);
      const maxHeight = Math.max(...heights);
      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };

    const frame = window.requestAnimationFrame(balanceHeights);
    const timer = window.setTimeout(balanceHeights, 120);
    window.addEventListener('resize', balanceHeights);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener('resize', balanceHeights);
      cards.forEach((card) => {
        card.style.height = '';
      });
    };
  }, [filteredPrograms.length]);

  return (
    <>
      <PageHero
        eyebrow="Chương trình hỗ trợ phát triển"
        title="Khám phá chương trình phù hợp với từng trẻ"
        description="Nghe Con Lớn cung cấp 3 chương trình hỗ trợ chuyên sâu giúp trẻ từ 0–6 tuổi phát triển toàn diện. Mỗi chương trình được thiết kế cá nhân hóa với sự đồng hành của chuyên gia."
        actions={[
          <AppButton key="survey" as={Link} to="/survey" variant="primary" size="lg">Khảo sát ngay</AppButton>,
          <AppButton key="contact" as={Link} to="/contact" variant="outline-primary" size="lg">Đăng ký tư vấn</AppButton>,
        ]}
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80"
        imageAlt="Phụ huynh tương tác với trẻ"
      >
        <div className="row g-3 mt-30">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="col-auto">
              <div className="playful-pill">
                <span className="fs-5">{badge.icon}</span>
                <small className="fw-600">{badge.label}</small>
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="section-shell section-shell--soft">
        <Container>
          <div className="mb-4">
            <h2 className="h4 fw-bold mb-3">Bộ lọc chương trình</h2>
            <Card className="border-0 playful-card p-3">
              <Row className="g-3">
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">🔍 Tìm kiếm</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên chương trình..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">👶 Độ tuổi</Form.Label>
                    <Form.Select
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      className="rounded-3"
                    >
                      <option value="">Tất cả độ tuổi</option>
                      <option value="6 tháng">6 tháng - 1 tuổi</option>
                      <option value="18 tháng">18 tháng - 3 tuổi</option>
                      <option value="4 tuổi">4 tuổi - 5 tuổi</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">📚 Nhóm phát triển</Form.Label>
                    <Form.Select className="rounded-3" disabled>
                      <option>Tất cả nhóm</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} lg={3} className="d-flex align-items-end">
                  <Button
                    variant="outline-primary"
                    onClick={handleReset}
                    className="w-100 rounded-3"
                  >
                    Đặt lại bộ lọc
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>

          <div className="mb-4">
            <p className="text-muted">
              Tìm thấy <strong>{filteredPrograms.length}</strong> chương trình phù hợp
            </p>
          </div>
        </Container>
      </section>

      <section className="section-shell">
        <Container>
          <Row className="g-4">
            {filteredPrograms.map((program) => (
              <Col md={6} lg={4} key={program.id}>
                <Card
                  data-program-card
                  className="h-100 border-0 playful-card overflow-hidden"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#ffdbdf',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                      }}
                    >
                      {program.icon}
                    </div>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      <Badge bg="light" text="dark" className="me-2">
                        {program.englishName}
                      </Badge>
                      <Badge bg="light" text="dark">
                        {program.ageRange}
                      </Badge>
                    </div>

                    <h3
                      className="h5 fw-bold mb-2"
                      style={{
                        minHeight: '3rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {program.title}
                    </h3>

                    <p
                      className="text-muted mb-1"
                      style={{
                        minHeight: '3rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {program.description}
                    </p>

                    <div className="mb-1" style={{ minHeight: '78px' }}>
                      <p className="mb-2 small fw-semibold">Điểm nổi bật:</p>

                      <div className="d-flex flex-wrap gap-1">
                        {program.highlights.map((highlight) => (
                          <Badge key={highlight} bg="light" text="dark">
                            ✓ {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div style={{ minHeight: '110px' }}>
                      <p className="mb-1 small fw-semibold">Mục tiêu chính:</p>

                      <ul className="ps-3 small text-muted mb-0">
                        {program.goals.slice(0, 3).map((goal) => (
                          <li key={goal}>{goal}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-top pt-3 mb-3 small">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Thời lượng:</span>
                        <span className="fw-semibold">{program.duration}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Hình thức:</span>
                        <span className="fw-semibold">{program.format}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Tư vấn:</span>
                        <span className="fw-semibold">
                          {program.consultation ? '✓ Có' : '✗ Không'}
                        </span>
                      </div>
                    </div>

                    <AppButton
                      as={Link}
                      to={`/programs/${program.slug}`}
                      variant="primary"
                      className="w-100 mt-auto"
                    >
                      Xem chi tiết
                    </AppButton>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-shell section-shell--soft">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="h3 fw-bold mb-4">
                Không chắc chương trình nào phù hợp với trẻ?
              </h2>
              <p className="text-muted mb-4">
                Hoàn thành bài khảo sát miễn phí (10-15 phút) để nhận được gợi ý cá nhân hóa từ các chuyên gia của chúng tôi.
              </p>
              <AppButton as={Link} to="/survey" variant="primary" size="lg">
                Bắt đầu khảo sát
              </AppButton>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ProgramsPage;
