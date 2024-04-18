import { z } from "zod";

const nullString = z
  .string()
  .optional()
  .transform((output) => output ?? null);

const addressSchema = z.object({
  streetNumber: nullString,
  streetName: nullString,
  postalCode: nullString,
  municipality: nullString,
  country: z.string(),
  freeformAddress: z.string(),
  countryCode: z.string(),
});

const placeAutocompleteResult = z
  .object({
    id: z.string(),
    address: addressSchema,
  })
  .transform((output) => ({
    placeId: output.id,
    ...output.address,
  }));

export const placeAutocompleteSchema = z
  .object({
    results: z.array(placeAutocompleteResult),
  })
  .transform((output) => output.results);

export type Address = z.infer<typeof addressSchema>;
export type PlaceAutocomplete = z.infer<typeof placeAutocompleteSchema>;
