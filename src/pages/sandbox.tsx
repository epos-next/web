import React from "react";
import styled from "styled-components";

export default function SandboxPage() {
    return <Container>
        <Player
            allow='autoplay'
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"/>
    </Container>
}

const Player = styled.iframe`
  width: 100%;
  max-width: 1920px;
  height: 100%;
`;

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px;
`;
