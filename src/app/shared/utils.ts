export class Utils {
  public static searchFilter(params: any): any {
    params = this.copy(params);
    for (let i in params) {
      if (params.hasOwnProperty(i)) {
        if (Array.isArray(params[i]) && params[i].length === 0) {
          delete params[i];
        } else if (!params[i] && (params[i] !== 0 &&
          typeof params[i] !== typeof true)) {

          delete params[i];
        }
      }
    }

    return params;
  }

  public static copy(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    let temp = obj.constructor();
    for (let key in obj) {
      temp[key] = this.copy(obj[key]);
    }

    return temp;
  }

  public static regexp: any = {
    email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/i,
    username: /^[a-zA-Z]([._](?![._])|[a-zA-Z0-9]){3,13}[a-zA-Z0-9]$/,
    phone: /^\+?[0-9]{7,14}$/,
    fiscalNumber: /^[12347]{1,1}.[0-9]{7,7}$/
  }
}
