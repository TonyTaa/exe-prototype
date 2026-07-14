import { Card } from 'react-bootstrap';

function AppCard({ title, subtitle, children, className = '', headerClassName = '', bodyClassName = '', ...props }) {
  return (
    <Card {...props} className={['app-card', 'playful-card', className].filter(Boolean).join(' ')}>
      {(title || subtitle) && (
        <Card.Header className={['border-0 bg-transparent', headerClassName].filter(Boolean).join(' ')}>
          {title && <h3 className="h6 fw-bold mb-1">{title}</h3>}
          {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
        </Card.Header>
      )}
      <Card.Body className={bodyClassName}>{children}</Card.Body>
    </Card>
  );
}

export default AppCard;
