import { api } from "encore.dev/api"

export const healthcheck = api<void, Response>(
	{ expose: true, method: "GET", path: "/", tags: ["healthcheck"] },
	async () => {
		return {
			msg: "ok!"
		}
	}
)

interface Response {
	msg: string
}
