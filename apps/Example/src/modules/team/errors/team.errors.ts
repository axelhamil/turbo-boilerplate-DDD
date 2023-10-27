import { createDomainException, IDomainException } from "../../../shared/core/domain";

export function teamIsFull(): IDomainException {
  return createDomainException('Team is full', 409);
}

export function teamNotFound(id: string): IDomainException {
  return createDomainException(`Team with id ${id} not found`, 404);
}

export function playerIsNotInTeam(id: string): IDomainException {
  return createDomainException(`Player with id ${id} is not in team`, 404);
}

export function cannotInviteYourself(): IDomainException {
  return createDomainException('You cannot invite yourself', 409);
}

export function alreadyHasTeam(): IDomainException {
  return createDomainException('You already have a team', 409);
}
