import { AdvertisementState, IdleAdvertisementState } from "@redux/reducers/advertisement-reducer";
import { isAdvertisement } from "./models";

export function isIdleAdvertisementState(state: AdvertisementState): state is IdleAdvertisementState {
    return !(state as IdleAdvertisementState).loading
        && Array.isArray((state as IdleAdvertisementState).advertisements)
        && (state as IdleAdvertisementState).advertisements.every(e => isAdvertisement(e))
}
