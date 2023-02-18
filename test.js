const db = require('./index').DB;

const dbInstance = new db('namedb');

const table = dbInstance.createTable('newTable');
const row1 = dbInstance.insert({id: 1, name: 'foo1'}).into(table);
const row2 = dbInstance.insert({id: 2, name: 'foo2'}).into(table);
const row3 = dbInstance.insert({id: 3, name: 'foo3'}).into(table);
const row4 = dbInstance.insert({id: 4, name: 'foo4'}).into(table);
const query = dbInstance.select('*').from(table).where().orderBy('id', 'desc');

console.log(query.data);

const deleteQuery = dbInstance.deleteRows().from(table);

console.log(deleteQuery);
