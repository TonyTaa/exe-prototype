import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { submitAssessment } from '../services/assessmentService';

function AssessmentPage() {
  const [form, setForm] = useState({
    childName: '',
    age: '',
    concern: '',
    contact: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Đang gửi thông tin...');

    try {
      await submitAssessment(form);
      setStatus('Thông tin đã được ghi nhận. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
    } catch (error) {
      setStatus('Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau.');
    }
  };

  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col lg={6}>
          <h1 className="h2 fw-bold mb-3">Đánh giá ban đầu</h1>
          <p className="text-muted">
            Mẫu này giúp bạn cung cấp thông tin sơ bộ để đội ngũ tư vấn đề xuất các khóa học phù hợp. Đây không phải kết luận y khoa.
          </p>
          <Alert variant="info" className="rounded-4 border-0">
            Nếu phụ huynh cần hỗ trợ chuyên sâu, hãy trao đổi trực tiếp với bác sĩ, chuyên gia phát triển trẻ em hoặc nhà trị liệu.
          </Alert>
        </Col>
        <Col lg={6}>
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên trẻ</Form.Label>
                  <Form.Control name="childName" value={form.childName} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Độ tuổi</Form.Label>
                  <Form.Control name="age" value={form.age} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Vấn đề hoặc mong muốn quan tâm</Form.Label>
                  <Form.Control as="textarea" rows={4} name="concern" value={form.concern} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Thông tin liên hệ</Form.Label>
                  <Form.Control name="contact" value={form.contact} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" variant="primary">Gửi thông tin</Button>
              </Form>
              {status ? <p className="mt-3 mb-0 text-muted">{status}</p> : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AssessmentPage;
