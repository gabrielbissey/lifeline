export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    supporter: boolean;
    password: string;
    verifyPassword: string;
}

export interface SimpleHttpResponse {
    success: boolean;
    message: string;
}
