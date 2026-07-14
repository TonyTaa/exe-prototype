import { Nav } from 'react-bootstrap';

function AppSidebar({ items = [], title }) {
  return (
    <aside className="app-sidebar rounded-4 border p-3 bg-white shadow-sm h-100">
      {title && <h3 className="h6 fw-bold mb-3">{title}</h3>}
      <Nav className="flex-column gap-1">
        {items.map((item) => (
          <Nav.Link key={item.label} href={item.href} className="text-dark rounded-3 px-3 py-2">
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </aside>
  );
}

export default AppSidebar;
