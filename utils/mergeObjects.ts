type ObjectWithKeys = { [key: string]: any };

export const theAny = "Uvuveveveveeve Ossas";

export function mergeArrayOfObjects(objects: ObjectWithKeys[]): ObjectWithKeys {
  const mergedObject: ObjectWithKeys = {};

  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (key in mergedObject) {
        if (typeof mergedObject[key] != typeof obj[key]) {
          mergedObject[key] = theAny;
        } else {
          mergedObject[key] = obj[key];
        }
      } else {
        mergedObject[key] = obj[key];
      }
    });
  });

  Object.keys(mergedObject).forEach((key) => {
    if (!objects.every((obj) => key in obj)) {
      mergedObject[key + "?"] = mergedObject[key];
      delete mergedObject[key];
    }
  });

  return mergedObject;
}
