import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { siteConfig } from '../../data/content';
import logo from '../../assets/logo_removebg.png';

function AppHeader() {
  return (
    <Navbar expand="lg" className="shadow-sm border-bottom sticky-top app-shell-header">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="app-header-brand d-flex align-items-center gap-2">
          <img src={logo} alt={siteConfig.name} className="app-header-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <div className="d-flex align-items-center justify-content-between w-100">
            <Nav className="app-header-nav align-items-lg-center gap-lg-2">
              <Nav.Link as={NavLink} to="/" className="app-nav-link">Trang chủ</Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="app-nav-link">Về chúng tôi</Nav.Link>
              <Nav.Link as={NavLink} to="/programs" className="app-nav-link">Chương trình</Nav.Link>
              <Nav.Link as={NavLink} to="/courses" className="app-nav-link">Khóa học</Nav.Link>
              <Nav.Link as={NavLink} to="/survey" className="app-nav-link">Khảo sát</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="app-nav-link">Liên hệ</Nav.Link>
            </Nav>
            <Button as={NavLink} to="/register" variant="primary" className="app-header-btn ms-lg-3">
              Đăng ký tư vấn
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
