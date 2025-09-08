import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma, Role } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Throttle({})
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  private readonly logger = new MyLoggerService(EmployeeController.name);

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('')
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.logger.log(
      `Request for All Employees\t${ip}`,
      EmployeeController.name,
    );
    return this.employeeService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
