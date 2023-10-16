export function getLastValueFromArray(arr: string[]) {
  if (arr.length === 0) {
    return null;
  }

  return arr[arr.length - 1];
}
