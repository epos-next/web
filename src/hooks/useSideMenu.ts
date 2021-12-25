import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
    selectIsScheduleLoading,
    selectSchedule,
    selectSelectedDate,
    setNewSchedule,
    setSelectedDate,
} from "@redux/reducers/schedule-reducer";
import ApiService from "@services/api-service";
import CacheService from "@services/cache-service";
import moment from "moment";
import { extractTodayLessons } from "./useIndexPage";

export default function useSideMenu() {
    const dispatch = useAppDispatch();

    // Lessons selectors
    const selectedDate = useAppSelector(selectSelectedDate)
    const lessons = useAppSelector(selectSchedule);
    const lessonsLoading = useAppSelector(selectIsScheduleLoading);

    return {
        lessons,
        lessonsLoading,
        selectedDate,
        onDateChanged: async (date: Date) => {
            // if (moment(date).startOf("isoWeek").format("YYYY-MM-DD")
            //     == moment().startOf("isoWeek").format("YYYY-MM-DD")) return;

            console.log(date);

            const isSummer = date.getMonth() >= 5 && date.getMonth() <= 7;
            if (isSummer) return dispatch(setNewSchedule({ date, schedule: [] }));

            const cachedSchedule = CacheService.getScheduleAt(date);

            // Calculation start and end of the week
            const now = moment(date);
            const from = now.startOf("isoWeek").toDate();
            const to = now.endOf("isoWeek").toDate();

            if (!cachedSchedule) {
                // show loading state
                dispatch(setSelectedDate(date));

                // Fetching lessons
                const lessons = await ApiService.getLessons(from, to);

                // Saving lessons in redux store
                dispatch(setNewSchedule({ date, schedule: extractTodayLessons(date, lessons) }));

                // Caching lessons
                CacheService.setWeekSchedule(lessons);
            } else {
                // Get lessons from cache and save in redux store
                dispatch(setNewSchedule({ date, schedule: cachedSchedule }));
            }
        },
    }
}
