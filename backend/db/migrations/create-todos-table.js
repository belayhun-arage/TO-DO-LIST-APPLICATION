const createTodosTable=`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE todos (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE
    );
`

export default createTodosTable;