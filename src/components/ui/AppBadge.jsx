import { Badge } from 'react-bootstrap';

function AppBadge({ children, variant = 'soft', className = '', ...props }) {
  const resolvedVariant = variant === 'soft' ? 'light' : variant;
  const classes = ['app-badge', className].filter(Boolean).join(' ');

  return (
    <Badge {...props} bg={resolvedVariant} className={classes}>
      {children}
    </Badge>
  );
}

export default AppBadge;
