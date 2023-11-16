import bcrypt from "bcrypt";
import * as usersService from "./users.service";
import jwt from "jsonwebtoken";

export const signup = (name: string, email: string, password: string) => {
    const salt = bcrypt.genSaltSync(10);

    const hashPassword = bcrypt.hashSync(password, salt);

    return usersService.create(name, email, hashPassword);
};

export const signin = async (email: string, password: string) => {
    console.log(email, password);
    try {
        const findUser: any = await usersService.findOneByEmail(email);
        const [rows] = findUser;
        if (rows.length === 0) {
            return {
                status: 404,
                message: "User not found",
            };
        } else {
            const hashPassword = rows[0].password;

            const compare = bcrypt.compareSync(password, hashPassword);

            if (!compare) {
                return {
                    status: 404,
                    message: "Password is incorrect",
                };
            } else {
                const access_token = jwt.sign(
                    { data: { id: rows[0].id, email: rows[0].email } },
                    process.env.TOKEN_SECRET as string
                    // { expiresIn: 1200 }
                );
                return {
                    status: 200,
                    info: {
                        name: rows[0].name,
                        access_token,
                        role: rows[0].role,
                        users_id: rows[0].users_id,
                    },
                    message: "Sign in successfully",
                };
            }
        }
    } catch (error) {
        return error;
    }
};
