import { Form } from 'react-bootstrap';

function AppInput({ className = '', ...props }) {
  return <Form.Control {...props} className={['app-input', className].filter(Boolean).join(' ')} />;
}

export default AppInput;
