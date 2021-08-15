import { navigate } from "gatsby"

export default class AppRouter {
    static goHome = () => navigate(AppRoutes.home);
    static goLogin = () => navigate(AppRoutes.login);
}

export class AppRoutes {
    static readonly home = "/";
    static readonly login = "/login";
}
