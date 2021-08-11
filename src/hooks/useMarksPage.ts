import { useAppSelector } from "@redux/hooks";
import { selectMarks, selectMarksLoading } from "@redux/reducers/marks-reducer";

export default function useMarksPage() {

    // Get state
    const marks = useAppSelector(selectMarks);
    const loading = useAppSelector(selectMarksLoading);

    return {
        state: {
            marks,
            loading,
        }
    }
}
