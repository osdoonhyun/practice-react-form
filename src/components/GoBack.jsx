import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function GoBack() {
  const navigate = useNavigate();
  return (
    <Stack className='mt-3' direction='horizontal' gap={3}>
      <Button onClick={() => navigate('/')}>Home</Button>
      <Button onClick={() => navigate(-1)}>&larr;</Button>
    </Stack>
  );
}
