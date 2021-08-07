import AuthHelper from "@helpers/auth-helper";
import CacheService from "@services/cache-service";
import { navigate } from "gatsby-link";

export default function useProfilePage() {
    return {
        handlers: {
            logout: () => {
                // clear cache
                CacheService.clearAll();

                // clear cookies
                AuthHelper.destroyTokens();

                return navigate("/login");
            }
        }
    }
}
