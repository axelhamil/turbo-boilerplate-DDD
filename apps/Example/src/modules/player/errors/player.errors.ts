import { createDomainException, IDomainException } from "../../../shared/core/domain";

export function playerAlreadyHasTeam(): IDomainException {
  return createDomainException('Player already has a team', 409);
}

export function playerHasNoTeam(): IDomainException {
  return createDomainException('Player has no team', 409);
}

export function playerNotFound(id: string): IDomainException {
  return createDomainException(`Player with id ${id} not found`);
}

export function playerExists(id: string): IDomainException {
  return createDomainException(`Player with ${id} already exists`, 409);
}
