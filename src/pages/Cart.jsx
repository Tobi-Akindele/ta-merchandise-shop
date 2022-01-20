// import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcements from '../components/Announcements';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mobile } from '../responsive';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethods';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { DeleteOutlineOutlined } from '@material-ui/icons';
import { deleteProduct } from '../redux/cartRedux';

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
  &:disabled {
    cursor: not-allowed;
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DeleteItemContainer = styled.div``;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  height: 50v;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  let navigate = useNavigate();
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.currentUser);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/payments', {
          stripeToken: stripeToken.id,
          amount: addTax(cart.total) * 100,
        });
        navigate('/success', {
          state: {
            stripeData: res.data,
            products: cart,
            total: addTax(cart.total),
          },
        });
      } catch (error) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, navigate]);

  const addTax = (total) => {
    return parseFloat((total + total * 0.2).toFixed(2));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Container>
      <Announcements />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to='/'>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({quantity})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <StripeCheckout
            name='TA Merchandise'
            image='https://i.ibb.co/qDMmCx3/icon-512x512.png'
            billingAddress
            shippingAddress
            description={`Your total is £${(
              cart.total +
              cart.total * 0.2
            ).toFixed(2)}`}
            amount={addTax(cart.total) * 100}
            currency='GBP'
            token={onToken}
            stripeKey={KEY}
          >
            <TopButton type='filled' disabled={quantity < 1 ? true : false}>
              CHECKOUT
            </TopButton>
          </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <>
                <Product key={product.id}>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product.id}
                      </ProductId>
                      <ProductId>
                        <b>Price Per Unit:</b> £ {product.price}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <DeleteItemContainer
                      onClick={() => handleDeleteItem(product.id)}
                    >
                      <DeleteOutlineOutlined
                        style={{ cursor: 'pointer', margin: '5px' }}
                      />
                    </DeleteItemContainer>
                    <ProductAmountContainer>
                      {/* <Remove /> */}
                      <b>Quantity:</b>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      {/* <Add /> */}
                    </ProductAmountContainer>
                    <ProductPrice>
                      £ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>£ {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>£ 4.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>£ -4.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Tax</SummaryItemText>
              <SummaryItemPrice>
                £ {(0.2 * cart.total).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>£ {addTax(cart.total)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name='TA Merchandise'
              image='https://i.ibb.co/qDMmCx3/icon-512x512.png'
              billingAddress
              shippingAddress
              description={`Your total is £${(
                cart.total +
                cart.total * 0.2
              ).toFixed(2)}`}
              amount={addTax(cart.total) * 100}
              currency='GBP'
              token={onToken}
              stripeKey={KEY}
            >
              <Button disabled={quantity < 1 ? true : false}>
                CHECKOUT NOW
              </Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
