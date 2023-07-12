import { Button, Col, Form, Nav, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { mainAddress } from '../constants/constant';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const userInput = {
        email,
        password,
      };
      const { data, status } = await axios.post(
        mainAddress + '/auth/login',
        userInput
      );
      if (status === 200) {
        localStorage.clear();
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('userInfo', JSON.stringify(data.data.user));
        navigate('/');
        console.log('로그인 성공', data, status);
      }
    } catch (error) {
      console.log('Login Error', error.message);
    }
  };

  return (
    <FormContainer title='login'>
      <Form onSubmit={loginHandler}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>이메일</Form.Label>
          <Row className='mb-2'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Control
                value={email}
                placeholder='이메일'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호</Form.Label>
          <br />

          <Form.Text className='text-muted'>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </Form.Text>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='비밀번호'
          />
        </Form.Group>

        <div className='d-flex justify-content-center mt-4'>
          <Button variant='primary' type='submit' className='w-100'>
            로그인
          </Button>
        </div>
      </Form>
      <div className='d-flex justify-content-center mt-3'>
        <Nav as='ul'>
          <Nav.Item as='li'>
            <Nav.Link href='/change/password'>비밀번호 재설정</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link href='/signup'>회원가입</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item as='li'>
            <Nav.Link href='/findid'>아이디 찾기</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link href='/findpassword'>비밀번호 찾기</Nav.Link>
          </Nav.Item> */}
        </Nav>
      </div>
    </FormContainer>
  );
}
