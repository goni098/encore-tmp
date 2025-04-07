import { type Header, Gateway, APIError } from "encore.dev/api"
import { authHandler } from "encore.dev/auth"
import jwt from "jsonwebtoken"

interface AuthParams {
	authorization: Header<"Authorization">
}

interface Claims {
	userID: string
	address: string
}

export const bearerAuth = authHandler<AuthParams, Claims>(
	async (params): Promise<Claims> => {
		const token = params.authorization.split("Bearer ")[1]

		if (!token) throw APIError.unauthenticated("Missing bearer token")

		return new Promise<Claims>(resolve =>
			jwt.verify(token, "secret", (error, payload) => {
				if (error) {
					throw APIError.unauthenticated("Invalid token")
				}

				resolve(payload as Claims)
			})
		)
	}
)

export const gateway = new Gateway({
	authHandler: bearerAuth
})
