import { DomainError } from "../../../shared/core/domain/Domain.errors";

export class TeamError extends DomainError {
  private constructor(message?: string, status?: number) {
    super(message, status);
  }
  
  static isFull(): TeamError {
    return new TeamError(`Team is full`, 409);
  }
  
  static notFound(id: string): TeamError {
    return new TeamError(`Team with id ${id} not found`, 404);
  }
  
  static playerIsNotIsTeam(id: string): TeamError {
    return new TeamError(`Player with id ${id} is not in team`, 404);
  }
  
  static cannotInviteYourself(): TeamError {
    return new TeamError(
      `You cannot invite yourself`,
      409,
    );
  }
  
  static alreadyHasTeam(): TeamError {
    return new TeamError(
      `You already have a team`,
      409,
    );
  }
}
