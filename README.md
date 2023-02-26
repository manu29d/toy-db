# toy-db

A simple experiment to have a SQL-like db for storing values in memory.
Might be useful for fast prototyping front-end.

### Usage

Just include the `index.js` file to your project. Might be a good idea to rename the file.

Make sure you `import` or `require` properly.

See [`test.js`](./test.js) for more usage information.

```js
// test.js
const db = require('./index').DB;

const dbInstance = new db('namedb');

const table = dbInstance.createTable('newTable');
dbInstance.insert({id: 1, name: 'foo1', gender: 'male'}).into(table);
dbInstance.insert({id: 2, name: 'foo2', gender: 'female'}).into(table);
dbInstance.insert({id: 3, name: 'foo3', gender: 'male'}).into(table);
dbInstance.insert({id: 4, name: 'foo4', gender: 'female'}).into(table);
const query = dbInstance.select('name', 'id').from(table).where({ gender: 'male' }).orderBy('id', 'desc');

console.log(query.data);
// [ { name: 'foo3', id: 3 }, { name: 'foo1', id: 1 } ]

const deleteQuery = dbInstance.deleteRows().from(table).where({ id: 1 });

console.log(deleteQuery);
/* [
 *   { id: 2, name: 'foo2', gender: 'female' },
 *   { id: 3, name: 'foo3', gender: 'male' },
 *   { id: 4, name: 'foo4', gender: 'female' }
 * ]
*/
```
