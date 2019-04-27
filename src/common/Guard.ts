
import { Result } from "./Result";

export class Guard {
  public static againstNullOrUndefined<T> (argument: T, argumentName: string): Result<T> {
    if (argument === null || argument === undefined) {
      return Result.fail<T>(`${argumentName} is null or undefined`);
    } else {
      return Result.ok<T>(argument);
    }
  }
}