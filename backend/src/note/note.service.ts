import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async create(title: string, content: string): Promise<Note> {
    const newNote = this.noteRepository.create({ title, content });
    return this.noteRepository.save(newNote);
  }

  async update(id: number, title: string, content: string): Promise<Note> {
    const note = await this.findOne(id);
    note.title = title;
    note.content = content;
    return this.noteRepository.save(note);
  }

  async delete(id: number): Promise<void> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Note not found');
    }
  }
}
