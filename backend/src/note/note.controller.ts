import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.noteService.findOne(id);
  }

  @Post()
  create(@Body() body: { title: string; content: string }) {
    return this.noteService.create(body.title, body.content);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: { title: string; content: string },
  ) {
    return this.noteService.update(id, body.title, body.content);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.noteService.delete(id);
  }
}
