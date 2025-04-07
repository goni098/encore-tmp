import { describe, expect, test } from "vitest"
import { hello } from "../src/http-server/apis/root/healthcheck"

describe("get", () => {
	test("should combine string with parameter value", async () => {
		const resp = await hello({ name: "world" })
		expect(resp.message).toBe("Hello world!")
	})
})
