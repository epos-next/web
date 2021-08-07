import {
    addAdvertisement,
    setIdleAdvertisementsState,
    setLoadingAdvertisementsState,
    setIsAdCreatorOpen
} from "@redux/actions/advertisement-actions";
import { AnyAction } from "redux";
import { Advertisement } from "../../models/advertisement";
import { isIdleAdvertisementState } from "../../type-guards/advertisement-reducer-type-guard";

export type AdvertisementState = LoadingAdvertisementState | IdleAdvertisementState

export type AdvertisementStateAddon = { isCreatorOpen: boolean }
export type LoadingAdvertisementState = { loading: true } & AdvertisementStateAddon
export type IdleAdvertisementState = { loading: false, advertisements: Advertisement[] } & AdvertisementStateAddon

export const initialState: LoadingAdvertisementState = {
    loading: true,
    isCreatorOpen: false,
}

export default (state: AdvertisementState = initialState, action: AnyAction): AdvertisementState => {

    if (setLoadingAdvertisementsState.match(action)) {
        return {
            ...state,
            loading: true,
        }
    }

    if (addAdvertisement.match(action) && isIdleAdvertisementState(state)) {
        const advertisements = [...state.advertisements, action.payload];
        return {
            ...state,
            advertisements
        }
    }

    if (setIsAdCreatorOpen.match(action)) {
        return {
            ...state,
            isCreatorOpen: action.payload,
        }
    }

    if (setIdleAdvertisementsState.match(action)) {
        return {
            ...state,
            loading: false,
            advertisements: action.payload,
        }
    }

    return state;
}

