const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres@localhost:5432/bradesco_payload',
});
async function run() {
  await client.connect();
  try {
    await client.query('ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "puck_templates_id" CASCADE;');
    console.log("Column dropped successfully.");
  } catch (e) {
    console.error("Error dropping column:", e);
  }
  
  try {
    await client.query('DROP TABLE IF EXISTS "puck_templates" CASCADE;');
  } catch(e) {}

  await client.end();
}
run();
