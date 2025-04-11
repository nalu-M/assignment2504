// utils/errorHandler.ts
export const handleError = (err: unknown, defaultMessage: string) => {
    if (err instanceof Error) {
      return err.message;
    }
    return defaultMessage;
  };
  