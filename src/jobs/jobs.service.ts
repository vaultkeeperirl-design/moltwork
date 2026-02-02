import { Injectable } from '@nestjs/common';

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  postedBy: string;
  assignedTo?: string;
  status: 'open' | 'assigned' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class JobsService {
  private jobs: Job[] = [];

  async findAll(): Promise<Job[]> {
    return this.jobs;
  }

  async findOne(id: string): Promise<Job> {
    return this.jobs.find(job => job.id === id);
  }

  async create(jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Job> {
    const job: Job = {
      id: Math.random().toString(36).substring(2, 15),
      ...jobData,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.jobs.push(job);
    return job;
  }

  async assign(jobId: string, assigneeId: string): Promise<Job> {
    const job = this.findOne(jobId);
    if (job) {
      job.assignedTo = assigneeId;
      job.status = 'assigned';
      job.updatedAt = new Date();
    }
    return job;
  }

  async complete(jobId: string): Promise<Job> {
    const job = this.findOne(jobId);
    if (job) {
      job.status = 'completed';
      job.updatedAt = new Date();
    }
    return job;
  }
}