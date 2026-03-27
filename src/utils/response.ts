export function successResponse(data: any = [], meta: any = {}) {
  return {
    data,
    meta,
    erros: []
  };
}

export function errorResponse(errors: string[] | string, statusCode = 400, data: any = []) {
  return {
    data: data,
    meta: {},
    erros: Array.isArray(errors) ? errors : [errors]
  };
}

