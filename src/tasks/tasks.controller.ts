import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { jwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/tasks-dto.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(jwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create')
  createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    const user = req.user;
    const data = {
      title: createTaskDto.title,
      content: createTaskDto.content ?? '',
    };
    return this.taskService.createTask(data, user.id);
  }
}
