import db from '../db/db.js'

const create = async ({ name, model, status, latitude, longitude, createdBy }) => {
    try {
        const res = await db.query('INSERT INTO sensor (name, model, status, latitude, longitude, fk_usersid_users) VALUES($1, $2, $3, $4, $5, $6)',
            [name, model, status, latitude, longitude, createdBy])
        return res.rows[0]
    } catch (error) {
        console.log(error);
    }
}

const find = async ({ createdByUser, status, search }) => {
    let res;
    try {
        if (!status && !search) {
            res = await db.query('SELECT id_sensor, sensor.name, model, status, sensor.created_at, users.id_users, latitude, longitude FROM sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE users.id_users = $1', [createdByUser])
            console.log('all');
        }
        if (search) {
            search = "^" + search
            console.log("SEARCH:::::", search);
            res = await db.query("SELECT id_sensor, sensor.name, model, status, sensor.created_at, users.id_users, latitude, longitude FROM sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE users.id_users = $1 AND sensor.name ~* $2", [createdByUser, search])
            console.log(res.rowCount);
        }
        if (status) {
            res = await db.query('SELECT id_sensor, sensor.name, model, status, sensor.created_at, users.id_users, latitude, longitude FROM sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE users.id_users = $1 AND status=$2', [createdByUser, status])
            console.log('status');
        }
        if (status && search) {
            console.log("status and search::::::", search);
            search = "^" + search
            res = await db.query('SELECT id_sensor, sensor.name, model, status, sensor.created_at, users.id_users, longitude, latitude FROM sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE users.id_users = $1 AND status=$2 AND sensor.name ~* $3', [createdByUser, status, search])
            console.log('status and search true');
        }
        return res.rows
    } catch (error) {
        console.log(error);
    }
}

const count = async ({ createdByUser, status, search }) => {
    let res, countSensors;
    try {
        if (!status && !search) {
            res = await db.query('SELECT COUNT (id_sensor) FROM sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE users.id_users=$1', [createdByUser])
            countSensors = res.rows[0]
        }
        if (status) {
            res = await db.query('SELECT COUNT (id_sensor) FROM sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE users.id_users=$1 AND status=$2', [createdByUser, status])
            countSensors = res.rows[0]
        }
        if (search) {
            search = "^" + search
            res = await db.query('SELECT COUNT (id_sensor) FROM sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE users.id_users=$1 AND sensor.name ~* $2', [createdByUser, search])
            countSensors = res.rows[0]
            //console.log(countSensors);
        }
        if (status && search) {
            search = "^" + search
            res = await db.query('SELECT COUNT (id_sensor) FROM sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE users.id_users=$1 AND sensor.name ~* $2 AND status=$3', [createdByUser, search, status])
            countSensors = res.rows[0]
        }
        const { count } = countSensors
        return count
    } catch (error) {
        console.log(error);
    }
}
const findOne = async () => {
    try {
        res = await db.query('SELECT id_sensor, sensor.name, model, status, sensor.created_at, users.id_users, latitude, longitude FROM sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE users.id_users = $1', [createdByUser])
        return res
    } catch (error) {
        console.log(error);
    }
}
export { create, find, count, findOne }
