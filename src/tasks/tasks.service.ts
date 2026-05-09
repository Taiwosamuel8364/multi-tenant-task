import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Finding a specfic task of a particular User
  async task(id, ownerId): Promise<Task | null> {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
        authorId: ownerId,
      },
    });

    if (!task) {
      throw new NotFoundException(`The task with id: ${id} does not exist`);
    }

    return task;
  }

  // Getting all the task of a particular user
  async tasks(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.TaskWhereUniqueInput;
      where?: Prisma.TaskWhereInput;
      orderBy?: Prisma.TaskOrderByWithRelationInput;
    },
    userId,
  ): Promise<Task[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        authorId: userId,
      },
      orderBy,
    });
  }

  //Creating a Task
  async createTask(
    data: Prisma.TaskCreateWithoutAuthorInput,
    userId: number,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...data,
        author: {
          connect: { id: userId },
        },
      },
    });
  }

  //Updating a particular task
  async updateTask(
    params: {
      where: Prisma.TaskWhereUniqueInput;
      data: Prisma.TaskUpdateInput;
    },
    id,
    ownerId,
  ) {
    const { where, data } = params;
    const task = this.prisma.task.updateMany({
      data,
      where: {
        ...where,
        id: id,
        authorId: ownerId,
      },
    });

    if (!task) {
      throw new NotFoundException(`The task with id: ${id} does not exist`);
    }

    return {
      message: 'Task updated successfully',
      id: id,
    };
  }

  // Deleting a task
  async deleteTask(taskId: number, userId: number) {
    const task = this.prisma.task.deleteMany({
      where: {
        id: taskId,
        authorId: userId,
      },
    });

    if (!task) {
      throw new NotFoundException(`The task with id: ${taskId} does not exist`);
    }

    return {
      message: 'Task deleted successfully',
      id: taskId,
    };
  }
}
