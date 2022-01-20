import styled from 'styled-components';
import { mobile } from '../responsive';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../firebase';
import { addUser } from '../redux/apiCalls';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://i.ibb.co/34kzY1K/molly-mears-unsplash.jpg') center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  /* flex-wrap: wrap; */
  flex-direction: column;
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  margin-bottom: 10px;
  background-color: #303f9f;
  color: white;
  cursor: pointer;
`;

const Anchor = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Register = () => {
  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const validateFields = () => {
    const { firstName, lastName, username, email, password, confirmPassword } =
      inputs;
    if (!firstName) {
      toast.error('First name is required');
      return true;
    }
    if (!lastName) {
      toast.error('Last name is required');
      return true;
    }
    if (!username) {
      toast.error('Username is required');
      return true;
    }
    if (!email) {
      toast.error('Email is required');
      return true;
    }
    if (!password) {
      toast.error('Password is required');
      return;
    }
    if (!confirmPassword) {
      toast.error('Confirm password is required');
      return true;
    }
    if (password !== confirmPassword) {
      toast.error('Password does not match');
      return true;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (getDownloadURL) => {
                const user = {
                  ...inputs,
                  image: getDownloadURL,
                };
                try {
                  await addUser(user, dispatch);
                  toast.success('Account creation successful');
                } catch (error) {
                  toast.error(error.response.data.message);
                }
              }
            );
          }
        );
      } else {
        const user = {
          ...inputs,
        };
        try {
          await addUser(user, dispatch);
          toast.info('Account creation successful');
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <FormInputContainer>
            <Input
              name='firstName'
              placeholder='first name'
              onChange={handleChange}
            />
            <Input
              name='lastName'
              placeholder='last name'
              onChange={handleChange}
            />
            <Input
              name='username'
              placeholder='username'
              onChange={handleChange}
            />
            <Input name='email' placeholder='email' onChange={handleChange} />
            <Input
              name='password'
              type='password'
              placeholder='password'
              onChange={handleChange}
            />
            <Input
              name='confirmPassword'
              type='password'
              placeholder='confirm password'
              onChange={handleChange}
            />
            <Input
              type='file'
              id='file'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </FormInputContainer>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
          <Link className='link' to='/login'>
            Already have an acount? <Anchor> LOGIN</Anchor>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
