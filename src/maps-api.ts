import axios from "axios";
import { ResponseTypeError } from "./errors";
import { placeAutocompleteSchema } from "./schema";

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string) {
  const { data, status } = await axios.get(
    `https://api.tomtom.com/search/2/search/${address}.json`,
    {
      params: {
        key,
        limit: 100,
        countrySet: "AU",
      },
      validateStatus: Boolean, // Dont throw on >299, allow schema to validate
    },
  );

  const response = placeAutocompleteSchema.safeParse(data);

  if (!response.success) {
    const { error } = response;
    throw new ResponseTypeError("Invalid TOMTOM API response", {
      error,
      data,
      status,
    });
  }

  return response.data;
}
