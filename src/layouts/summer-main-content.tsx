import React from "react";
import styled from "styled-components";

const SummerMainContent: React.FC = () => {
    return <Container>
        <Text>Сейчас лето, тебе тут делать нечего)</Text>
    </Container>
}

export default SummerMainContent;

const Text = styled.span`
  font-size: 18px;
  color: var(--secondary);
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
