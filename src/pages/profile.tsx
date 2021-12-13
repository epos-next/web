import Button from "@components/button";
import React from "react";
import styled from "styled-components";
import useProfilePage from "../hooks/useProfilePage";

export default function ProfilePage() {
    const { handlers } = useProfilePage();

    return <Page>
        <Title>Эта страница пока в разработке, но вы можете</Title>
        <Button onClick={ handlers.logout }>Выйти</Button>
        <AppVersion>{ process.env.APP_VERSION }</AppVersion>
    </Page>
}

const Title = styled.h1`
  max-width: 400px;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: var(--primary);
  text-align: center;
  margin-bottom: 20px;
`;

const Page = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const AppVersion = styled.p`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  width: 100vw;
  text-align: center;
  color: var(--light-primary);
`;
