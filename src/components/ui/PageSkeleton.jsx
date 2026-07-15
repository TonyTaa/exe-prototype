import { Card, Placeholder } from 'react-bootstrap';

function PageSkeleton() {
  return (
    <div className="py-5">
      <div className="d-flex justify-content-center mb-4">
        <span className="fs-1">⌛</span>
      </div>
      <Placeholder as="p" animation="wave" className="mb-3" style={{ width: '30%' }} />
      <Placeholder as="h3" animation="wave" className="mb-3" style={{ width: '50%' }} />
      <Placeholder as="p" animation="wave" className="mb-2" />
      <Placeholder as="p" animation="wave" className="mb-2" />
      <Card className="border-0 rounded-4 shadow-sm mt-4">
        <Card.Body>
          <Placeholder as="p" animation="wave" />
          <Placeholder as="p" animation="wave" />
          <Placeholder as="p" animation="wave" />
        </Card.Body>
      </Card>
    </div>
  );
}

export default PageSkeleton;
