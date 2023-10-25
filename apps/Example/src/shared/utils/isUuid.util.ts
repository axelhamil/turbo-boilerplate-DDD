export const isUuid = (id?: string): boolean => {
  if (!id) {
    return false;
  }
  const uuidRegex = new RegExp(
    "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$",
    "i"
  );
  return uuidRegex.test(id);
};
