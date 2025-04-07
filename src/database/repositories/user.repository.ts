import { eq } from "drizzle-orm"
import { userTable, type CreateUserInput } from "../schemas/user.schema"
import { orm } from "../database"

export const userRepository = {
	async createIfNotExist(data: CreateUserInput) {
		const user = await orm.query.user.findFirst({
			where: eq(userTable.address, data.address)
		})

		if (user) return user

		console.log("user: ", user)

		const [insertedUser] = await orm.insert(userTable).values(data).returning()

		console.log("insertedUser: ", insertedUser)

		return insertedUser
	}
}
