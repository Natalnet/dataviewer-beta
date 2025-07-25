import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { TokenService } from 'src/modules/auth/token.service';
import { BcryptService } from 'src/modules/auth/bcrypt.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from 'src/modules/auth/dto/sign-up.dto';
import { AuthResponseDto } from 'src/modules/auth/dto/auth-response.dto';
import { Role } from 'src/modules/users/enums/role.enum';
import { MailService } from 'src/modules/mail/mail.service';

describe('AuthService (unit)', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let tokenService: jest.Mocked<TokenService>;
  let bcryptService: jest.Mocked<BcryptService>;

  const mockUsersService = {
    findOneByEmail: jest.fn(),
    findOneByRegistrationNumber: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  };

  const mockTokenService = {
    generateTokens: jest.fn(),
    saveRefreshToken: jest.fn(),
    validateRefreshToken: jest.fn(),
    revokeToken: jest.fn(),
  };

  const mockBcryptService = {
    hashPassword: jest.fn(),
    comparePasswords: jest.fn(),
  };

  const mockMailService = {
    sendConfirmationEmail: jest.fn(),
    sendWelcomeEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
        {
          provide: BcryptService,
          useValue: mockBcryptService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService) as jest.Mocked<UsersService>;
    tokenService = module.get(TokenService) as jest.Mocked<TokenService>;
    bcryptService = module.get(BcryptService) as jest.Mocked<BcryptService>;

    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return a user if email and password are valid', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'John Doe',
        emailConfirmed: false,
        role: Role.STUDENT,
        avatar: null,
        registrationNumber: '123456',
        confirmationToken: null,
      };

      usersService.findOneByEmail.mockResolvedValue(mockUser);
      bcryptService.comparePasswords.mockResolvedValue(true);

      const result = await authService.validateUser('test@example.com', 'password');

      expect(usersService.findOneByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcryptService.comparePasswords).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(result).toEqual(expect.objectContaining({ email: 'test@example.com' }));
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      usersService.findOneByEmail.mockResolvedValue(null);

      await expect(authService.validateUser('test@example.com', 'password')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'John Doe',
        emailConfirmed: false,
        role: Role.STUDENT,
        avatar: null,
        registrationNumber: null,
        confirmationToken: null,
      };

      usersService.findOneByEmail.mockResolvedValue(mockUser);
      bcryptService.comparePasswords.mockResolvedValue(false);

      await expect(authService.validateUser('test@example.com', 'password')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('signUp', () => {
    it('should create a new user and return UserResponseDto', async () => {
      const mockSignUpDto: SignUpDto = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password',
        passwordConfirmation: 'password',
        registrationNumber: '123456',
      };

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'John Doe',
      };

      usersService.findOneByEmail.mockResolvedValue(null);
      usersService.findOneByRegistrationNumber.mockResolvedValue(null);
      bcryptService.hashPassword.mockResolvedValue('hashedPassword');
      usersService.create.mockResolvedValue(mockUser);

      const result = await authService.signUp(mockSignUpDto);

      expect(usersService.findOneByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.findOneByRegistrationNumber).toHaveBeenCalledWith('123456');
      expect(bcryptService.hashPassword).toHaveBeenCalledWith('password');
      expect(usersService.create).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'hashedPassword',
        registrationNumber: '123456',
        emailConfirmed: false,
        confirmationToken: expect.any(String),
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if email is already registered', async () => {
      const mockSignUpDto: SignUpDto = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password',
        passwordConfirmation: 'password',
        registrationNumber: '123456',
      };

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: '1234567',
        name: 'John Doe',
        emailConfirmed: false,
        role: Role.STUDENT,
        avatar: null,
        registrationNumber: '123456',
        confirmationToken: null,
      };

      usersService.findOneByEmail.mockResolvedValue(mockUser);

      await expect(authService.signUp(mockSignUpDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('signIn', () => {
    it('should generate tokens and save refresh token', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'John Doe',
      };

      const mockTokens: AuthResponseDto = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      tokenService.generateTokens.mockReturnValue(mockTokens);
      tokenService.saveRefreshToken.mockResolvedValue();

      const result = await authService.signIn(mockUser);

      expect(tokenService.generateTokens).toHaveBeenCalledWith(mockUser);
      expect(tokenService.saveRefreshToken).toHaveBeenCalledWith('1', 'refreshToken');
      expect(result).toEqual(mockTokens);
    });
  });

  describe('signOut', () => {
    it('should validate and revoke the refresh token', async () => {
      const mockToken = {
        id: '1',
        userId: '1',
        token: 'hashedRefreshToken',
        revoked: false,
        save: jest.fn(),
      } as any;
  
      tokenService.validateRefreshToken.mockResolvedValue(mockToken);
      tokenService.revokeToken.mockResolvedValue();
  
      await authService.signOut('validRefreshToken');
  
      expect(tokenService.validateRefreshToken).toHaveBeenCalledWith('validRefreshToken');
      expect(tokenService.revokeToken).toHaveBeenCalledWith(mockToken);
    });
  });
});
