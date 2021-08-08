import { CreateAdData } from "@layouts/modal-windows/create-ad-modal-window";
import { CreateControlWorkData } from "@layouts/modal-windows/create-control-work-modal-window";
import { addAdvertisement, setIsAdCreatorOpen } from "@redux/actions/advertisement-actions";
import { addControlWork, setIsControlWorkCreatorOpen } from "@redux/actions/control-work-actions";
import { invertHomeworkDone } from "@redux/actions/homework-actions";
import { State } from "@redux/reducers/root";
import ApiService from "@services/api-service";
import moment from "moment";
import CacheService from "@services/cache-service";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Advertisement } from "../models/advertisement";
import { ControlWork } from "../models/control-work";
import { Homework } from "../models/homework";
import { Lesson } from "../models/lesson";
import { Marks } from "../models/marks";
import { User } from "../models/user";

export default function useHomePage() {
    const [showWelcomeTile, setShowWelcomeTile] = useState(CacheService.showWelcomeTile);

    const dispatch = useDispatch();

    // User selector
    const user = useSelector<State, User | null>(state => state.userReducer.user);

    // Lessons selectors
    const nextLesson = useSelector<State, Lesson | null>(state => state.lessonReducer.nextLesson);
    const timeLeftToNextLesson = useSelector<State, string>(state => state.lessonReducer.timeLeftToNextLesson);
    const nextLessonType = useSelector<State, string>(state => state.lessonReducer.nextLessonType);

    // Homework selectors
    const homework = useSelector<State, Homework[]>(state => state.homeworkReducer.homework);
    const homeworkLoading = useSelector<State, boolean>(state => state.homeworkReducer.loading);

    // Control works selectors
    const controlWorks = useSelector<State, ControlWork[]>(state => state.controlWorkReducer.controlWorks);
    const controlWorksLoading = useSelector<State, boolean>(state => state.controlWorkReducer.loading);
    const isControlWorkCreatorOpen = useSelector<State, boolean>(state => state.controlWorkReducer.isControlWorkCreatorOpen);

    // Advertisements selectors
    const ads = useSelector<State, Advertisement[]>(state => state.advertisementReducer.advertisements);
    const adsLoading = useSelector<State, boolean>(state => state.advertisementReducer.loading);
    const isAdCreatorOpen = useSelector<State, boolean>(state => state.advertisementReducer.isCreatorOpen);

    // Marks selectors
    const marks = useSelector<State, Marks | null>(state => state.marksReducer.marks)

    return {
        loading: {
            all: controlWorksLoading || homeworkLoading || adsLoading,
            main: controlWorksLoading || homeworkLoading || adsLoading,
            controlWorks: controlWorksLoading,
            homework: homeworkLoading,
            ads: adsLoading,
        },
        values: {
            showWelcomeTile,
            isControlWorkCreatorOpen,
            isAdCreatorOpen,
            lessonNames: Object.keys(marks ?? {}),
        },
        data: {
            ads,
            homework,
            controlWorks,
            user,
            nextLesson: {
                lesson: nextLesson,
                timeTo: timeLeftToNextLesson,
                type: nextLessonType,
            },
        },
        handlers: {
            closeWelcomeTile: () => {
                CacheService.doNotShowWelcomeTile();
                setShowWelcomeTile(false);
            },
            onHomeworkCompletenessChanged: (id: number, done: boolean) => {
                dispatch(invertHomeworkDone(id));
                CacheService.setIsHomeworkDone(id, done);
            },
            onClickOnControlWorkCreator: (value: boolean) => {
                dispatch(setIsControlWorkCreatorOpen(value));
            },
            createControlWork(data: CreateControlWorkData) {
                const controlWork: ControlWork = {
                    ...data,
                    id: Math.ceil(Math.random() * -1000),
                }

                // Add to redux store
                dispatch(addControlWork(controlWork));

                // Make a request to api
                ApiService.createControlWork(controlWork)
                    .then(id => {
                        // get an id from server and save in obj
                        controlWork.id = id;

                        // save to cache
                        CacheService.addControlWork(controlWork);

                        /// note: if in future I will add ability to delete / update
                        /// control works, need to save this id in redux store cause
                        /// just created control works storing without id until user
                        /// refreshed the page
                    })
                    .catch(console.error) // todo
            },
            onClickOnAdCreator: (open: boolean) => {
                dispatch(setIsAdCreatorOpen(open));
            },
            onCreateAd: (data: CreateAdData) => {
                const ad: Advertisement = {
                    ...data,
                    id: Math.ceil(Math.random() * -1000),
                }

                // Add to redux store
                dispatch(addAdvertisement(ad));

                // Make a request to api
                ApiService.createAdvertisement(ad)
                    .then(id => {
                        // get an id from server and save in obj
                        ad.id = id;

                        // save to cache
                        CacheService.addAdvertisement(ad);

                        /// note: if in future I will add ability to delete / update
                        /// advertisements, need to save this id in redux store cause
                        /// just created advertisements storing without id until user
                        /// refreshed the page
                    })
                    .catch(console.error) // todo
            }
        }
    }
}


export const extractTodayLessons = (date: Date, data: Lesson[]): Lesson[] => {
    // Checking for null or undefined
    if (!date) return [];

    const target = moment(date).format(moment.HTML5_FMT.DATE);
    return data
        .filter(x => x.date.includes(target))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
