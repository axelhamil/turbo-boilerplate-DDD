import { randomUUID } from "crypto";

import { isUuid } from "../../utils";
import { ValidationResult } from "./Domain.helpers";

export const generateNewUuid = (id?: string): string => {
  const validateIdResult = validateUniqueIdentifier(id);
  
  return validateIdResult.isValid && !!id ? id : randomUUID();
};

const validateUniqueIdentifier = (id?: string): ValidationResult<string> => {
  if(!id)
    return { isValid: true };
  if(!isUuid(id))
    return { errors: [`Id ${id} is not a valid uuid.`], isValid: false };
  
  return { isValid: true, value: id };
};
