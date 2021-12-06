const db = require('../db/index')
require('dotenv').config();
// Retrieve all lists owned by a user
const getUserLists = async (req,res) => {
    try{
        const { username } = req.params
        const list = await retrieveListsByUsername(username)
        console.log(list)
        if(!list){
            return res.status(200).send({
                username: username,
                list
            })
        }
        console.log("mylist", list)
        res.status(200).send({
            username: username,
            list
        })
    }catch(err){
        console.log(err)
    }
}
// Retrieve a single list based on its ID
const getListById = async (req,res) => {
    try{
        const { id } = req.params
        const q = 'SELECT lists.*, users.username FROM lists LEFT JOIN users on lists.user_id = users.id WHERE lists.id = $1 LIMIT 1';
        const response = await db.query(q, [id]);
        const list = response.rows[0]
        if(!list) throw "No such list!"
        res.status(200).send(list)
    }catch(err){
        console.log(err)
        res.status(404).send({
            error: err
        })
    }
}

const createList = async (req,res) => {
    const userID = req.user.user_id
    const {inputTitle, inputDescription} = req.body
    console.log(req.body)
    try{
        const q = 'INSERT INTO lists(list_name, user_id, description) values($1,$2,$3) RETURNING *';
        const values = [inputTitle, userID, inputDescription];
        const response2 = await db.query(q, values);
        return res.status(200).send({
            status: "success",
            response: response2.rows
        })
    }catch(err){
        console.log("Create list failed, this is the error message: ", err)
        return null
    }
}

const deleteList = async (req,res) => {
    const userID = req.user.user_id
    const inputID = req.body.inputID
    try{
        const q = 'DELETE FROM lists WHERE id=$1 AND user_id = $2 RETURNING *';
        const values = [inputID, userID];
        const response = await db.query(q, values);
        return res.status(200).send({
            status: "success",
            response: response.rows
        })
    }catch(err){
        console.log("Delete list failed, this is the error message: ", err)
        return res.status(500).send(err)
    }
}

// Unused, remove later
const getAuthenticatedUserLists =  async (req, res) =>{
    console.log(req.user)
    const list = await retrieveListsByUsername(req.user.username)
    console.log(list)
    if(!list){
        return res.status(200).send({
            username: req.user.username,
            list
        })
    }
    console.log("mylist", list)
    res.status(200).send({
        username: req.user.username,
        list
    })
}

module.exports = {
    createList,
    getUserLists,
    getAuthenticatedUserLists,
    deleteList,
    getListById
}

// Helper functions

const retrieveListsByUsername = async (username) => {
    // let q = 'INSERT INTO users(username,password,created_on) VALUES($1,$2,$3) RETURNING *';
    try{
        const q = 'SELECT lists.id, list_name, username FROM lists LEFT JOIN users ON user_id = users.id WHERE username = $1';
        const values = [username];
        const response = await db.query(q, values);
        return response.rows
    }catch(err){
        console.log("retrive list by username failed, this is the error message: ", err)
        return null
    }

}