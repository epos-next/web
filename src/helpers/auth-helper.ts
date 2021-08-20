import Cookies from 'universal-cookie';
import moment from "moment"

export default class AuthHelper {

    static get accessToken() {
        const cookies = new Cookies();
        return cookies.get("accessToken");
    }

    static set tokens(data: TokensBody) {
        const cookies = new Cookies();

        if (typeof window === "undefined") return;

        const optsAccess = {
            path: "/",
            expires: moment(new Date()).add(10, "minutes").toDate(),
            httpOnly: false,
        }

        const optsRefresh = {
            path: "/",
            expires: moment(new Date()).add(1, "year").toDate(),
            httpOnly: false,
        }

        this.destroyTokens()

        cookies.set('accessToken', data.tokens.access, optsAccess);
        cookies.set('refreshToken', data.tokens.refresh, optsRefresh);
        cookies.set('uid', data.id, optsRefresh);
    }

    static get header() {
        if (typeof window === "undefined") return "";
        return `Bearer ${AuthHelper.accessToken}`;
    }

    static get tokensBody() {
        const cookies = new Cookies();

        return {
            refresh: cookies.get("refreshToken") as string,
            id: cookies.get("uid") as string,
        }
    }

    static destroyTokens(): void {
        const cookies = new Cookies();
        cookies.remove("uid");
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
    }

    static get uid(): number {
        const cookies = new Cookies();
        return parseInt(cookies.get("uid") ?? "");
    }
}

export type TokensBody = {
    tokens: {
        access: string;
        refresh: string;
    },
    id: string;
}
