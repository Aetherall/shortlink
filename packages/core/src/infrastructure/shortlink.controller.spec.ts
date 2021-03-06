import { HttpStatus, INestApplication } from "@nestjs/common";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

import { ShortlinkModule } from "../shortlink.module";

describe("Shortlink", () => {
  let module: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ShortlinkModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should shorten given long link", async () => {
    const long = "https://example.com";
    const { body } = await request(app.getHttpServer())
      .post("/api/shorten")
      .send({ long });

    expect(body).toEqual({
      short: "EAaArVRs5qV39C9S3zO0z9ynVoWeZkuNfeMpsVDQnOk=",
    });
  });

  it("should redirect to the corresponding long link", async () => {
    const { redirect, headers } = await request(app.getHttpServer())
      .get("/EAaArVRs5qV39C9S3zO0z9ynVoWeZkuNfeMpsVDQnOk=")
      .expect(HttpStatus.FOUND);

    expect(headers.location).toEqual("https://example.com");
    expect(redirect).toEqual(true);
  });

  it("should return 404 NOT FOUND if there is no matching link", async () => {
    await request(app.getHttpServer())
      .get("/not-existing")
      .expect(HttpStatus.NOT_FOUND);
  });
});
