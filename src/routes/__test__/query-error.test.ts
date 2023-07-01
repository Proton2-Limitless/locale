import request from "supertest";
import { app } from "../../app";

it("responds with error if query is not provided", async () => {
  const cookie = await global.signin();
  await request(app)
    .get("/api/region")
    .set("Cookie", cookie)
    .send()
    .expect(400);
});

it("responds with error if item not found", async () => {
  const cookie = await global.signin();
  await request(app)
    .get("/api/region?name=notfound&tag=region")
    .set("Cookie", cookie)
    .send()
    .expect(404);

  await request(app)
    .get("/api/region?name=notfound&tag=state")
    .set("Cookie", cookie)
    .send()
    .expect(404);

  await request(app)
    .get("/api/region?name=notfound&tag=lg")
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
