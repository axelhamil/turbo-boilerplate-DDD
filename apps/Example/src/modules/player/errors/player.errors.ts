import { DomainError } from "../../../shared/core/domain/Domain.errors";

export class PlayerError extends DomainError {
  private constructor(message?: string, status?: number) {
    super(message, status);
  }
  
  static playerAlreadyHasTeam(): PlayerError {
    return new PlayerError('Player already has a team', 409);
  }
  
  static playerHasNoTeam(): PlayerError {
    return new PlayerError('Player has no team', 409);
  }
  
  static notFound(id: string): PlayerError {
    return new PlayerError(`Player with id ${id} not found`);
  }
  
  static exists(id: string): PlayerError {
    return new PlayerError(`Player with ${id} already exist`, 409);
  }
}
