const db = require('./index').DB;

const dbInstance = new db('namedb');

const table = dbInstance.createTable('newTable');
dbInstance.insert({id: 1, name: 'foo1', gender: 'male'}).into(table);
dbInstance.insert({id: 2, name: 'foo2', gender: 'female'}).into(table);
dbInstance.insert({id: 3, name: 'foo3', gender: 'male'}).into(table);
dbInstance.insert({id: 4, name: 'foo4', gender: 'female'}).into(table);
const query = dbInstance.select('name', 'id').from(table).where({ gender: 'male' }).orderBy('id', 'desc');

console.log(query.data);

const deleteQuery = dbInstance.deleteRows().from(table).where({ id: 1 });

console.log(deleteQuery);
