const serviceTypes = {
  USER_SVC_CLIENT: 'USER_SVC_CLIENT',
  TEST_SVC_CLIENT: 'TEST_SVC_CLIENT',
  POST_SVC_CLIENT: 'POST_SVC_CLIENT',
};

export const TYPES = {
  ...serviceTypes,
};

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export type JSONArray = string[] | number[] | boolean[];
