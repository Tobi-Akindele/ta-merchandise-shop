import styled from 'styled-components';
import { mobile } from '../responsive';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/apiCalls';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../style.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://i.ibb.co/PTnTD66/karsten-winegeart-unsplash.jpg') center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #303f9f;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: #303f9f;
    cursor: not-allowed;
  }
`;

const Anchor = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { username, password });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <Input
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Anchor>FORGOT PASSWORD?</Anchor>
          <Link className='link' to='/register'>
            Don't have an account? <Anchor> SIGN UP</Anchor>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
