import { AlarmRepository } from '../../../application/ports/alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class InMemoryAlarmPersistenceModule {}
