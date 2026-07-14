import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, ListGroup } from 'react-bootstrap';
import { getCourseById } from '../services/courseService';

function CourseDetailPage() {
  const { id } = useParams();
  const course = useMemo(() => getCourseById(id), [id]);

  if (!course) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Không tìm thấy khóa học.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Link to="/courses" className="text-decoration-none text-primary mb-3 d-inline-block">← Quay lại danh sách</Link>
      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 rounded-4 shadow-sm overflow-hidden">
            <Card.Img variant="top" src={course.thumbnail} alt={course.title} style={{ height: '320px', objectFit: 'cover' }} />
            <Card.Body>
              <p className="text-primary fw-semibold mb-2">{course.category}</p>
              <h1 className="h3 fw-bold">{course.title}</h1>
              <p className="text-muted">{course.description}</p>
              <div className="d-flex flex-wrap gap-3 mb-4 text-muted small">
                <span>Độ tuổi: {course.ageRange}</span>
                <span>Thời lượng: {course.duration}</span>
                <span>Học phí: {course.price.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden">
                <iframe src={course.video} title={`${course.title} video`} allowFullScreen />
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 rounded-4 shadow-sm mt-4">
            <Card.Body>
              <h2 className="h5 fw-bold mb-3">Lộ trình học</h2>
              <ListGroup variant="flush">
                {course.roadmap.map((item) => (
                  <ListGroup.Item key={item}>{item}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="border-0 rounded-4 shadow-sm mt-4">
            <Card.Body>
              <h2 className="h5 fw-bold mb-3">Kỹ năng đạt được</h2>
              <ul className="ps-3 text-muted mb-0">
                {course.objectives.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 rounded-4 shadow-sm sticky-top" style={{ top: '90px' }}>
            <Card.Body>
              <h2 className="h5 fw-bold">Đăng ký tư vấn</h2>
              <p className="text-muted">Bạn muốn biết khóa học này có phù hợp với trẻ không? Hãy để lại thông tin để chuyên gia tư vấn.</p>
              <Button as={Link} to="/register" variant="primary" className="w-100">Đăng ký tư vấn</Button>
              <div className="mt-4">
                <h3 className="h6 fw-bold">Chuyên gia phụ trách</h3>
                <p className="text-muted mb-0">{course.therapist}</p>
              </div>
              <div className="mt-4">
                <h3 className="h6 fw-bold">Đối tượng phù hợp</h3>
                <p className="text-muted mb-0">{course.ageRange}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CourseDetailPage;
