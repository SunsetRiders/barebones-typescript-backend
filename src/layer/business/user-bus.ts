import Business from "./business";
import { IUser } from "../interface/i-user";

class UserBUS extends Business {

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

export default UserBUS;
