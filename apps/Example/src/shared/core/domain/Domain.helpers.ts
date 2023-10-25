
import { DomainError } from "./Domain.errors";

export type DomainProps = {
  id?: string;
};

export type DomainObject = {
  readonly id: string;
}

export type ValidationResult<T> = {
  isValid: boolean;
  value?: T;
  errors?: string[];
};

type Validator<Props, Domain> = (props: Props) => ValidationResult<Domain>;

export const createDomain = <Props extends DomainProps, Domain extends DomainObject>(
  validate: Validator<Props, Domain>,
  schema: any
) => {
  return (props: Props): Domain => {
    const validationResult = validate(props);
    
    if (!validationResult.isValid)
      throw new DomainError(`Validation failed: ${(validationResult.errors || []).join("\n")}`, 400);
    
    if(!validationResult.value)
      throw new DomainError(`Validation failed: ${JSON.stringify(validationResult)}`, 400);
    
    const objetDeFonction = createDomainValueObject(schema);
    
    return { ...validationResult.value, ...objetDeFonction };
  };
};

export const createDomainWithLogic = <Props, Domain, Actions>(
  createDomainFn: (props: Props) => Domain,
  getActionsFn: (domain: Domain) => Actions,
) => {
  
  return (props: Props): Domain & Actions => {
    const domain = createDomainFn(props);
    const actions = getActionsFn(domain);
    return { ...domain, ...actions };
  };
};

export const createDomainValueObject = (schema: any) => {
  return Object.entries(schema.shape).reduce((acc, [key, value]: [string, any]) => {
    acc = {
      ...acc,
      [`validate${key}`]: (v: unknown)  => {
        return value.parse(v);
      }
    };
    return acc;
  }, {});
};


