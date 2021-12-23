import LessonSkeleton from "@components/lesson-skeleton";
import LessonTodo from "@components/lesson-todo";
import UiHelper from "@helpers/ui-helper";
import { GridComponentContainer } from "@layouts/main-content";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectHomework, invertHomeworkDone } from "@redux/reducers/homework-reducer";
import ApiService from "@services/api-service";
import CacheService from "@services/cache-service";
import { urlify } from "@utils/functions";
import lodash from "lodash";
import React from "react";
import styled from "styled-components";
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
                            // urlify
                            const text = urlify(
                                content,
                                (s, href) => <HomeworkLink
                                    onClick={ (e) => e.stopPropagation() }
                                    target="__blank"
                                    href={ href }>
                                    { s }
                                </HomeworkLink>,
                                (s) => <p>{ s }</p>
                            )

                            return <LessonTodo
                                onClick={ (done) => onHomeworkClick(id, done) }
                                key={ `homework-lesson-${ i }` }
                                done={ done }
                                subject={ UiHelper.formatSubjectName(lesson) }
                                subtitle={ <React.Fragment>{ text }</React.Fragment> }/>
                        })
            }
        </GridComponentContainer>
    }

    return <React.Fragment/>
}

export default HomeworkList;

const HomeworkLink = styled.a`
  color: var(--secondary);

  &:hover {
    text-decoration: underline;
  }
`;
