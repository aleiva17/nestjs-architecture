import { AlarmRepository } from '../../../../application/ports/alarm.repository';
import { Injectable } from '@nestjs/common';
import { Alarm } from '../../../../domain/alarm';
import { AlarmMapper } from '../mapper/alarm.mapper';
import { AlarmEntity } from '../entities/alarm.entity';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();

  constructor() {}

  async findAll(): Promise<Alarm[]> {
    // Remember that alarm repository handles AlarmEntity, but we need the model (Alarm)
    const entities = Array.from(this.alarms.values());
    return entities.map((entity) => AlarmMapper.toDomain(entity));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }
}
