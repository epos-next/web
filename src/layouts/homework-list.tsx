import LessonSkeleton from "@components/lesson-skeleton";
import LessonTodo from "@components/lesson-todo";
import { GridComponentContainer } from "@layouts/main-content";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectHomework, invertHomeworkDone } from "@redux/reducers/homework-reducer";
import ApiService from "@services/api-service";
import CacheService from "@services/cache-service";
import lodash from "lodash";
import React from "react";
import useIsLoading from "../hooks/useIsLoading";

const HomeworkList: React.FC = () => {
    const homework = useAppSelector(selectHomework)
    const isLoading = useIsLoading()
    const dispatch = useAppDispatch()

    function onHomeworkClick(id: number, done: boolean) {
        dispatch(invertHomeworkDone(id));
        CacheService.setIsHomeworkDone(id, done);
        ApiService.changeHomeworkStatus(id, done);
    }

    if (homework.length !== 0 || isLoading) {
        return <GridComponentContainer>
            <h4>Домашнее задание</h4>
            {
                isLoading
                    ? lodash.times(2).map((_, i) => {
                        return <LessonSkeleton key={ `homework-skeleton-${ i }` }/>
                    })
                    : homework
                        .slice()
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map(({ content, done, lesson, id }, i) => {
                            return <LessonTodo
                                onClick={ (done) => onHomeworkClick(id, done) }
                                key={ `homework-lesson-${ i }` }
                                done={ done }
                                subject={ lesson }
                                subtitle={ content }/>
                        })
            }
        </GridComponentContainer>
    }

    return <React.Fragment/>
}

export default HomeworkList;
