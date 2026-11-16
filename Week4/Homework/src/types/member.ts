export type Part = "WEB" | "IOS" | "ANDROID";

export type AuthCodeRequest = {
    part: Part;
};

export type AuthCodeResponse = {
    authorizationCode: string;
};