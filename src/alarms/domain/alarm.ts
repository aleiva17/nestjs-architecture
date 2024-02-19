import { AlarmSeverity } from './value-objects/alarm-severity';
import { AlarmItem } from './alarm-item';
import { VersionedAggregateRoot } from '../../shared/domain/aggregate-root';

export class Alarm extends VersionedAggregateRoot {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAcknowledged: boolean = false;
  public items: AlarmItem[] = [];

  constructor(public id: string) {
    super();
  }

  acknowledged(): void {
    this.isAcknowledged = true;
  }

  addAlarmItem(item: AlarmItem): void {
    this.items.push(item);
  }
}
