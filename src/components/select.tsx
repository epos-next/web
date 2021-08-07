import React, { PropsWithChildren } from "react";
import { styles } from "@components/input";
import styled from "styled-components";

export type Props = React.ComponentPropsWithoutRef<"select"> & {
    error?: boolean,
};

const Select: React.FC<Props> = (props: PropsWithChildren<Props>) => {
    return <Container>
        <SelectBase { ...props } data-error={ props.error }>
            { props.children }
        </SelectBase>
        <Icon src="/icons/arrow-icon.png"/>
    </Container>
}

const SelectBase = styled.select`
  ${ styles };
  appearance: none;
`;

const Icon = styled.img`
  position: absolute;
  top: 16px;
  right: 14px;
`;

const Container = styled.div`
  position: relative;
  width: 100%;

  select:invalid {
    color: var(--light-primary);
  }
`;

export default Select;
