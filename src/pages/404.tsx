import React, { useEffect } from "react";
import { navigate } from "gatsby-link";

export default function Page404() {

    // some change

    useEffect(() => {
        navigate("/");
    }, []);

    return <React.Fragment/>
}
