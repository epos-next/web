import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby-link";
import ContentLoader from "react-content-loader";
import BurgerMenu from "@components/header/burger-menu";
import Slide from "@components/header/slide";

export type Props = {
    /** User name displayed on right side. Will show loading skeleton if null */
    userName?: string;

    /** Currently selected tab. Default to "home" */
    tab?: TabQuery;

    /** Triggering while user clicking on not selected tab */
    onTabClick?: (tab: TabQuery) => any;
};

export type TabQuery = "home" | "marks";

const Header: React.FC<Props> = (props) => {
    // state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    let logoClickAmount = 0;

    // props
    const selectedTab = props.tab ?? "home";

    // handlers
    const handleOnTabClick = (tab: TabQuery) => {
        if (tab != selectedTab && props.onTabClick) props.onTabClick(tab);
    }
    const handleLogoClick = () => {
        if (logoClickAmount === 4) navigate("/sandbox");
        logoClickAmount++;
    };
    const handleUserClick = () => navigate("/profile")

    return <Container>
        {/* Logo and Name */ }
        <ProjectGroup>
            <Logo width={ 40 } height={ 40 } src="/logo-40x40.webp" onClick={ handleLogoClick }/>
            <ProjectName>Эпос Next</ProjectName>
        </ProjectGroup>

        {/* Tabs */ }
        <Tabs selectedTab={ selectedTab }>
            <Tab onClick={ () => handleOnTabClick("home") } data-selected={ selectedTab === "home" }>Главная</Tab>
            <Tab onClick={ () => handleOnTabClick("marks") } data-selected={ selectedTab === "marks" }>Оценки</Tab>
        </Tabs>

        <UserGroup>
            {
                props.userName
                    ? <React.Fragment>
                        <span onClick={ handleUserClick }>{ props.userName }</span>
                        {/*<img src="/icons/arrow-icon.png" alt="arrow icon"/>*/ }
                    </React.Fragment>
                    : <ContentLoader width="200" height="30">
                        <rect x="0" y="0" rx="5" ry="5" width="200" height="30"/>
                    </ContentLoader>
            }
        </UserGroup>

        <BurgerMenu open={ mobileMenuOpen } onClick={ () => setMobileMenuOpen(!mobileMenuOpen) }/>
        <Slide open={ mobileMenuOpen } onClose={ () => setMobileMenuOpen(false) }/>
    </Container>
}

export default Header;

const UserGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  // Arrow icon
  // todo: user menu
  img {
    margin-left: 15px;
  }

  // User name
  span {
    font-size: 18px;
    line-height: 21px;
    color: var(--primary);
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Tab = styled.a`
  font-size: 18px;
  line-height: 21px;
  position: relative;
  margin: 20px 40px 20px 40px;
  cursor: pointer;
  color: var(--light-primary);
  transition: 200ms color;

  &[data-selected=true] {
    cursor: initial;
    color: var(--contrast);
  }
`;

const Tabs = styled.div<{ selectedTab: TabQuery }>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 106px;
    height: 5px;
    left: 0;
    right: 0;
    top: -2px;
    margin: 0 auto;
    border-radius: 5px;
    background-color: var(--contrast);
    box-shadow: 0 3px 30px rgba(109, 115, 253, 1);
    transition: 200ms transform ease-in-out;

    transform: translateX(${ props => props.selectedTab === "home" ? "-72px" : "72px" });
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  margin-right: 20px;
`;

const ProjectName = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: var(--contrast);
  flex: 0 0 auto;
`;

const ProjectGroup = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin: 10.5px 0;
  }
`;

const Container = styled.header`
  width: 100%;
  border-bottom: var(--disable);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 2px solid var(--disable);
  padding: 0 max(calc((100% - 1200px) / 2), 20px);

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .burger-outside-container.open {
    position: fixed;
    top: 20px;
    right: 20px;
    height: 34px;
    width: 34px;
    z-index: 100000000;
  }
`;


