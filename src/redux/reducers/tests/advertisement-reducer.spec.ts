import advertisementReducer, {
    setAdvertisementsLoading,
    setIsAdCreatorOpen,
    addAdvertisement,
    setAdvertisements
} from "@redux/reducers/advertisement-reducer";
import lodash from "lodash";
import { Advertisement } from "../../../models/advertisement";

describe("Testing advertisement reducer", () => {

    const ad: Advertisement = {
        content: "some content",
        id: 12,
        targetDate: new Date(),
    }
    const adsList = lodash.times(109).map(() => ad)

    it("should handle setAdvertisementsLoading", () => {
        const state = advertisementReducer(undefined, setAdvertisementsLoading(true));
        expect(state.loading).toEqual(true);
        const state2 = advertisementReducer(state, setAdvertisementsLoading(false));
        expect(state2.loading).toEqual(false);
    });

    it("should handle addAdvertisement", () => {
        const state = advertisementReducer(undefined, addAdvertisement(ad));
        const state2 = advertisementReducer(state, addAdvertisement(ad));
        expect(state2.advertisements).toEqual([ad, ad]);
    });

    it("should handle setIsAdCreatorOpen", () => {
        const state = advertisementReducer(undefined, setIsAdCreatorOpen(true));
        expect(state.isCreatorOpen).toEqual(true);
        const state2 = advertisementReducer(state, setIsAdCreatorOpen(false));
        expect(state2.isCreatorOpen).toEqual(false);
    });

    it("should handle setAdvertisements", () => {
        const state = advertisementReducer(undefined, setAdvertisements(adsList));
        expect(state.advertisements).toEqual(adsList);
    });
});
