import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

function RegisterPage() {
  return (
    <AuthLayout title="Đăng ký" subtitle="Tạo tài khoản để nhận tư vấn phù hợp hơn">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control placeholder="Nhập họ tên" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="••••••••" />
        </Form.Group>
        <Button variant="primary" className="w-100">Đăng ký</Button>
      </Form>
      <p className="small text-muted mt-3 mb-0">
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
