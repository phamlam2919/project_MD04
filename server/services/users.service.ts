import db from "../utils/db";

export const findAll = () => {
    return db.execute("SELECT * FROM user");
};

export const findOne = (id: string) => {
    return db.execute("SELECT * FROM user WHERE user_id = ?", [id]);
};

export const findOneByEmail = (email: string) => {
    return db.execute("SELECT * FROM user WHERE email = ?", [email]);
};

export const create = (name: string, email: string, password: string) => {
    return db.execute(
        "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    );
};

export const remove = (id: string) => {
    return db.execute("DELETE FROM user WHERE user_id = ?", [id]);
};
