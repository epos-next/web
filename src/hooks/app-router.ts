import { navigate } from "gatsby"

export default class AppRouter {
    static goHome = () => navigate(AppRoutes.home);
    static goLogin = () => navigate(AppRoutes.login);
    static goProfile = () => navigate(AppRoutes.profile);
}

export class AppRoutes {
    static readonly home = "/";
    static readonly login = "/login";
    static readonly profile = "/profile";
}
