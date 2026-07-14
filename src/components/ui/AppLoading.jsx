import { Spinner } from 'react-bootstrap';

function AppLoading({ label = 'Đang tải...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
      <Spinner animation="border" variant="primary" />
      <span className="mt-3">{label}</span>
    </div>
  );
}

export default AppLoading;
