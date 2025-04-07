import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"

export const whoami = api<void, Response>(
	{
		expose: true,
		method: "GET",
		path: "/users/whoami",
		tags: ["whoami"],
		auth: true
	},
	async () => {
		const claims = getAuthData()!

		return {
			address: claims.address,
			userID: claims.userID
		}
	}
)

interface Response {
	userID: string
	address: string
}
