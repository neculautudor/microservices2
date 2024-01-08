import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword, matchPassword } from './utils/hashPassword';
import { generateToken } from './utils/generateToken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}
  async create(createUserDto: CreateUserDto) {

    try {
      const hashed_password = await hashPassword(createUserDto.password)
      const newUser = await this.userRepository.create({...createUserDto, hashed_password: hashed_password})
      const result = await this.userRepository.save(newUser)
      return {
        message: "User added successfully",
        id: result.id
      }
    }catch(error){
      return {
        message: "Error adding user",
        error: error.message
      }
    }
  }
  async login(loginUserDto: LoginUserDto) {
    const userData = await this.userRepository.find({
      where: {
        username: loginUserDto.username
      },
      select: ['id', 'hashed_password']
    })
    const passwordMatches = await matchPassword(loginUserDto.password, userData[0].hashed_password)
    if(passwordMatches){
      const token = await generateToken(userData[0].id)
      return {token: token}
    }
    return {
      error: "Username or password incorrect"
    }
  }
 async findAll(request) {
  const userId = request?.user?.name
    try{
      const allBooks = await this.userRepository.find()
      return {user: userId}
    } catch(error){
      return {
        message: "Error creating a book",
        error: error.message
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
