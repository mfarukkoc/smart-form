export const startsWithCapital = (value: any, message: string) => {
  return /^[\p{Lu}].*/u.test(value) ? true : message;
};

export const containsCharacters = (value: any, message: string) => {
  return /^[\p{L}'\-\s]+$/u.test(value) ? true : message;
};
