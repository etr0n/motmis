import db from '../db/db.js'

const create = async ({ sensorId, userId, name, latitude, longitude }) => {
    try {
        const res = await db.query('INSERT INTO subscription (name, latitude, longitude, fk_usersid_users, fk_sensorid_sensor) VALUES($1, $2, $3, $4, $5)',
            [name, latitude, longitude, userId, sensorId])
        return res.rows[0]
    } catch (error) {
        console.log(error);
    }
}
const find = async ({ sensorId, userId }) => {
    try {
        const res = await db.query('SELECT subscription.name, subscription.latitude, subscription.longitude, users.email from subscription INNER JOIN sensor on sensor.id_sensor=subscription.fk_sensorid_sensor INNER JOIN users on users.id_users=sensor.fk_usersid_users WHERE sensor.id_sensor = $1 AND users.id_users = $2',
            [sensorId, userId])
        return res.rows[0]
    } catch (error) {
        console.log(error);
    }
}
const findAll = async ({ createdByUser }) => {
    try {
        const res = await db.query('SELECT sensor.name, subscription.latitude, subscription.longitude, id_subscription from subscription INNER JOIN users on users.id_users=subscription.fk_usersid_users INNER JOIN sensor on sensor.id_sensor=subscription.fk_sensorid_sensor WHERE users.id_users=$1',
            [createdByUser])
        return res.rows
    } catch (error) {
        console.log(error);
    }
}
const countAllSubscriptions = async ({ createdByUser }) => {
    let countSubscriptions;
    try {
        const res = await db.query('SELECT COUNT (id_subscription) from subscription INNER JOIN users on users.id_users=subscription.fk_usersid_users WHERE users.id_users = $1', [createdByUser])
        countSubscriptions = res.rows[0]
        const { count } = countSubscriptions
        return count
    } catch (error) {
        console.log(error);
    }
}
const findOneSUbscription = async (subscriptionId) => {
    try {
        const res = await db.query('SELECT id_subscription, fk_usersid_users FROM subscription WHERE id_subscription = $1', [subscriptionId])
        //console.log('find one res:', res.rows[0]);
        return res.rows[0]
    } catch (error) {
        console.log(error);
    }
}
const remove = async (subscriptionId) => {
    try {
        const res = await db.query('DELETE FROM subscription WHERE id_subscription = $1', [subscriptionId])
        //console.log('rmv res:', res)
        return res

    } catch (error) {
        console.log(error);
    }
}
export {
    create,
    find,
    findAll,
    countAllSubscriptions,
    findOneSUbscription,
    remove,
}