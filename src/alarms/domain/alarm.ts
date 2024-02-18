import { AlarmSeverity } from './value-objects/alarm-severity';
import { AlarmItem } from './alarm-item';

export class Alarm {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAcknowledged: boolean = false;
  public items: AlarmItem[] = [];

  constructor(public id: string) {}

  acknowledged(): void {
    this.isAcknowledged = true;
  }

  addAlarmItem(item: AlarmItem): void {
    this.items.push(item);
  }
}
