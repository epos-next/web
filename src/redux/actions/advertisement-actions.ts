import { createAction } from "@reduxjs/toolkit";
import { Advertisement } from "../../models/advertisement";

export const setIsAdCreatorOpen = createAction<boolean>("setIsAdCreatorOpen")
export const setAdvertisements = createAction<Advertisement[]>("setAdvertisements")
export const setAdvertisementsLoading = createAction<boolean>("setAdvertisementsLoading")
export const addAdvertisement = createAction<Advertisement>("addAdvertisement")
