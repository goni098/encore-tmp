// database.ts
import { SQLDatabase } from "encore.dev/storage/sqldb"
import { drizzle } from "drizzle-orm/node-postgres"
import { userTable } from "./schemas/user.schema"
import { eventTable } from "./schemas/event.schema"
import { settingTable } from "./schemas/setting.schema"
import { renewTokenTable } from "./schemas/renew-token.schema"

export const database = new SQLDatabase("encore-tmp", {
	migrations: {
		path: "./migration",
		source: "drizzle"
	}
})

export const orm = drizzle({
	schema: {
		user: userTable,
		event: eventTable,
		setting: settingTable,
		renewToken: renewTokenTable
	},
	connection: {
		connectionString: database.connectionString
	}
})

export type Orm = typeof orm
