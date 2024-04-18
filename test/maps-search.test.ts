import { describe } from "@jest/globals";
import { config } from "dotenv";
import nock from "nock";
import { getAutoCompleteDetails, ResponseTypeError } from "../src";
import { getEnv } from "../src/env";
import { getPlaceAutocomplete } from "../src/maps-api";

config();

const apiKey = getEnv().TOMTOM_API_KEY;

// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
  describe("getAutoCompleteDetails", () => {
    it("returns a promise", () => {
      const res = getAutoCompleteDetails("Charlotte Street");
      expect(res).toBeInstanceOf(Promise);
    });

    it("can fetch from the autocomplete api", async () => {
      const res = await getAutoCompleteDetails("Charlotte Street");
      const firstRes = res[0];
      expect(firstRes).toHaveProperty("placeId");
      expect(firstRes).toHaveProperty("streetNumber");
      expect(firstRes).toHaveProperty("countryCode");
      expect(firstRes).toHaveProperty("country");
      expect(firstRes).toHaveProperty("freeformAddress");
      expect(firstRes).toHaveProperty("municipality");
    });
  });

  describe("getPlaceAutocomplete", () => {
    it("handles no results", async () => {
      const res = await getPlaceAutocomplete(apiKey, "asfasffasfasafsafs");
      expect(res).toStrictEqual([]);
    });

    it("handles error", async () => {
      expect(getPlaceAutocomplete(apiKey, "")).rejects.toThrow();
    });

    it("returns ResponseTypeError if response is malformed", async () => {
      const searchString = "invalid street";

      const searchParams = new URLSearchParams([
        ["key", apiKey],
        ["limit", "100"],
        ["countrySet", "AU"],
      ]).toString();

      const path = [
        "/search/2/search/",
        encodeURIComponent(searchString),
        ".json?",
        searchParams,
      ].join("");

      const interceptor = nock("https://api.tomtom.com")
        .get(path)
        .reply(200, {});

      const error = await getPlaceAutocomplete(apiKey, searchString).catch(
        (err) => err,
      );

      expect(interceptor.done).toBeTruthy();
      expect(error).toBeDefined();
      expect(error instanceof ResponseTypeError).toBeTruthy();
    });
  });
});
