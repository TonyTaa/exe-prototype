import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { contactInfo } from '../../data/content';

function AppFooter() {
  return (
    <footer className="app-footer py-5 mt-5">
      <Container>
        <Row className="g-4 align-items-start">
          <Col md={6} lg={3}>
            <h3 className="h6 fw-bold mb-3">Thông tin liên hệ</h3>
            <ul className="list-unstyled small text-muted mb-0">
              <li className="mb-2"><strong>Địa chỉ:</strong><br />{contactInfo.address}</li>
              <li className="mb-2"><strong>Điện thoại:</strong><br />{contactInfo.phone}</li>
              <li className="mb-2"><strong>Email:</strong><br />{contactInfo.email}</li>
            </ul>
          </Col>
          <Col md={6} lg={3}>
            <h3 className="h6 fw-bold mb-3">Giờ làm việc</h3>
            <p className="small text-muted mb-0" style={{ whiteSpace: 'pre-wrap' }}>{contactInfo.hours}</p>
          </Col>
          <Col md={6} lg={3}>
            <h3 className="h6 fw-bold mb-3">Liên kết</h3>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-muted">Trang chủ</Link></li>
              <li className="mb-2"><Link to="/courses" className="text-decoration-none text-muted">Khóa học</Link></li>
              <li className="mb-2"><Link to="/survey" className="text-decoration-none text-muted">Khảo sát</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-decoration-none text-muted">Liên hệ</Link></li>
            </ul>
          </Col>
          <Col md={6} lg={3}>
            <h3 className="h6 fw-bold mb-3">Pháp lý</h3>
            <p className="small text-muted mb-0">
              Nội dung trên website chỉ mang tính chất tham khảo, không thay thế tư vấn hoặc chẩn đoán chuyên môn từ bác sĩ, nhà tâm lý học hoặc chuyên gia phát triển trẻ em.
            </p>
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-center text-muted small">
          <p className="mb-0">© 2026 Nghe Con Lớn. Bảo lưu mọi quyền.</p>
        </div>
      </Container>
    </footer>
  );
}

export default AppFooter;
