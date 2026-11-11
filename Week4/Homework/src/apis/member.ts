import { instance } from './instance';
import type { ApiResponse } from '../types/api';
import type { AuthCodeRequest, AuthCodeResponse } from '../types/member';

export const postAuthCode = async (body: AuthCodeRequest) => {
    const response = await instance.post<ApiResponse<AuthCodeResponse>>(
        '/members/authorization-code',
        body,
    );
    return response.data.data;
};