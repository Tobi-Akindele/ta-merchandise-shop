import styled from 'styled-components';
import { sliderItems } from '../data';
import { mobile } from '../responsive';
import React from 'react';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #fcfdff;
  overflow: hidden;
  ${mobile({ display: 'none' })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Image = styled.img`
  height: 90%;
`;

const Title = styled.h1`
  font-size: 70px;
`;
const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Anchor = styled.a`
  padding: 10px;
  font-size: 20px;
  border: 1px solid black;
  text-decoration: none;
  color: #323232;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  return (
    <Container>
      <Wrapper>
        {sliderItems.map((item) => (
          <Slide key={item.id}>
            <ImageContainer>
              <Image src={item.img} alt={item.alt} />
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              <Anchor href='#categories'>SHOP NOW</Anchor>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Slider;
