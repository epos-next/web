import DateHelper from "@helpers/date-helper";
import UiHelper from "@helpers/ui-helper";
import { setAdvertisements, setAdvertisementsLoading } from "@redux/actions/advertisement-actions";
import { setControlWorks, setControlWorksLoading } from "@redux/actions/control-work-actions";
import { setHomework, setHomeworkLoading } from "@redux/actions/homework-actions";
import { setLessonLoading, setLessons, setNextLesson, SetNextLessonAction } from "@redux/actions/lesson-actions";
import { setMarks } from "@redux/actions/marks-actions";
import { setUser } from "@redux/actions/user-actions";
import { State } from "@redux/reducers/root";
import CacheService from "@services/cache-service";
import { getData } from "@services/data-service";
import { navigate } from "gatsby-link";
import moment from "moment";
import React, { useEffect, useState } from "react";
import MainContentLayout from "@layouts/main-content";
import WelcomeTile from "@components/welcome-tile";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Lesson } from "../../models/lesson";
import { User } from "../../models/user";

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
    const user = useSelector<State, User | null>(state => state.userReducer.user)

    const dispatch = useDispatch();

    return {
        values: {
            welcomeTile: {
                name: user ? user.name.split(" ")[1] : "мой друг",
                show: showWelcomeTile,
            }
        },
        handlers: {
            closeWelcomeTile: () => setShowWelcomeTile(false)
        }
    }
}
