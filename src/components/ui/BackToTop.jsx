import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <Button
      variant="primary"
      className="rounded-circle position-fixed bottom-0 end-0 m-4 shadow-sm"
      style={{ width: '48px', height: '48px', zIndex: 1000 }}
      onClick={handleClick}
      aria-label="Quay về đầu trang"
    >
      ↑
    </Button>
  );
}

export default BackToTop;
