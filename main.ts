import * as Dotenv from "https://deno.land/std@0.217.0/dotenv/mod.ts";
import { Example } from "./mods/example/mod.ts";

const envPath = new URL(import.meta.resolve("./.env.local")).pathname

const {
  PORT = Deno.env.get("PORT") || "8080",
  CERT = Deno.env.get("CERT"),
  KEY = Deno.env.get("KEY"),
} = await Dotenv.load({ envPath, examplePath: null })

const port = Number(PORT)

const cert = CERT != null ? Deno.readTextFileSync(CERT) : undefined
const key = KEY != null ? Deno.readTextFileSync(KEY) : undefined

/**
 * Example module
 */
const example = new Example()

/**
 * Router
 */
const onHttpRequest = async (request: Request) => {
  if (request.headers.get("host")?.startsWith("example."))
    return await example.onHttpRequest(request)

  const url = new URL(request.url)

  if (url.pathname === "/example")
    return await example.onHttpRequest(request)

  return new Response("Not Found", { status: 404 })
}

Deno.serve({ hostname: "0.0.0.0", port, cert, key }, onHttpRequest)