import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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

  // Create task
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

  // Get a particular task
  @UseGuards(jwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getTask(@Request() req, @Param('id') taskId: string) {
    const user = req.user;
    return this.taskService.task(Number(taskId), user.id);
  }

  // Update a task
  @UseGuards(jwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateTask(
    @Request() req,
    @Body() createTaskDto: CreateTaskDto,
    @Param('id') taskId: string,
  ) {
    const user = req.user;
    const data = {
      title: createTaskDto.title ?? '',
      content: createTaskDto.content ?? '',
    };
    return this.taskService.updateTask(
      { where: { id: Number(taskId) }, data: data },
      Number(taskId),
      user.id,
    );
  }

  // Delete a task
  @UseGuards(jwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteTask(@Request() req, @Param('id') taskId: string) {
    const user = req.user;
    return this.taskService.deleteTask(Number(taskId), user.id);
  }
}
