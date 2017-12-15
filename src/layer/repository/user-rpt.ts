import Repository from "./repository";
import { IUser } from "../interface/model/i-user";

class UserRPT extends Repository {

    constructor() {
       super();
    }

    public async getUser(): Promise<IUser> {
        const user: IUser = {
            id: 1,
            name: "Leandro"
        };
        return user;
    }

}

export default UserRPT;
