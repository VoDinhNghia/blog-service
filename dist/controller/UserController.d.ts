import { Request, Response } from 'express';
declare class UserController {
    static listAll: (req: Request, res: Response) => Promise<void>;
    static getOneById: (req: Request, res: Response) => Promise<void>;
    static newUser: (req: Request, res: Response) => Promise<void>;
    static editUser: (req: Request, res: Response) => Promise<void>;
    static deleteUser: (req: Request, res: Response) => Promise<void>;
}
export default UserController;
