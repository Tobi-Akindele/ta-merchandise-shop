import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: 'center' })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: '80%' })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #303f9f;
  color: white;
  cursor: pointer;
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  console.log(email);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please provide your email');
      return;
    } else {
      try {
        await publicRequest.post('/newsletter', email);
        toast.success('Thank you for signing up for our newsletter');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Title>Newsletter</Title>
      <Description>
        Get timely updates from your favourite products.
      </Description>
      <InputContainer>
        <Input
          name='email'
          type='email'
          placeholder='Your email'
          required
          onChange={handleChange}
        />
        <Button onClick={handleClick}>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
