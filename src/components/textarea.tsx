import React, { PropsWithChildren } from "react";
import { styles } from "@components/input";
import styled from "styled-components";

export type Props = React.ComponentPropsWithoutRef<"textarea"> & {
    /** Will show red border if true. Default to false */
    error?: boolean;
};

const Textarea: React.FC<Props> = (props: PropsWithChildren<Props>) => {
    return <TextareaBase {...props} data-error={props.error} />
}

export default Textarea;

const TextareaBase = styled.textarea`${ styles }`;

