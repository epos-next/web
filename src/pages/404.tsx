import React, { useEffect } from "react";
import { navigate } from "gatsby-link";

export default function Page404() {

    useEffect(() => {
        navigate("/");
    }, []);

    return <React.Fragment/>
}
