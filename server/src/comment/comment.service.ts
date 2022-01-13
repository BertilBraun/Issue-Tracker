import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private usersRepository: Repository<Comment>,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Comment> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  save(user: Comment): Promise<Comment> {
    return this.usersRepository.save(user);
  }
}
