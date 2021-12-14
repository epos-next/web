import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectLessonLoading, selectLessons, setLessons, setLessonsLoading } from "@redux/reducers/lesson-reducer";
import ApiService from "@services/api-service";
import CacheService from "@services/cache-service";
import moment from "moment";
import { useState } from "react";
import { extractTodayLessons } from "./useIndexPage";

export default function useSideMenu() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dispatch = useAppDispatch();

    // Lessons selectors
    const lessons = useAppSelector(selectLessons);
    const lessonsLoading = useAppSelector(selectLessonLoading);

    return {
        lessons,
        lessonsLoading,
        selectedDate,
        onDateChanged: async (date: Date) => {
            setSelectedDate(date);

            // if (moment(date).startOf("isoWeek").format("YYYY-MM-DD")
            //     == moment().startOf("isoWeek").format("YYYY-MM-DD")) return;

            const isSummer = date.getMonth() >= 5 && date.getMonth() <= 7;
            if (isSummer) return dispatch(setLessons([]));

            const cachedSchedule = CacheService.getScheduleAt(date);

            // Calculation start and end of the week
            const now = moment(date);
            const from = now.startOf("isoWeek").toDate();
            const to = now.endOf("isoWeek").toDate();

            if (!cachedSchedule) {
                // show loading state
                dispatch(setLessonsLoading(true));

                // Fetching lessons
                const lessons = await ApiService.getLessons(from, to);

                // Saving lessons in redux store
                dispatch(setLessons(extractTodayLessons(date, lessons)));

                // Caching lessons
                CacheService.setWeekSchedule(lessons);

                // show normal state view
                dispatch(setLessonsLoading(false));
            } else {
                // Get lessons from cache and save in redux store
                dispatch(setLessons(cachedSchedule));
            }

        },
    }
}
