const createTodosTable=`
    CREATE TABLE IF NOT EXISTS todos(
        is SERIAL PRIMARY KEY
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255), 
    )
`

export default createTodosTable;