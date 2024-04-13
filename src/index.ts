import { Elysia, t } from "elysia"
import clipboard from 'clipboardy'
import { generateSecret } from "./secret"
import { generateImage } from "./internal"

const sessionSecret: string = generateSecret() 

const app = new Elysia()
    .all("/", () => "Nothing here!")
    .get("/ping", () => "pong")
    .post("/image", async ({ body, headers, set }) => {
        if (headers.authorization != sessionSecret) {
            set.status = 401
            return "Unauthorized"
        }
        console.log(body)
        console.log(headers)

        const res = await generateImage(body.prompt, body.negativePrompt, body.steps, body.height, body.width)
        const resJson = await res.json()

        console.log(res)

        return resJson
    }, {
        type: "application/json",
        headers: t.Object({
            authorization: t.String()
        }),
        body: t.Object({
            prompt: t.String(),
            negativePrompt: t.String(),
            steps: t.Number(),
            height: t.Number(),
            width: t.Number() 
        })
    })
    .delete('/shutdown', ({ headers, set }) => {
        if (headers.authorization != sessionSecret) {
            set.status = 401
            return "Unauthorized"
        }
        console.log("Exiting server")
        process.exit()
    })
    .listen(727)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}\n🔑 ${sessionSecret}`
)
clipboard.write(sessionSecret)
console.log("Key copied to clipboard")
