require('dotenv').config()
const knex = require('knex')
const ShoppingService = require('./shopping-list-service')


const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

ShoppingService.getAllShopping(knexInstance)
    .then(items => console.log(items))
    .then(() =>
        ShoppingService.insertShopping(knexInstance, {
            name: 'New Name',
            price: '100.00',
            checked: true,
            category: 'Main',
            date_added: new Date(),
        })
    )
    .then(newShopping => {
        console.log(newShopping)
        return ShoppingService.updateShopping(
            knexInstance,
            newShopping.id,
            { name: 'Updated name' }
        ).then(() => ShoppingService.getById(knexInstance, newShopping.id))
    })
    .then(items => {
        console.log(items)
        return ShoppingService.deleteShopping(knexInstance, items.id)
    })
