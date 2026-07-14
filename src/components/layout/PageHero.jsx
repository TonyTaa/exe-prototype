import { Container, Row, Col, Card } from 'react-bootstrap';

function PageHero({
  eyebrow,
  title,
  description,
  actions,
  children,
  image,
  imageAlt,
  media,
  highlight,
  className = '',
}) {
  return (
    <section className={['page-hero', className].filter(Boolean).join(' ')}>
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={7}>
            {eyebrow && <span className="page-hero__eyebrow">{eyebrow}</span>}
            {title && <h1 className="page-hero__title">{title}</h1>}
            {description && <p className="page-hero__description">{description}</p>}
            {actions && <div className="page-hero__actions">{actions}</div>}
            {children && <div className="page-hero__extra">{children}</div>}
          </Col>
          <Col lg={5}>
            <div className="page-hero__media">
              {media || (image ? <img src={image} alt={imageAlt || title} loading="lazy" /> : null)}
              {highlight && <div className="page-hero__floating-card">{highlight}</div>}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PageHero;
