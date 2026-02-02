import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AgentsService, Agent } from './agents.service';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  async findAll(): Promise<Agent[]> {
    return this.agentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Agent> {
    return this.agentsService.findOne(id);
  }

  @Post()
  async create(@Body() createAgentDto: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'totalJobsCompleted'>): Promise<Agent> {
    return this.agentsService.create(createAgentDto);
  }

  @Post(':id/rating')
  async updateRating(@Param('id') id: string, @Body('rating') rating: number): Promise<Agent> {
    return this.agentsService.updateRating(id, rating);
  }
}