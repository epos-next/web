import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/reducers/user-reducer";
import CacheService from "@services/cache-service";
import React, { useEffect, useState } from "react";
import MainContentLayout from "@layouts/main-content";
import WelcomeTile from "@components/welcome-tile";

const HomePage: React.FC = () => {
    const { values, handlers } = useHomePage()

    return <React.Fragment>
        <WelcomeTile
            name={ values.welcomeTile.name }
            onClose={ handlers.closeWelcomeTile }
            show={ values.welcomeTile.show }/>

        <MainContentLayout/>
    </React.Fragment>
}

export default HomePage;

const useHomePage = () => {
    const [showWelcomeTile, setShowWelcomeTile] = useState(CacheService.showWelcomeTile);
    const user = useAppSelector(selectUser)

    useEffect(() => {
        setShowWelcomeTile(CacheService.showWelcomeTile);
    }, [])

    return {
        values: {
            welcomeTile: {
                name: user ? user.name.split(" ")[1] : "мой друг",
                show: showWelcomeTile,
            }
        },
        handlers: {
            closeWelcomeTile: () => {
                setShowWelcomeTile(false);
                CacheService.doNotShowWelcomeTile();
            }
        }
    }
}
