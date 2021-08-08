import LessonSkeleton from "@components/lesson-skeleton";
import LessonTodo from "@components/lesson-todo";
import { GridComponentContainer } from "@layouts/main-content";
import { invertHomeworkDone } from "@redux/actions/homework-actions";
import { HomeworkState } from "@redux/reducers/homework-reducer";
import { State } from "@redux/reducers/root";
import CacheService from "@services/cache-service";
import lodash from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const HomeworkList: React.FC= () => {
    const state = useSelector<State, HomeworkState>(state => state.homeworkReducer);
    const dispatch = useDispatch();

    function onHomeworkClick(id: number, done: boolean) {
        dispatch(invertHomeworkDone(id));
        CacheService.setIsHomeworkDone(id, done);
    }

    if (state.homework.length !== 0 || state.loading) {
        return <GridComponentContainer>
            <h4>Домашнее задание</h4>
            {
                state.loading
                    ? lodash.times(2).map((_, i) => {
                        return <LessonSkeleton key={ `homework-skeleton-${ i }` }/>
                    })
                    : state.homework.map(({ content, done, lesson, id }, i) => {
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
