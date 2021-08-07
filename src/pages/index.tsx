import React from "react"
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import HomePage from "@layouts/tabs/home";
import useIndexPage from "../hooks/useIndexPage";
import SEO from "../seo";
import Header from "@components/header";
import MarksTab from "@layouts/tabs/marks";
import SideMenuLayout from "@layouts/side-menu";
import { isIdleUserState } from "../type-guards/user-state-type-guard";

export default function IndexRoute() {
    const { values, handlers } = useIndexPage();

    const userName = isIdleUserState(values.user) ? values.user.user.name : undefined;

    return <Page data-tab={ values.tab }>
        <SEO/>
        <Header
            userName={ userName }
            onTabClick={ handlers.handleTabChanged }
            tab={ values.tab }/>

        <Group>
            <Content>
                {
                    values.tab === "home"
                        ? <HomePage/>
                        : <MarksTab/>
                }
            </Content>
            <Divider/>
            <SideMenuLayout
                date={ values.selectedDate }
                loading={ values.lessonsLoading }
                onDateChanged={ handlers.onDateChanged }
                lessons={ values.lessons }/>
        </Group>
        <ToastContainer/>
    </Page>
}

const Content = styled.section`
  margin-top: 40px;

  .welcome-tile[data-show=true] {
    margin-bottom: 35px;
  }
`;

const Divider = styled.div`
  height: 100%;
  width: 2px;
  background-color: var(--disable);
`;

const Group = styled.div`
  height: 100%;
  min-height: calc(100vh - 63px);
  display: grid;
  grid-template-columns: 1fr 2px 272px;
  column-gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (min-width: 960px) and (max-width: 1200px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

const Page = styled.main`
  height: 100%;
  min-height: 100vh;
  padding-left: calc(100vw - 100%);

  @media screen and (max-width: 1200px) {
    &[data-tab=marks] .side_menu-layout {
      display: none;
    }
  }
`;
