import {
    addAdvertisement,
    setAdvertisements,
    setAdvertisementsLoading,
    setIsAdCreatorOpen
} from "@redux/actions/advertisement-actions";
import { AnyAction } from "redux";
import { Advertisement } from "../../models/advertisement";

export type AdvertisementState = {
    advertisements: Advertisement[],
    loading: boolean,
    isCreatorOpen: boolean,
}

export const initialState: AdvertisementState = {
    advertisements: [],
    loading: true,
    isCreatorOpen: false,
}

export default (state: AdvertisementState = initialState, action: AnyAction): AdvertisementState => {

    if (setAdvertisementsLoading.match(action)) {
        return {
            ...state,
            loading: action.payload,
        }
    }

    if (addAdvertisement.match(action)) {
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

    if (setAdvertisements.match(action)) {
        return {
            ...state,
            advertisements: action.payload,
        }
    }

    return state;
}

