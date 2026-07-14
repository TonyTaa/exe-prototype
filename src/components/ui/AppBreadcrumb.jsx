import { Breadcrumb } from 'react-bootstrap';

function AppBreadcrumb({ items = [], className = '' }) {
  return (
    <Breadcrumb className={['app-breadcrumb', className].filter(Boolean).join(' ')}>
      {items.map((item, index) => (
        <Breadcrumb.Item key={`${item.label}-${index}`} active={index === items.length - 1} href={item.href}>
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default AppBreadcrumb;
