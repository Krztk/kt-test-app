export function isIterable(obj: any) {
  if (obj == null) {
    return false;
  }

  return typeof obj[Symbol.iterator] === "function";
}
