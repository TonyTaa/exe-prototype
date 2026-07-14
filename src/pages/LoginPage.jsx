import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppInput from '../components/ui/AppInput';
import BrandMascot from '../components/ui/BrandMascot';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo = useMemo(() => {
    return location.state?.redirectTo || location.state?.from?.pathname || location.state?.returnTo || '/';
  }, [location.state]);

  useEffect(() => {
    const emailInput = document.getElementById('login-email');
    if (emailInput) {
      emailInput.focus();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      nextErrors.email = 'Vui lòng nhập email để đăng nhập.';
    } else if (!emailRegex.test(formData.email)) {
      nextErrors.email = 'Email chưa đúng định dạng.';
    }

    if (!formData.password.trim()) {
      nextErrors.password = 'Vui lòng nhập mật khẩu.';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Mật khẩu cần có ít nhất 6 ký tự.';
    }

    setErrors(nextErrors);
    return !Object.keys(nextErrors).length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    setIsLoading(true);

    window.setTimeout(() => {
      setIsLoading(false);
      setStatus('success');
      navigate(redirectTo, { replace: true });
    }, 900);
  };

  const valueCards = [
    { title: 'Lưu kết quả khảo sát', description: 'Giữ lại những câu trả lời để tiếp tục hành trình vừa dừng.' },
    { title: 'Theo dõi lộ trình phát triển', description: 'Xem lại những bước tiếp theo dành cho trẻ một cách rõ ràng.' },
    { title: 'Nhận tư vấn từ chuyên gia', description: 'Nhận thông báo và hỗ trợ khi cần thêm hướng dẫn.' },
  ];

  const socialOptions = [
    { label: 'Google', icon: 'G', disabled: true },
    { label: 'Apple', icon: '', disabled: true },
    { label: 'Facebook', icon: 'f', disabled: true },
  ];

  return (
    <div className="auth-layout min-vh-100 d-flex align-items-center py-5 bg-light-subtle">
      <Container>
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Row className="g-0">
            <Col lg={6} className="auth-hero-panel p-4 p-lg-5 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="brand-mark rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark">N</div>
                  <div>
                    <h2 className="h5 fw-bold mb-0">Nghe Con Lớn</h2>
                    <p className="small text-muted mb-0">Đồng hành cùng phụ huynh</p>
                  </div>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80"
                  alt="Phụ huynh và chuyên gia đồng hành cùng trẻ"
                  className="img-fluid rounded-4 mb-4 auth-hero-image"
                />

                <h1 className="h3 fw-bold mb-3">Đồng hành cùng mỗi bước phát triển của trẻ.</h1>
                <p className="text-muted mb-4">
                  Với một tài khoản, phụ huynh có thể lưu lại kết quả khảo sát, tiếp tục lộ trình phù hợp và nhận hỗ trợ từ chuyên gia một cách nhẹ nhàng và liên tục.
                </p>
              </div>

              <Row className="g-3">
                {valueCards.map((card) => (
                  <Col xs={12} md={4} lg={12} xl={4} key={card.title}>
                    <div className="auth-value-card p-3 rounded-4 h-100">
                      <h3 className="h6 fw-bold mb-2">{card.title}</h3>
                      <p className="small text-muted mb-0">{card.description}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col lg={6} className="p-4 p-lg-5 d-flex flex-column justify-content-center">
              <div className="mb-4">
                <p className="text-primary fw-semibold mb-2">Chào mừng trở lại</p>
                <h3 className="h3 fw-bold mb-2">Đăng nhập để tiếp tục hành trình</h3>
                <p className="text-muted mb-0">
                  Bạn có thể quay lại kết quả khảo sát, xem chương trình phù hợp hoặc tiếp tục đăng ký tư vấn mà không cần bắt đầu lại từ đầu.
                </p>
              </div>
              <div className="mb-4">
                <BrandMascot mood="welcome" compact />
              </div>

              {status === 'error' && (
                <Alert variant="warning" className="rounded-4 border-0 mb-4">
                  Đăng nhập chưa thành công. Vui lòng kiểm tra lại email và mật khẩu của bạn.
                </Alert>
              )}

              {redirectTo !== '/' && (
                <Alert variant="info" className="rounded-4 border-0 mb-4">
                  Sau khi đăng nhập, bạn sẽ được quay lại đúng bước mà mình vừa dừng.
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <AppInput
                    id="login-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    autoComplete="email"
                    autoFocus
                    isInvalid={!!errors.email}
                  />
                  {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Mật khẩu</Form.Label>
                  <div className="position-relative">
                    <AppInput
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      isInvalid={!!errors.password}
                    />
                    <Button
                      type="button"
                      variant="link"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      {showPassword ? 'Ẩn' : 'Hiện'}
                    </Button>
                  </div>
                  {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                </Form.Group>

                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                  <Form.Check
                    type="checkbox"
                    id="remember-me"
                    label="Ghi nhớ đăng nhập"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <Link to="/forgot-password" className="small text-decoration-none text-primary">
                    Quên mật khẩu?
                  </Link>
                </div>

                <Button variant="primary" type="submit" className="w-100 py-2" disabled={isLoading}>
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </Form>

              <div className="text-center my-4">
                <span className="text-muted small">Hoặc tiếp tục với</span>
              </div>

              <div className="d-grid gap-2">
                {socialOptions.map((option) => (
                  <Button key={option.label} variant="outline-primary" className="auth-social-button" disabled>
                    <span className="me-2">{option.icon}</span>
                    {option.label}
                  </Button>
                ))}
              </div>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="small text-muted mb-2">Chưa có tài khoản?</p>
                <p className="mb-2 fw-semibold">Tạo tài khoản miễn phí</p>
                <p className="small text-muted mb-0">
                  Lưu kết quả khảo sát, theo dõi tiến trình phát triển và đăng ký tư vấn nhanh hơn.
                </p>
                <Button as={Link} to="/register" variant="outline-primary" className="mt-3">
                  Tạo tài khoản miễn phí
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
