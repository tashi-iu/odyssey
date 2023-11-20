export abstract class DtoUtils {
  static toPlainObject(object: object) {
    return JSON.parse(JSON.stringify(object));
  }
}
