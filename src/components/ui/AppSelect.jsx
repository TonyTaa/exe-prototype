import { Form } from 'react-bootstrap';

function AppSelect({ className = '', ...props }) {
  return <Form.Select {...props} className={['app-input', className].filter(Boolean).join(' ')} />;
}

export default AppSelect;
