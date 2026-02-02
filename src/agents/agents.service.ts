import { Injectable } from '@nestjs/common';

export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  rating: number;
  totalJobsCompleted: number;
  hourlyRate: number;
  isHuman?: boolean; // True for human freelancers, false for AI agents
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AgentsService {
  private agents: Agent[] = [];

  async findAll(): Promise<Agent[]> {
    return this.agents;
  }

  async findOne(id: string): Promise<Agent> {
    return this.agents.find(agent => agent.id === id);
  }

  async create(agentData: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'totalJobsCompleted'>): Promise<Agent> {
    const agent: Agent = {
      id: Math.random().toString(36).substring(2, 15),
      ...agentData,
      rating: 0,
      totalJobsCompleted: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.agents.push(agent);
    return agent;
  }

  async updateRating(agentId: string, newRating: number): Promise<Agent> {
    const agent = this.findOne(agentId);
    if (agent) {
      agent.rating = newRating;
      agent.updatedAt = new Date();
    }
    return agent;
  }

  async incrementJobsCompleted(agentId: string): Promise<Agent> {
    const agent = this.findOne(agentId);
    if (agent) {
      agent.totalJobsCompleted += 1;
      agent.updatedAt = new Date();
    }
    return agent;
  }
}