import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { agreeList, emailList, mainAddress } from '../constants/constant';

export default function Signup() {
  const navigate = useNavigate();

  // 유저 정보
  const [email, setEmail] = useState('');
  const [emailCategory, setEmailCategory] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  // 이용약관
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isPersonalInfoAgree, setIsPersonalInfoAgree] = useState(false);
  const [isMarketingAgree, setIsMarketingAgree] = useState(false);

  // 이메일 인증
  const [verificationToggle, setVerificationToggle] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    pending: true,
    loading: false,
    success: false,
  });
  const [btnDisable, setBtnDisable] = useState(false);

  const signupHandler = async (e) => {
    e.preventDefault();
    const userInput = {
      email: email + emailCategory,
      password,
      username,
      isMarketingAgree,
      isPersonalInfoAgree,
    };

    try {
      const { status } = await axios.post(
        mainAddress + '/auth/signup',
        userInput
      );

      if (status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.log('Signup Error', error.message);
    }
  };

  const emailVerification = async () => {
    // 등록된 이메일인지 확인 추가 예정
    setVerificationStatus((prevState) => ({
      ...prevState,
      loading: true,
    }));
    // setIsVerificationLoading(true);

    try {
      const userInput = {
        email: email + emailCategory,
      };
      const { statusCode, data } = await axios.post(
        mainAddress + '/auth/email/send',
        userInput
      );
      setVerificationStatus((prevState) => ({
        ...prevState,
        loading: false,
      }));

      // setIsVerificationLoading(false);
      console.log('이메일인증 버튼', statusCode, data);
    } catch (error) {
      console.log('Email Verification Error', error.message);
    }
    // setIsVerification(true);
    // setVerificationStatus((prevState) => ({
    //   ...prevState,
    //   pending: true,
    // }));
    setVerificationToggle(true);
  };

  const emailCodeVerification = async () => {
    try {
      const userInput = {
        email: email + emailCategory,
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

      console.log('Email Code Verification', data);
    } catch (error) {
      console.log('Email Code Verification', error.message);
    }
  };

  const handleCheckAll = (e) => {
    const { checked } = e.target;
    setIsAllAgreed(checked);
    setIsPersonalInfoAgree(checked);
    setIsMarketingAgree(checked);
  };

  const handlePersonalInfoAgreement = (e) => {
    const { checked } = e.target;
    setIsPersonalInfoAgree(checked);
  };
  const handleMarketingAgreement = (e) => {
    const { checked } = e.target;
    setIsMarketingAgree(checked);
  };

  useEffect(() => {
    if (email !== '' && emailCategory !== '') {
      setBtnDisable(true);
    }
  }, [email, emailCategory]);

  return (
    <FormContainer title={'회원가입'}>
      <Form onSubmit={signupHandler}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>이메일</Form.Label>
          <Row className='mb-2'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Select
                defaultValue='Choose...'
                value={emailCategory}
                onChange={(e) => setEmailCategory(e.target.value)}
              >
                <option>선택해주세요</option>
                {emailList.map((email, index) => (
                  <option key={index}>{email}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        </Form.Group>

        <Button
          onClick={emailVerification}
          className='mb-3'
          variant='primary'
          disabled={btnDisable ? false : true}
        >
          {verificationStatus.pending && '이메일 인증 '}
          {verificationStatus.success && '이메일 인증 성공'}
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

        {verificationToggle ? (
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
              onClick={emailCodeVerification}
            >
              확인
            </Button>
          </Form.Group>
        ) : null}

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
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='비밀번호 확인'
          />
        </Form.Group>

        <Form.Group
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='mb-3'
          controlId='formBasicPassword'
        >
          <Form.Label>닉네임</Form.Label>
          <br />
          <Form.Text className='text-muted'>
            다른 유저와 겹치지 않도록 입력해주세요. (2~15자)
          </Form.Text>
          <Form.Control type='text' placeholder='별명 (2~15자)' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Label>약관 동의</Form.Label>
          <Form.Check
            onChange={handleCheckAll}
            checked={isAllAgreed}
            type='checkbox'
            label='전체동의'
          />
          {/* {agreeList.map((agree, index) => (
            <Form.Check
              onChange={(e) => handleCheckAgreement(e, agree, index)}
              key={index}
              checked={agreements[index]}
              type='checkbox'
              label={agree}
            />
          ))} */}
          <Form.Check
            onChange={handlePersonalInfoAgreement}
            checked={isPersonalInfoAgree}
            type='checkbox'
            label={agreeList[0]}
          />
          <Form.Check
            onChange={handleMarketingAgreement}
            checked={isMarketingAgree}
            type='checkbox'
            label={agreeList[1]}
          />
        </Form.Group>
        <div className='d-flex justify-content-center'>
          <Button variant='primary' type='submit' className='w-100 mt-3'>
            회원가입
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}
