import { Button } from 'react-bootstrap';

function AppEmptyState({ title = 'Không có dữ liệu', description, actionLabel, onAction }) {
  return (
    <div className="text-center py-5 border rounded-4 bg-light-subtle">
      <h3 className="h5 fw-bold">{title}</h3>
      {description && <p className="text-muted mb-3">{description}</p>}
      {actionLabel && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default AppEmptyState;
