export const successResponse = (
    message: string,
    data: any = null,
    status = 200
  ) => {
    return {
      status,
      body: {
        success: true,
        message,
        data,
      },
    };
  };
  
  export const errorResponse = (
    message: string,
    error: any = null,
    status = 500
  ) => {
    return {
      status,
      body: {
        success: false,
        message,
        error,
      },
    };
  };
  