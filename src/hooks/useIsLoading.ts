import { useAppSelector } from "@redux/hooks";
import { selectAdsLoading } from "@redux/reducers/advertisement-reducer";
import { selectControlWorksLoading } from "@redux/reducers/control-work-reducer";
import { selectHomeworkLoading } from "@redux/reducers/homework-reducer";
import { selectLessonLoading } from "@redux/reducers/lesson-reducer";
import { selectMarksLoading } from "@redux/reducers/marks-reducer";
import { selectUserLoading } from "@redux/reducers/user-reducer";

/**
 * return true if at least one necessary part of application is loading
 * else false
 */
const useIsLoading = () => {
    const ads = useAppSelector(selectAdsLoading)
    const controlWorks = useAppSelector(selectControlWorksLoading)
    const homework = useAppSelector(selectHomeworkLoading);
    const lessons = useAppSelector(selectLessonLoading);
    const marks = useAppSelector(selectMarksLoading);
    const user = useAppSelector(selectUserLoading);

    return ads || controlWorks || homework || lessons || marks || user;
}

export default useIsLoading;
