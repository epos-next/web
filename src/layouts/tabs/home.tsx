import React from "react";
import MainContentLayout from "@layouts/main-content";
import WelcomeTile from "@components/welcome-tile";
import useHomePage from "../../hooks/useHomePage";

const HomePage: React.FC = () => {
    const { values, data, handlers, loading } = useHomePage();

    return <React.Fragment>
        <WelcomeTile
            name={ data.user ? data.user.name.split(" ")[1] : "мой друг" }
            onClose={ handlers.closeWelcomeTile }
            show={ values.showWelcomeTile }/>

        <MainContentLayout
            { ...values }
            { ...data }
            { ...handlers }
            onCreateControlWork={ handlers.createControlWork }
            advertisements={ data.ads }
            onHomeworkClick={ handlers.onHomeworkCompletenessChanged }
            loading={ loading.main }/>
    </React.Fragment>
}

export default HomePage;


