export function Message<T extends string>(message: T): string {
  return message;
}

export const ErrorMessage = Message("token not found");
export const ErrorMessageFile = Message("Action not valid, File not found");
export const ErrorUserRegister = Message("the user its already registered");
export const ErrorTask = Message("task not found");
