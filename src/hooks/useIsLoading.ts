import { State } from "@redux/reducers/root";
import { useSelector } from "react-redux";

/**
 * return true if at least one necessary part of application is loading
 * else false
 */
const useIsLoading = () => {
    const ads = useSelector<State, boolean>(state => state.advertisementReducer.loading);
    const controlWorks = useSelector<State, boolean>(state => state.controlWorkReducer.loading);
    const homework = useSelector<State, boolean>(state => state.homeworkReducer.loading);
    const lessons = useSelector<State, boolean>(state => state.lessonReducer.loading);
    const marks = useSelector<State, boolean>(state => state.marksReducer.loading);
    const user = useSelector<State>(state => state.userReducer) === null;

    return ads || controlWorks || homework || lessons || marks || user;
}

export default useIsLoading;
