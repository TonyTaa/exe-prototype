import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppCard from '../components/ui/AppCard';
import AppBadge from '../components/ui/AppBadge';
import PageHero from '../components/layout/PageHero';
import {
  expertTeam,
  faqItems,
  featuredPrograms,
  homeHighlights,
  processSteps,
  programs,
  siteConfig,
  supportPrinciples,
  testimonials,
} from '../data/content';

function HomePage() {
  return (
    <>
      <PageHero
        eyebrow={siteConfig.tagline}
        title="Đồng hành cùng mỗi bước phát triển của trẻ"
        description="Chúng tôi mang đến các chương trình, công cụ và sự đồng hành phù hợp cho trẻ từ 0 đến 6 tuổi đang gặp khó khăn về ngôn ngữ, giao tiếp xã hội hoặc vận động."
        actions={[
          <Button key="survey" as={Link} to="/survey" variant="primary">Bắt đầu khảo sát</Button>,
          <Button key="programs" as={Link} to="/programs" variant="outline-primary">Xem chương trình</Button>,
          <Button key="courses" as={Link} to="/courses" variant="outline-primary">Xem khóa học</Button>,
        ]}
        image="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
        imageAlt="Trẻ em và phụ huynh trong môi trường học tập"
      >
        <div className="d-flex flex-wrap gap-2">
          {homeHighlights.map((item) => (
            <AppBadge key={item} variant="soft" className="text-dark fw-semibold">
              {item}
            </AppBadge>
          ))}
        </div>
      </PageHero>

      <section className="section-shell section-shell--soft">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <div className="illustration-panel">
                <img
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
                  alt="Giới thiệu trung tâm"
                  loading="lazy"
                />
              </div>
            </Col>
            <Col lg={6}>
              <p className="section-kicker">Giới thiệu trung tâm</p>
              <h2 className="h3 fw-bold mb-3">Một nơi an tâm để phụ huynh đồng hành cùng con</h2>
              <p className="text-muted">Nghe Con Lớn kết hợp giữa chuyên môn, sự tử tế và phương pháp học hấp dẫn để hỗ trợ trẻ phát triển toàn diện.</p>
              <ul className="mt-3 ps-3 text-muted">
                {supportPrinciples.map((item) => (
                  <li key={item} className="mb-2">{item}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-shell">
        <Container>
          <div className="text-center mb-4">
            <p className="section-kicker">Các nhóm trẻ được hỗ trợ</p>
            <h2 className="h3 fw-bold">Những lĩnh vực chúng tôi đồng hành</h2>
          </div>
          <Row className="g-4">
            {programs.map((program) => (
              <Col md={6} lg={4} key={program.id}>
                <AppCard title={program.title} subtitle={program.ageRange} className="h-100">
                  <p className="text-muted">{program.summary}</p>
                  <Button as={Link} to={`/programs/${program.slug}`} variant="link" className="px-0">
                    Xem chi tiết
                  </Button>
                </AppCard>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-shell section-shell--accent">
        <Container>
          <div className="text-center mb-4">
            <p className="section-kicker">Quy trình tư vấn</p>
            <h2 className="h3 fw-bold">Một quy trình rõ ràng để phụ huynh yên tâm</h2>
          </div>
          <Row className="g-4">
            {processSteps.map((step, index) => (
              <Col md={4} key={step.title}>
                <Card className="h-100 border-0 playful-card">
                  <Card.Body>
                    <div className="section-icon-circle mb-3">{index + 1}</div>
                    <h3 className="h6 fw-bold">{step.title}</h3>
                    <p className="text-muted mb-0">{step.text}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-shell">
        <Container>
          <div className="text-center mb-4">
            <p className="section-kicker">Khóa học nổi bật</p>
            <h2 className="h3 fw-bold">Các lộ trình được thiết kế phù hợp trẻ nhỏ</h2>
          </div>
          <Row className="g-4">
            {featuredPrograms.map((program) => (
              <Col md={6} lg={4} key={program.id}>
                <Card className="h-100 border-0 playful-card overflow-hidden">
                  <Card.Img variant="top" src={program.image} alt={program.title} style={{ height: '220px', objectFit: 'cover' }} />
                  <Card.Body>
                    <h3 className="h6 fw-bold">{program.title}</h3>
                    <p className="text-muted small mb-3">Độ tuổi: {program.ageRange} • {program.duration}</p>
                    <ul className="ps-3 text-muted small">
                      {program.goals.map((goal) => (
                        <li key={goal}>{goal}</li>
                      ))}
                    </ul>
                    <Button as={Link} to={`/programs/${program.slug}`} variant="outline-primary" className="mt-3">
                      Xem chi tiết
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-shell section-shell--soft">
        <Container>
          <div className="text-center mb-4">
            <p className="section-kicker">Đội ngũ chuyên gia</p>
            <h2 className="h3 fw-bold">Những người đồng hành cùng trẻ và phụ huynh</h2>
          </div>
          <Row className="g-4">
            {expertTeam.map((member) => (
              <Col md={4} key={member.name}>
                <AppCard title={member.name} subtitle={member.role} className="h-100">
                  <p className="text-muted mb-0">{member.description}</p>
                </AppCard>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-shell">
        <Container>
          <div className="text-center mb-4">
            <p className="section-kicker">Phản hồi phụ huynh</p>
            <h2 className="h3 fw-bold">Những lời kể về tiến bộ của trẻ</h2>
          </div>
          <Row className="g-4">
            {testimonials.map((item) => (
              <Col md={6} key={item.name}>
                <Card className="h-100 border-0 playful-card">
                  <Card.Body>
                    <p className="text-muted">“{item.text}”</p>
                    <p className="fw-bold mb-0">{item.name}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-shell section-shell--soft">
        <Container>
          <div className="text-center mb-4">
            <p className="section-kicker">FAQ</p>
            <h2 className="h3 fw-bold">Những câu hỏi thường gặp</h2>
          </div>
          <Accordion defaultActiveKey="0">
            {faqItems.map((item, index) => (
              <Accordion.Item eventKey={String(index)} key={item.question}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </section>

      <section className="section-shell">
        <Container>
          <Card className="border-0 playful-card bg-primary p-4 text-center">
            <h2 className="h3 fw-bold mb-3">Bạn muốn biết con mình phù hợp với khóa học nào?</h2>
            <p className="text-muted mb-4">Hoàn thành khảo sát nhanh để nhận gợi ý ban đầu phù hợp nhất.</p>
            <Button as={Link} to="/survey" variant="warning">
              Đăng ký khảo sát ngay
            </Button>
          </Card>
        </Container>
      </section>
    </>
  );
}

export default HomePage;
