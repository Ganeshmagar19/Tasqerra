# Tasqerra

# npm init -y
## npm i express 
### npm i -d typescript  ts-node  @types/node @types/express 
#### npx tsc --init
#####  npm run dev
For Prisma 
# npm i -d prisma 
- install prisma 
## npx prisma init 
- create prisma.schema and .env file for db url 
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
Here's a short explanation of each component:
USER: The name of your database user
PASSWORD: The password for your database user
HOST: The name of your host name (for the local environment, it is localhost)
PORT: The port where your database server is running (typically 5432 for PostgreSQL)
DATABASE: The name of the database
SCHEMA: The name of the schema inside the database
### npx prisma migrate dev --name init 
- migrate the changes in prisma schema to the postgres schema 
### optional (prisma db pull)
| `npx prisma db pull`                 | Updates Prisma schema from an existing database  |
| `npx prisma generate`                | Regenerates Prisma  Client                                             |
| `npx prisma studio`                  | Opens a GUI to view/edit data in the browser                          
#### pgsql Additional useful keywords 
*Feature*	*Use for*
connect	Link to an existing record (foreign key)
include	Fetch related records
select	Limit fields returned
upsert	Create or update based on existence
where	Filtering conditions
data	Fields to create or update