import db from "../index.js";
import createTodosTable from "./create-todos-table.js";

const runMigrations = async () => {
    console.log("Migrating the database");

    const client = await db.connect();

    try {
        const { rows } = await client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'todos');");
        const tableExists = rows[0].exists;

        if (!tableExists) {
            await client.query(createTodosTable);
            console.log('Todos table created successfully');
        } else {
            console.log('Todos table already exists, skipping creation');
        }

        console.log('DB migration complete');
    } catch (error) {
        console.log('Failed to migrate DB:', error);
        throw error;
    } finally {
        client.release();
    }
};

export default runMigrations;
