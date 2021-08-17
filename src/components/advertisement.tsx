import React from "react";
import styled from "styled-components";

const Advertisement: React.FC = (props) => {
    return <Container className="advertisement-component">
        <Dot/>
        <ContentText>{ props.children }</ContentText>
    </Container>
}

export default Advertisement;

const ContentText = styled.p`
  font-size: 15px;
  line-height: 18px;
  color: #696969;
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  background-color: var(--light-primary);
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 5px;
  flex: 0 0 auto;
`;

const Container = styled.div`
  display: flex;
`;
