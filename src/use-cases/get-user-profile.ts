import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUserCaseResponse {
  user: User;
}

interface GetUserProfileUserCaseResponse {}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUserCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
