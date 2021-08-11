import AdvertisementComponent from "@components/advertisement";
import { AddIcon, GridComponentContainer, TitleHeader } from "@layouts/main-content";
import CreateAdModalWindow, { CreateAdData } from "@layouts/modal-windows/create-ad-modal-window";
import { addAdvertisement, setIsAdCreatorOpen } from "@redux/actions/advertisement-actions";
import { AdvertisementState } from "@redux/reducers/advertisement-reducer";
import { State } from "@redux/reducers/root";
import ApiService from "@services/api-service";
import CacheService from "@services/cache-service";
import React from "react";
import ContentLoader from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import useIsLoading from "../hooks/useIsLoading";
import { Advertisement } from "../models/advertisement";

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
    </React.Fragment>
}

const useAdvertisementList = () => {
    const state = useSelector<State, AdvertisementState>(state => state.advertisementReducer)
    const dispatch = useDispatch();

    return {
        values: {
            loading: useIsLoading(),
            advertisements: state.advertisements,
            isAdCreatorOpen: state.isCreatorOpen,
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
                    .catch(console.error) // todo
            }
        }
    }
}

export default AdvertisementList;
