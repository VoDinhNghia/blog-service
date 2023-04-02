export declare class User {
    id: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): void;
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean;
}
