import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/reducers/user-reducer";
import CacheService from "@services/cache-service";
import React, { useState } from "react";
import MainContentLayout from "@layouts/main-content";
import WelcomeTile from "@components/welcome-tile";

const HomePage: React.FC = () => {
    const { values, handlers } = useHomePage()

    return <div>
        <WelcomeTile
            name={ values.welcomeTile.name }
            onClose={ handlers.closeWelcomeTile }
            show={ values.welcomeTile.show }/>

        <MainContentLayout/>
    </div>
}

export default HomePage;

const useHomePage = () => {
    const [showWelcomeTile, setShowWelcomeTile] = useState(CacheService.showWelcomeTile);
    const user = useAppSelector(selectUser)

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
