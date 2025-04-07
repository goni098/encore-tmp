import { uuid, type pgTable, timestamp } from "drizzle-orm/pg-core"

export const baseColumns = {
	id: uuid().primaryKey().notNull().defaultRandom(),
	createdAt: timestamp("created_at", { withTimezone: true, precision: 3 })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		precision: 3
	}).$onUpdate(() => new Date())
}

export type BaseTable = ReturnType<typeof pgTable<string, typeof baseColumns>>
