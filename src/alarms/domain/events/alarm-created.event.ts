import { Alarm } from '../alarm';

export class AlarmCreatedEvent {
  // Instead of passing the instance (alarm), we can pass the alarmId and
  // fetch the alarm from the database on the Event Handler.
  // But, for the Event Sourcing, it's better to handle the alarm instance
  // directly.
  constructor(public readonly alarm: Alarm) {}
}
