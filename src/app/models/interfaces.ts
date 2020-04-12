export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    supporter: boolean;
    password: string;
    personSupporting?: string;
}

export interface SimpleUser {
    firstName: string;
    lastName: string;
    email: string;
}

export interface SimpleResponse {
    success: boolean;
    message: string;
    body?: any;
}
