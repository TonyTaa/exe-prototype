import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { siteConfig } from '../../data/content';

function AppHeader() {
  return (
    <Navbar expand="lg" className="shadow-sm border-bottom sticky-top app-shell-header">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold d-flex align-items-center gap-2">
          <span className="brand-mark">N</span>
          <span>{siteConfig.name}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={NavLink} to="/">Trang chủ</Nav.Link>
            <Nav.Link as={NavLink} to="/about">Về chúng tôi</Nav.Link>
            <Nav.Link as={NavLink} to="/programs">Chương trình</Nav.Link>
            <Nav.Link as={NavLink} to="/courses">Khóa học</Nav.Link>
            <Nav.Link as={NavLink} to="/survey">Khảo sát</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Liên hệ</Nav.Link>
            <Button as={NavLink} to="/register" variant="primary" className="ms-lg-3">
              Đăng ký tư vấn
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
