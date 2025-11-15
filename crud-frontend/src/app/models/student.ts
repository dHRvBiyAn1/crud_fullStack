export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface StudentRequest {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

export interface StudentResponse {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
}