import { DomainError } from "./Domain.errors";
import { ValidationResult } from "./Domain.helpers";

export function toPureDomain<DTO, Domain>(
  domainWithActions: DTO,
  validator: (props: DTO) => ValidationResult<Domain>
): Domain {
  const validationResult = validator(domainWithActions);
  
  if (!validationResult.isValid)
    throw new DomainError(`Validation failed: ${(validationResult.errors || []).join("\n")}`, 400);
  
  if(!validationResult.value)
    throw new DomainError(`Validation failed: ${JSON.stringify(validationResult)}`, 400);
  
  const pureDomain: Partial<Domain> = {};
  for (const key in validationResult.value) {
    if (Object.prototype.hasOwnProperty.call(validationResult.value, key) &&
      typeof validationResult.value[key] !== 'function') {
      pureDomain[key as keyof Domain] = validationResult.value[key as keyof Domain];
    }
  }
  
  return pureDomain as Domain;
}
