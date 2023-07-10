import { UserRepository } from "@/repositories/UserRepository";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { UserAlreadyExists } from "./errors/user-already-exist-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExists();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return { user };
  }
}
