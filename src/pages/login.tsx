import Button from "@components/button";
import Input from "@components/input";
import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import useLoginPage from "../hooks/useLoginPage";

export default function LoginPage() {
    const { handlers, values } = useLoginPage();

    return <Page>
        <Header>
            <Logo width={ 80 } height={ 80 } draggable={ false } src="/logo-80x80.webp"/>
            <CompanyName>Эпос Next</CompanyName>
        </Header>
        <Form onSubmit={ handlers.onSubmit }>
            <Input onChange={ handlers.onEmailChanged } placeholder="Email" type="email"/>
            <Input onChange={ handlers.onPasswordChanged } placeholder="Пароль" password={ true }/>
            <Button id="login-button" loading={ values.isLoading }>Войти</Button>
        </Form>
        <Hint>Email и пароль от аккаунта ЭПОС.Школа </Hint>
        <ToastContainer/>
    </Page>
}

const Hint = styled.span`
  font-size: 16px;
  text-align: center;
  color: var(--light-primary);

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Form = styled.form`
  margin-top: 30px;
  width: 100%;
  max-width: 375px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .input {
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      margin-bottom: 15px;
    }
  }

  .button, .button-base {
    width: 100%;
  }
`;

const CompanyName = styled.h1`
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: var(--contrast);

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

const Logo = styled.img`
  margin-bottom: 15px;

  @media screen and (max-width: 768px) {
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Page = styled.main`
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;
