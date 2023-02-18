class DB {
  constructor(name) {
    this.name = name;
    this.tables = ['defaultTable'];
    this.data = {
      defaultTable: [{ column1: 'data1' }]
    };
  }

  #tableExists(table) {
    return this.tables.indexOf(table) > -1;
  }

  #recursiveDeleteRows(selectedRows, key, value) {
    const index = selectedRows.findIndex(row => row[key] === value);
    if (index === -1) return selectedRows;
    selectedRows.splice(index, 1);
    return this.#recursiveDeleteRows(selectedRows, key, value);
  }

  insert(row) {
    return {
      into: (table) => {
        this.data[table].push(row);
        return row;
      }
    }
  };

  select(...columns) {
    return {
      from: (table) => {
        if (!this.#tableExists) throw new Error(`No such table: ${table}`);
        let selectedRows = this.data[table];
        return {
          data: selectedRows,
          where: (conditions = {}) => {

            Object.entries(conditions).forEach(([key, value]) => {
              selectedRows = selectedRows.filter(row => {
                return row[key] === value;
              });
            });

            selectedRows = columns[0] === '*' ? selectedRows : selectedRows.map(row => {
              const selectedRow = {};
              columns.map(column => {
                return selectedRow[column] = row[column];
              });
            });

            return {
              data: selectedRows,
              orderBy: function(column, direction = 'asc') {
                return {
                  data: selectedRows.sort((a, b) => {
                    let sorting = 0; // assume equal by default
                    if (a[column] < b[column]) sorting = -1;
                    if (a[column] > b[column]) sorting = 1;
                    if (direction === 'desc') sorting = sorting * -1;
                    return sorting;
                  })
                }
              }
            }
          }
        }
      }
    };
  }

  createTable(tableName) {
    if (this.#tableExists(tableName)) throw new Error(`Table already exists: ${tableName}`);
    this.tables.push(tableName);
    this.data[tableName] = [];
    return tableName;
  }

  dropTable(tableName) {
    if (!this.#tableExists(table)) throw new Error(`No such table: ${table}`); 
    this.tables.splice(this.tables.indexOf(tableName), 1);
    delete this.data[tableName];
  }

  deleteRows() {
    return {
      from: (table) => {
        if (!this.#tableExists(table)) throw new Error(`No such table: ${table}`); 
        let selectedRows = this.data[table];
        return {
          where: (conditions = {}) => {
            Object.entries(conditions).forEach(([key, value]) => {
              selectedRows = this.#recursiveDeleteRows(selectedRows, key, value);
            });
            return selectedRows;
          }
        }
      }
    }
  }
}

module.exports = {
  DB
}
