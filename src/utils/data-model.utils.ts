export abstract class DataModelUtils {
  static success<T>(extras?: T) {
    return {
      success: true,
      ...extras,
    };
  }

  static failure<T extends { message: string }>(extras: T) {
    return {
      success: false,
      ...extras,
    };
  }
}
