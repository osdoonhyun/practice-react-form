import { Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(null);
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
  }, []);
  return (
    <FormContainer title={'Home'}>
      {userInfo ? (
        <>
          <h2>{userInfo?.username}님 환영합니다</h2>
          <Button onClick={handleLogout}>로그아웃 하기!</Button>
        </>
      ) : (
        <Button onClick={() => navigate('/login')}>로그인하러 가기!</Button>
      )}
    </FormContainer>
  );
}
