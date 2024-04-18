import { getEnv } from "./env";
import { ResponseTypeError } from "./errors";
import { getPlaceAutocomplete } from "./maps-api";
import { Address, PlaceAutocomplete } from "./schema";

export { ResponseTypeError };
export { Address, PlaceAutocomplete };

export async function getAutoCompleteDetails(
  address: string,
): Promise<PlaceAutocomplete> {
  const apiKey = getEnv().TOMTOM_API_KEY;
  const res = await getPlaceAutocomplete(apiKey, address);
  return res;
}
