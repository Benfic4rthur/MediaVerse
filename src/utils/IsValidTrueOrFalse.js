export function IsValidTrueOrFalse(value) {
  if (value == 'true') return true;

  if (value == 'false') return false;

  if (!value) return false;

  return true;
}
