import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BrandMascot from '../components/ui/BrandMascot';

function NotFoundPage() {
  return (
    <Container className="py-5 text-center">
      <div className="d-flex justify-content-center mb-4">
        <BrandMascot mood="thinking" />
      </div>
      <h1 className="display-4 fw-bold">404</h1>
      <p className="text-muted">Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
      <Button as={Link} to="/" variant="primary">
        Quay về Trang chủ
      </Button>
    </Container>
  );
}

export default NotFoundPage;
