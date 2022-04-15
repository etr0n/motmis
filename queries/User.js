import db from '../db/db.js'

const userCreate = async (name, lastName, email, password, location) => {
    try {
        const res = await db.query('INSERT INTO users(name, last_name, email, password, location) VALUES($1, $2, $3, $4, $5) returning id_users',
            [name, lastName, email, password, location])
        const { id_users } = res.rows[0]
        let id = id_users;
        return { id, name, lastName, email, password, location }
    } catch (error) {
        console.log(error);
    }
}

const userEmailExist = async (email) => {
    try {
        const res = await db.query('SELECT email FROM users where email=$1', [email])
        const rowCount = res.rowCount
        if (rowCount !== 0) {
            return true
        } else
            return false
    } catch (error) {
        console.log(error);
    }
}

const userFind = async (email) => {
    try {
        const res = await db.query('SELECT id_users, name, last_name, email, location, password, created_at, updated_at FROM users where email=$1', [email])
        let rowCount = res.rowCount
        if (rowCount !== 0) {
            const user = res.rows[0]
            const userObject = {
                id: user.id_users,
                name: user.name,
                lastName: user.last_name,
                email: user.email,
                location: user.location,
                createdAt: user.created_at,
                updatedAt: user.updated_at,
                password: user.password
            }
            return { user: userObject, rowCount }
        } else
            return rowCount = 0
    } catch (error) {
        console.log(error);
    }
}

const userFindById = async (id) => {
    try {
        const res = await db.query('SELECT id_users FROM users where id_users=$1', [id])
        return res.rows[0]
    } catch (error) {
        console.log(error);
    }
}

const userUpdate = async (id, name, lastName, location, email) => {
    try {
        await db.query('UPDATE users SET name=($1), last_name=($2), location=($3), email=($4) WHERE id_users=$5', [name, lastName, location, email, id])
        return { id, name, lastName, location, email }
    } catch (error) {
        console.log(error);
    }
}
export { userCreate, userEmailExist, userFind, userFindById, userUpdate }