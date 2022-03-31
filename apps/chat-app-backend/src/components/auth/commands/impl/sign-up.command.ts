export class SignUpCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly username: string,
  ) {}
}