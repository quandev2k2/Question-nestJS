export function changeStringToArray(string: string) {
  let numbers:any = string.split(',');
  numbers = numbers.map(Number);
  return numbers;
}