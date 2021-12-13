import EnvHelper from "@helpers/env-helper";

export default class ApiRoutes {

    private static _baseRoute = EnvHelper.serverUrl;
    private static _apiVersion = "1.0";
    private static buildRoute = (route: string) => `${ ApiRoutes._baseRoute }/api/${ ApiRoutes._apiVersion }${ route }`;

    static authenticate = ApiRoutes.buildRoute("/auth/authenticate");
    static updateToken = ApiRoutes.buildRoute("/auth/reauthenticate");
    static fetchData = ApiRoutes.buildRoute("/data");
    static fetchLessons = (from: Date, to: Date) => ApiRoutes.buildRoute(
        `/data/lessons?from=${ from.toISOString() }&to=${ to.toISOString() }`
    );
    static createControlWork = ApiRoutes.buildRoute("/control-work")
    static createAd = ApiRoutes.buildRoute("/advertisement")

    static setHomeworkStatus = (id: number, status: boolean) => ApiRoutes.buildRoute(
        `/homework/${ id }/${ status ? "complete" : "cancel-complete" }`
    )
}
