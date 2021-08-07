import React, { useState } from "react";
import styled from "styled-components";
import ModalWindowBase from "@components/modal-window-base";

export default function Test() {
    const [open, setOpen] = useState(false);

    return <Page>
        <button onClick={ () => setOpen(true) }>open</button>
        <ModalWindowBase onClose={ () => null } isOpen={ open }>
            <h2>Some content</h2>
            <button onClick={ () => setOpen(false) }>close</button>
        </ModalWindowBase>
    </Page>
}


const Page = styled.main`
`;
