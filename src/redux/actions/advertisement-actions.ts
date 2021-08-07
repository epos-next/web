import { createAction } from "@reduxjs/toolkit";
import { Advertisement } from "../../models/advertisement";

export const setIsAdCreatorOpen = createAction<boolean>("setIsAdCreatorOpen")
export const setIdleAdvertisementsState = createAction<Advertisement[]>("setIdleAdvertisementsState")
export const setLoadingAdvertisementsState = createAction("setLoadingAdvertisementsState")
export const addAdvertisement = createAction<Advertisement>("addAdvertisement")
