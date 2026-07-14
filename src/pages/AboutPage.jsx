import { Container, Row, Col, Card, Button, Accordion, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  about,
  benefits,
  coreValues,
  mission,
  vision,
  supportGroupsDetailed,
  processTimeline,
  aboutFaqItems,
  contactInfo,
} from '../data/content';
import AppCard from '../components/ui/AppCard';
import PageHero from '../components/layout/PageHero';

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Về Nghe Con Lớn"
        title="Cùng bạn xây dựng hành trình phát triển cho trẻ"
        description={about}
        actions={[
          <Button key="survey" as={Link} to="/survey" variant="primary">Khảo sát miễn phí</Button>,
          <Button key="programs" as={Link} to="/courses" variant="outline-primary">Xem chương trình</Button>,
        ]}
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80"
        imageAlt="Phụ huynh tương tác với trẻ"
      />

      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <p className="text-primary fw-semibold mb-2">Giá trị cốt lõi</p>
            <h2 className="h3 fw-bold">Những giá trị hướng dẫn chúng tôi</h2>
          </div>
          <Row className="g-4">
            {coreValues.map((value) => (
              <Col md={6} lg={4} key={value.title}>
                <Card className="h-100 border-0 rounded-4 shadow-sm transition">
                  <Card.Body>
                    <h3 className="h5 fw-bold mb-2">{value.title}</h3>
                    <p className="text-muted mb-0">{value.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light-subtle">
        <Container>
          <div className="text-center mb-5">
            <p className="text-primary fw-semibold mb-2">Sứ mệnh & Tầm nhìn</p>
            <h2 className="h3 fw-bold">Những gì chúng tôi muốn đạt được</h2>
          </div>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="h-100 border-0 rounded-4 shadow-sm">
                <Card.Body>
                  <div className="bg-primary rounded-4 p-3 mb-3" style={{ width: 'fit-content' }}>
                    <span className="fs-4">🎯</span>
                  </div>
                  <h3 className="h5 fw-bold mb-2">Sứ mệnh</h3>
                  <p className="text-muted mb-0">{mission}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 border-0 rounded-4 shadow-sm">
                <Card.Body>
                  <div className="bg-secondary rounded-4 p-3 mb-3" style={{ width: 'fit-content' }}>
                    <span className="fs-4">✨</span>
                  </div>
                  <h3 className="h5 fw-bold mb-2">Tầm nhìn</h3>
                  <p className="text-muted mb-0">{vision}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <p className="text-primary fw-semibold mb-2">Các nhóm trẻ được hỗ trợ</p>
            <h2 className="h3 fw-bold">Những lĩnh vực chúng tôi chuyên sâu</h2>
          </div>
          <Row className="g-4">
            {supportGroupsDetailed.map((group) => (
              <Col md={6} lg={4} key={group.title}>
                <Card className="h-100 border-0 rounded-4 shadow-sm overflow-hidden transition">
                  <Card.Body>
                    <div className="fs-1 mb-3">{group.icon}</div>
                    <h3 className="h5 fw-bold">{group.title}</h3>
                    <p className="text-muted small">{group.targets}</p>
                    <p className="text-muted mb-3">{group.description}</p>
                    <Button as={Link} to="/programs" variant="link" className="p-0">
                      Tìm hiểu thêm →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light-subtle">
        <Container>
          <div className="text-center mb-5">
            <p className="text-primary fw-semibold mb-2">Quy trình đồng hành</p>
            <h2 className="h3 fw-bold">5 bước hỗ trợ trẻ phát triển</h2>
          </div>
          <Row className="g-3">
            {processTimeline.map((item, index) => (
              <div key={item.step}>
                <Card className="border-0 rounded-4 shadow-sm">
                  <Card.Body className="d-flex align-items-start gap-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="h6 fw-bold mb-1">{item.title}</h3>
                      <p className="text-muted small mb-0">{item.description}</p>
                    </div>
                  </Card.Body>
                </Card>
                {index < processTimeline.length - 1 && (
                  <div className="text-center py-2 text-primary">↓</div>
                )}
              </div>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <p className="text-primary fw-semibold mb-2">Vì sao chọn Nghe Con Lớn</p>
            <h2 className="h3 fw-bold">Những lợi ích bạn sẽ nhận được</h2>
          </div>
          <Row className="g-4">
            {benefits.map((benefit) => (
              <Col md={6} lg={4} key={benefit.title}>
                <Card className="h-100 border-0 rounded-4 shadow-sm transition">
                  <Card.Body>
                    <div className="bg-accent rounded-4 p-3 mb-3 text-center" style={{ width: 'fit-content' }}>
                      <span className="fs-4">✓</span>
                    </div>
                    <h3 className="h6 fw-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted mb-0 small">{benefit.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light-subtle">
        <Container>
          <div className="text-center mb-5">
            <p className="text-primary fw-semibold mb-2">FAQ</p>
            <h2 className="h3 fw-bold">Những câu hỏi thường gặp</h2>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion defaultActiveKey="0" className="shadow-sm rounded-4 overflow-hidden">
                {aboutFaqItems.map((item, index) => (
                  <Accordion.Item eventKey={String(index)} key={item.question} className="border-0">
                    <Accordion.Header className="fw-semibold">{item.question}</Accordion.Header>
                    <Accordion.Body className="text-muted">{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Card className="border-0 rounded-4 shadow-sm bg-primary">
            <Card.Body className="text-center py-5">
              <h2 className="h3 fw-bold mb-3">Sẵn sàng đồng hành cùng trẻ ngay hôm nay?</h2>
              <p className="text-muted mb-4">
                Khảo sát miễn phí để tìm chương trình phù hợp nhất với trẻ của bạn.
              </p>
              <Button as={Link} to="/survey" variant="warning" size="lg">
                Bắt đầu khảo sát miễn phí
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </>
  );
}

export default AboutPage;
