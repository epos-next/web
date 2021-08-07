import CacheService from "@services/cache-service";
import ApiService, { BigDataObject } from "@services/api-service";

/**
 * @throws forbidden
 * @throws not-found
 * @throws server-error
 */
export const getData = async (
    onSuccess: (data: BigDataObject) => any,
    onError: (error: any) => any,
): Promise<BigDataObject> => {
    const cached = CacheService.bigDataObject;
    if (cached !== null) {
        ApiService.getData()
            .then(data => {
                CacheService.bigDataObject = data;
                onSuccess(data);
            })
            .catch(onError)
        return onSuccess(cached);
    }
    const data = await ApiService.getData().catch(onError);
    CacheService.bigDataObject = data;
    return onSuccess(data);
}
