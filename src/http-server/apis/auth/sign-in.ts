import { api, APIError } from "encore.dev/api"
import { verifyPersonalMessageSignature } from "@mysten/sui/verify"
import { isValidSuiAddress } from "@mysten/sui/utils"
import jwt from "jsonwebtoken"
import { userRepository } from "~root/database/repositories/user.repository"

export const signIn = api<Request, Response>(
	{ expose: true, method: "POST", path: "/auth/sign-in", tags: ["signIn"] },
	async ({ address, message, signature }) => {
		if (!isValidSuiAddress(address)) {
			throw APIError.failedPrecondition("Invalid address")
		}

		let suiAddress: string

		try {
			const pubkey = await verifyPersonalMessageSignature(
				new TextEncoder().encode(message),
				signature
			)

			suiAddress = pubkey.toSuiAddress()
		} catch (error) {
			throw APIError.unauthenticated("Invalid signature", error as Error)
		}

		const user = await userRepository.createIfNotExist({
			address: suiAddress,
			balance: "01"
		})

		const accessToken = jwt.sign(
			{
				userID: user.id,
				address: user.address
			},
			"secret"
		)

		const renewToken = jwt.sign(
			{
				sub: user.id
			},
			"renew_secret"
		)

		return {
			accessToken,
			renewToken
		}
	}
)

interface Request {
	signature: string
	message: string
	address: string
}

interface Response {
	accessToken: string
	renewToken: string
}
