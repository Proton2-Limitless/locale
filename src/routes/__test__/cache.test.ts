import request from "supertest";
import { app } from "../../app";
import { InternalCache } from "../../util/database-cahe";

it("check if cache is working", async () => {
  const cookie = await global.signin();
  await global.seedData();

  // check if cache is working and data is not present
    const cachedData = new InternalCache().get("Abia-state");
    expect(cachedData).toBeNull();

  await request(app)
    .get("/api/region?name=Abia&tag=state")
    .set("Cookie", cookie)
    .send()
    .expect(200);
    // check if cache is working and data is stored
  const cachedData1 = new InternalCache().get("Abia-state");
  expect(cachedData1).toBeDefined();
});
