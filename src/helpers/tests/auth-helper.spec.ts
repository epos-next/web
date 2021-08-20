import Cookies from 'universal-cookie';
import AuthHelper, { TokensBody } from "../auth-helper";

beforeEach(() => {
    const cookies = new Cookies()
    cookies.remove("accessToken")
    cookies.remove("refreshToken")
    cookies.remove("uid")
})

it("should get access token", () => {
    const cookies = new Cookies();
    cookies.set("accessToken", "123.123.123")
    expect(AuthHelper.accessToken).toEqual("123.123.123")
});

it("should set new tokens body", () => {
    const cookies = new Cookies()
    cookies.set("accessToken", "trash")
    cookies.set("refreshToken", "trash2")
    cookies.set("uid", "trash3")

    const newData: TokensBody = {
        tokens: {
            access: "123.456.123",
            refresh: "546.123.12312321",
        },
        id: "1231",
    }

    AuthHelper.tokens = newData;

    expect(cookies.get("accessToken")).toEqual(newData.tokens.access)
    expect(cookies.get("refreshToken")).toEqual(newData.tokens.refresh)
    expect(cookies.get("uid")).toEqual(newData.id)
});


it("should get header", () => {
    const cookies = new Cookies()
    cookies.set("accessToken", "91823123.12381.111111")
    expect(AuthHelper.header).toEqual("Bearer 91823123.12381.111111")
});

it("should get tokensBody", () => {
    const cookies = new Cookies()
    cookies.set("uid", "123")
    cookies.set("refreshToken", "19238.5789123.94123")
    expect(AuthHelper.tokensBody).toEqual({
        refresh: "19238.5789123.94123",
        id: "123"
    })
});

it("should destroy tokens", () => {
    const cookies = new Cookies()
    cookies.set("uid", "123")
    cookies.set("accessToken", "231.213.987")
    cookies.set("refreshToken", "987.123.223")
    AuthHelper.destroyTokens()
    expect(cookies.get("uid")).toBeUndefined()
    expect(cookies.get("accessToken")).toBeUndefined()
    expect(cookies.get("refreshToken")).toBeUndefined()
});

it("should get id", () => {
    const cookies = new Cookies()
    cookies.set("uid", "98971232122")
    expect(AuthHelper.uid).toEqual(98971232122)
});

it("should return NaN if no id found", () => {
    expect(AuthHelper.uid).toBeNaN()
});

describe("testing if window === undefined", () => {
    const { window } = global;
    
    beforeAll(() => {
        // @ts-ignore
        delete global.window;
    });
    afterAll(() => {
        global.window = window;
    });

    it("should run set tokens", () => {
        AuthHelper.tokens = {
            tokens: {
                access: '123',
                refresh: '123',
            },
            id: "1"
        }
    });

    it("should run get header", () => {
        const a = AuthHelper.header
    });
})
