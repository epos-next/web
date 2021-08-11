import { RootState } from "@redux/reducers/root";
import { useSelector } from "react-redux";

/**
 * return true if at least one necessary part of application is loading
 * else false
 */
const useIsLoading = () => {
    const ads = useSelector<RootState, boolean>(state => state.advertisementReducer.loading);
    const controlWorks = useSelector<RootState, boolean>(state => state.controlWorkReducer.loading);
    const homework = useSelector<RootState, boolean>(state => state.homeworkReducer.loading);
    const lessons = useSelector<RootState, boolean>(state => state.lessonReducer.loading);
    const marks = useSelector<RootState, boolean>(state => state.marksReducer.loading);
    const user = useSelector<RootState>(state => state.userReducer) === null;

    return ads || controlWorks || homework || lessons || marks || user;
}

export default useIsLoading;
