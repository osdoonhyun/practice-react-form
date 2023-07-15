import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { mainAddress } from '../constants/constant';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [btnDisable, setBtnDisable] = useState(false);
  const [emailBtnDisable, setEmailBtnDisable] = useState(false);

  const [verificationStatus, setVerificationStatus] = useState({
    pending: true,
    loading: false,
    success: false,
  });
  const [verificationToggle, setVerificationToggle] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);

  const searchParams = new URLSearchParams(location.search);

  const handleVerificationEmail = async () => {
    console.log('이메일체크++++++');
    try {
      const { data, status } = await axios.post(mainAddress + '/user/email', {
        email,
      });
      console.log('이메일 가입 확인', data, status);

      if (status === 201) {
        setBtnDisable(true);
        setEmailBtnDisable(false);
      }
    } catch (error) {
      console.log('이메일 가입 확인 에러', error.message);
    }
  };

  const handleVerificationCode = async () => {
    setVerificationStatus((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const userInput = {
      email,
    };

    try {
      const { status, data } = await axios.post(
        mainAddress + '/auth/forgot/password',
        userInput
      );
      setVerificationStatus((prevState) => ({
        ...prevState,
        loading: false,
      }));
    } catch (error) {
      console.log('Email Verifiaction Error', error.message);
    }
    setVerificationToggle(true);
  };

  const handleVerificationCodeCheck = async () => {
    try {
      const userInput = {
        email,
        code: verificationCode,
      };
      const { status, data } = await axios.post(
        mainAddress + '/auth/email/check',
        userInput
      );
      if (status === 201) {
        alert('인증 완료 되었습니다.');
        setVerificationToggle(false);
        setVerificationStatus((prevState) => ({
          ...prevState,
          pending: false,
          success: true,
        }));
        setBtnDisable(false);
      }
      console.log('이메일 인증 코드 검사', status, data);
    } catch (error) {
      console.log('Email Verifiaction Check Error', error.message);
    }
    setPasswordToggle(true);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const userInput = {
      token,
      password: newPassword,
    };
    try {
      const { status } = await axios.post(
        mainAddress + '/auth/change/password',
        userInput
      );

      if (status === 201) {
        alert('비밀번호 변경이 완료 되었습니다.');
        navigate('/login');
      }
    } catch (error) {
      console.log('Change Password Error', error.message);
    }
  };

  useEffect(() => {
    if (email !== '') {
      setEmailBtnDisable(true);
    }
    if (token === '') {
      setToken(searchParams.get('token'));
    }
  }, [email, token]);

  return (
    <FormContainer title='비밀번호 변경하기'>
      <Form onSubmit={handleChangePassword} className='mb-3'>
        {!token ? (
          <>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Text className='d-flex justify-content-center'>
                가입한 이메일 주소를 입력해주세요.
              </Form.Text>
              <Form.Label className='text-muted'>이메일</Form.Label>
              <Row className='mb-2'>
                <Form.Group as={Col} controlId='formGridCity'>
                  <Form.Control
                    value={email}
                    placeholder='이메일'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* <Button>이메일 확인버튼</Button> */}
                </Form.Group>
              </Row>
            </Form.Group>

            <Button
              disabled={emailBtnDisable ? false : true}
              onClick={handleVerificationEmail}
            >
              {btnDisable ? '가입 확인' : '확인'}
            </Button>

            <Button
              onClick={handleVerificationCode}
              className='mb-3 w-100'
              variant='primary'
              disabled={btnDisable ? false : true}
            >
              {verificationStatus.pending && '이메일 인증코드 받기 '}
              {verificationStatus.success && '이메일 인증코드 전송 완료'}
              {verificationStatus.loading && (
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              )}
            </Button>
          </>
        ) : (
          <>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>비밀번호</Form.Label>
              <br />

              <Form.Text className='text-muted'>
                영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
              </Form.Text>
              <Form.Control
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type='password'
                placeholder='비밀번호'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type='password'
                placeholder='비밀번호 확인'
              />
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button variant='primary' type='submit' className='w-100 mt-3'>
                비밀번호 재설정
              </Button>
            </div>
          </>
        )}

        {/* 이메일 인증 코드 검증 */}
        {/* {verificationToggle && (
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Text className='text-muted'>
              이메일로 전송된 인증코드를 입력해주세요.
            </Form.Text>
            <Form.Control
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              type='password'
              placeholder='인증코드 6자리 입력'
            />
            <Button
              className='mt-3'
              variant='primary'
              onClick={handleVerificationCodeCheck}
            >
              확인
            </Button>
          </Form.Group>
        )} */}

        {/* 이메일 인증 성공 후 비밀번호 변경 */}
        {/* {passwordToggle && (
          <>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>비밀번호</Form.Label>
              <br />

              <Form.Text className='text-muted'>
                영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
              </Form.Text>
              <Form.Control
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type='password'
                placeholder='비밀번호'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type='password'
                placeholder='비밀번호 확인'
              />
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button variant='primary' type='submit' className='w-100 mt-3'>
                비밀번호 재설정
              </Button>
            </div>
          </>
        )} */}
      </Form>
    </FormContainer>
  );
}
