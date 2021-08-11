import { RootState } from "@redux/reducers/root";
import { useSelector } from "react-redux";
import { Marks } from "../models/marks";

export default function useMarksPage() {

    // Get state
    const marks = useSelector<RootState, Marks | null>(state => state.marksReducer.marks);
    const loading = useSelector<RootState, boolean>(state => state.marksReducer.loading);

    return {
        state: {
            marks,
            loading,
        }
    }
}
