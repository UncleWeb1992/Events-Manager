type ValidationType = "password" | "name";

export function validation(val: string, type: ValidationType): string {
  let error = "";
  switch (type) {
    case "name": {
      if (val.length && val.length < 3) {
        error = "Минимальное колличество символов 3";
      }
      break;
    }
    case "password": {
      if (val.length && val.length < 8) {
        error = "Минимальное колличество символов 8";
      }
      break;
    }
  }
  return error;
}
