export interface IDomainException {
  statusCode: number;
  message: string[];
  error: string;
}

export function createDomainException(
  message: string = 'Domain Error',
  status: number = 406
): IDomainException {
  return {
    error: 'Domain Error',
    message: [message],
    statusCode: status,
  };
}
