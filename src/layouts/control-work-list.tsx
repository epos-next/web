import LessonSkeleton from "@components/lesson-skeleton";
import LessonWithDate from "@components/lesson-with-date";
import UiHelper from "@helpers/ui-helper";
import { AddIcon, GridComponentContainer, TitleHeader } from "@layouts/main-content";
import CreateControlWorkModalWindow, { CreateControlWorkData } from "@layouts/modal-windows/create-control-work-modal-window";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
    addControlWork,
    setIsControlWorkCreatorOpen,
    selectControlWorks,
    selectIsControlWorkCreatorOpen
} from "@redux/reducers/control-work-reducer";
import { selectMarksLessons } from "@redux/reducers/marks-reducer";
import ApiService from "@services/api-service";
import CacheService from "@services/cache-service";
import {
    isBadRequestApiError,
    isForbiddenApiError,
    isServerErrorApiError
} from "@utils/metadata/type-guards";
import lodash from "lodash";
import React from "react";
import useIsLoading from "../hooks/useIsLoading";
import { ControlWork } from "../models/control-work";

const ControlWorkList: React.FC = () => {
    const { values, handlers } = useControlWorkList();

    return <React.Fragment>
        <GridComponentContainer>
            <TitleHeader>
                <h4>Контрольные работы</h4>
                <AddIcon
                    src="/icons/plus-icon.png"
                    onClick={ handlers.openControlWorkCreator }/>
            </TitleHeader>
            {
                values.loading
                    ? lodash.times(2).map((_, i) => {
                        return <LessonSkeleton key={ `control-work-skeleton-${ i }` }/>
                    })
                    : values.controlWorks.map(({ lesson, date, name }, i) => {
                        return <LessonWithDate
                            key={ `control-work-${ i }` }
                            date={ date }
                            subject={ UiHelper.formatSubjectName(lesson) }
                            subtitle={ name }/>
                    })
            }
        </GridComponentContainer>
        <CreateControlWorkModalWindow
            isOpen={ values.isControlWorkCreatorOpen }
            onClose={ handlers.closeControlWorkCreator }
            onConfirm={ handlers.createControlWork }
            lessonNames={ values.lessonNames }/>
    </React.Fragment>
}

export default ControlWorkList;

const useControlWorkList = () => {
    const dispatch = useAppDispatch();

    return {
        values: {
            loading: useIsLoading(),
            controlWorks: useAppSelector(selectControlWorks),
            isControlWorkCreatorOpen: useAppSelector(selectIsControlWorkCreatorOpen),
            lessonNames: useAppSelector(selectMarksLessons),
        },
        handlers: {
            openControlWorkCreator: () => dispatch(setIsControlWorkCreatorOpen(true)),
            closeControlWorkCreator: () => dispatch(setIsControlWorkCreatorOpen(false)),
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
                    .catch((error) => {
                        // handle forbidden
                        if (isForbiddenApiError(error)) UiHelper.showErrorToast(
                            "Произошла ошибка при создании котрольной работы. Отказано в доступе"
                        )

                        // handle bad request
                        if (isBadRequestApiError(error)) UiHelper.showErrorToast(
                            "Произошла ошибка при создании контрольной работы. Неверно переданы данные"
                        )

                        // handle server error
                        if (isServerErrorApiError(error)) UiHelper.showErrorToast(
                            "Произошла непредвиденная ошибка. Повторите попытку позже"
                        )
                    })
            },
        },
    }
}
