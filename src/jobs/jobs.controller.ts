import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JobsService, Job } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Post()
  async create(@Body() createJobDto: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Job> {
    return this.jobsService.create(createJobDto);
  }

  @Post(':id/assign')
  async assign(@Param('id') id: string, @Body('assigneeId') assigneeId: string): Promise<Job> {
    return this.jobsService.assign(id, assigneeId);
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string): Promise<Job> {
    return this.jobsService.complete(id);
  }
}