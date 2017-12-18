import Repository from "./repository";
import UserMDL from "../model/user";

class UserRPT extends Repository {

    constructor() {
       super();
    }

    public async getUser(): Promise<UserMDL> {
        const user = new UserMDL();
        user.id = 1;
        user.name = "Leandro";
        return user;
    }

}

export default UserRPT;
