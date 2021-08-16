import AdvertisementComponent from "@components/advertisement";
import UiHelper from "@helpers/ui-helper";
import { AddIcon, GridComponentContainer, TitleHeader } from "@layouts/main-content";
import CreateAdModalWindow, { CreateAdData } from "@layouts/modal-windows/create-ad-modal-window";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAds, selectIsAdCreatorOpen } from "@redux/reducers/advertisement-reducer";
import ApiService from "@services/api-service";
import CacheService from "@services/cache-service";
import { isBadRequestApiError, isForbiddenApiError, isServerErrorApiError } from "@utils/metadata/type-guards";
import React from "react";
import ContentLoader from "react-content-loader";
import { ToastContainer } from "react-toastify";
import useIsLoading from "../hooks/useIsLoading";
import { Advertisement } from "../models/advertisement";
import { setIsAdCreatorOpen, addAdvertisement } from "@redux/reducers/advertisement-reducer"

const AdvertisementList: React.FC = () => {
    const { values, handlers } = useAdvertisementList()

    return <React.Fragment>
        <GridComponentContainer>
            <TitleHeader>
                <h4>Объявления</h4>
                <AddIcon onClick={ handlers.openAdCreator } src="/icons/plus-icon.png"/>
            </TitleHeader>
            {
                values.loading
                    ? <ContentLoader>
                        <rect x={ 0 } y={ 0 } rx={ 5 } ry={ 5 } width={ 200 } height={ 14 }/>
                        <rect x={ 0 } y={ 24 } rx={ 5 } ry={ 5 } width={ 250 } height={ 14 }/>
                        <rect x={ 0 } y={ 48 } rx={ 5 } ry={ 5 } width={ 210 } height={ 14 }/>
                    </ContentLoader>
                    : values.advertisements.map(({ content }, i) => {
                        const key = `ads-${ i }`;
                        return <AdvertisementComponent key={ key }>{ content }</AdvertisementComponent>
                    })
            }
        </GridComponentContainer>
        <CreateAdModalWindow
            onConfirm={ handlers.onCreateAd }
            isOpen={ values.isAdCreatorOpen }
            onClose={ handlers.closeAdCreator }
        />
        <ToastContainer/>
    </React.Fragment>
}

const useAdvertisementList = () => {
    const dispatch = useAppDispatch();

    return {
        values: {
            loading: useIsLoading(),
            advertisements: useAppSelector(selectAds),
            isAdCreatorOpen: useAppSelector(selectIsAdCreatorOpen),
        },
        handlers: {
            openAdCreator: () => dispatch(setIsAdCreatorOpen(true)),
            closeAdCreator: () => dispatch(setIsAdCreatorOpen(false)),
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
                    .catch((error) => {
                        // handle forbidden
                        if (isForbiddenApiError(error)) UiHelper.showErrorToast(
                            "Произошла ошибка при создании объявление. Отказано в доступе"
                        )

                        // handle not found
                        if (isBadRequestApiError(error)) UiHelper.showErrorToast(
                            "Произошла ошибка при создании объявление. Неверно переданы данные"
                        )

                        // handle server error
                        if (isServerErrorApiError(error)) UiHelper.showErrorToast(
                            "Произошла непредвиденная ошибка. Повторите попытку чуть позже"
                        )
                    })
            }
        }
    }
}

export default AdvertisementList;
