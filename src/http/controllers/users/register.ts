import { UserAlreadyExists } from "@/use-cases/errors/user-already-exist-error";
import { makeRegisterCase } from "@/use-cases/factories/make-register-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(201);
}
