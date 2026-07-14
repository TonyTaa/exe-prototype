import { Container, Row, Col, Card } from 'react-bootstrap';

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-layout min-vh-100 d-flex align-items-center py-5 bg-light-subtle">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
              <Row className="g-0">
                <Col md={5} className="bg-primary p-4 d-flex flex-column justify-content-center">
                  <h2 className="h4 fw-bold mb-2">Nghe Con Lớn</h2>
                  <p className="mb-0 text-muted">Môi trường hỗ trợ phát triển trẻ nhỏ một cách an toàn và thân thiện.</p>
                </Col>
                <Col md={7} className="p-4">
                  <h3 className="h5 fw-bold">{title}</h3>
                  {subtitle && <p className="text-muted small">{subtitle}</p>}
                  {children}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthLayout;
