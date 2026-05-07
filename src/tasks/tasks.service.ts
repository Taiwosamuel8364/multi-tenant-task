import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma, User } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Finding a specfic task of a particular User
  async task(id, ownerId): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        id: id,
        authorId: ownerId,
      },
    });
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
  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
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
    return this.prisma.task.updateMany({
      data,
      where: {
        ...where,
        id: id,
        authorId: ownerId,
      },
    });
  }

  // Deleting a task
  async deleteTask(taskId: number, userId: number) {
    return this.prisma.task.deleteMany({
      where: {
        id: taskId,
        authorId: userId,
      },
    });
  }
}
