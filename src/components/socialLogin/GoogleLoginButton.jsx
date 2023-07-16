import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function GoogleLoginButton() {
  const clientId = process.env.CLIENT_ID;

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
}
