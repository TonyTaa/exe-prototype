import { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
import BrandMascot from './BrandMascot';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="danger" className="m-4">
          <div className="d-flex justify-content-center mb-3">
            <BrandMascot mood="error" compact />
          </div>
          <p className="mb-3">Đã xảy ra lỗi khi tải nội dung. Vui lòng thử lại sau.</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Tải lại trang
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
