import { Col, Container, Row } from 'react-bootstrap';
import GoBack from './GoBack';

export default function FormContainer({
  title,
  children,
  style = { maxWidth: '400px' },
}) {
  return (
    <Container style={style}>
      <GoBack />
      <h1 className='mt-5'>{title}</h1>
      <Row className='mt-4'>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
