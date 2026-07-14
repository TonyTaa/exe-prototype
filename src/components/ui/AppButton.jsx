import { Button } from 'react-bootstrap';

function AppButton({ variant = 'primary', className = '', children, ...props }) {
  const variantMap = {
    primary: 'primary',
    secondary: 'outline-primary',
    accent: 'primary',
    ghost: 'link',
  };

  const resolvedVariant = variantMap[variant] || 'primary';
  const classes = ['app-btn', `app-btn--${variant}`, className].filter(Boolean).join(' ');

  return (
    <Button {...props} variant={resolvedVariant} className={classes}>
      {children}
    </Button>
  );
}

export default AppButton;
