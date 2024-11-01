export class Example {

  async onHttpRequest(request: Request) {
    console.log(request)
    await Promise.resolve()

    return new Response("Hello World", { status: 200 })
  }

}
