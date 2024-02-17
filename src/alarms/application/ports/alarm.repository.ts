import { Alarm } from '../../domain/alarm';

// We can use interfaces instead of abstract classes, but
// abstract class serve as injection tokens in NestJS (and interfaces not).
export abstract class AlarmRepository {
  abstract findAll(): Promise<Alarm[]>;
  abstract save(alarm: Alarm): Promise<Alarm>;
}
