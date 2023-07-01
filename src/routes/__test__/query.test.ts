import request from "supertest";
import { app } from "../../app";

it("returns satte if query is valid", async () => {
  await global.seedData();
  const cookie = await global.signin();
  const response = await request(app)
    .get("/api/region?name=Abia&tag=state")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.data.length).toEqual(1);
  expect(response.body.data[0].name).toEqual("Abia");

  const response2 = await request(app)
    .get("/api/region?name=Zurmi&tag=lg")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response2.body.data.length).toEqual(1);
  expect(response2.body.data[0].name).toEqual("Zurmi");

  const response3 = await request(app)
    .get("/api/region?name=North East&tag=region")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response3.body.data.length).toEqual(6);
  expect(response3.body.data[0].region).toEqual("North East");
});
