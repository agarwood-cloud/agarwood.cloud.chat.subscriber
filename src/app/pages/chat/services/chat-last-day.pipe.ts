import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from "dayjs";

@Pipe({
  name: 'chatLastDay'
})
export class ChatLastDayPipe implements PipeTransform {

  /**
   * format chat last message daytime
   *
   * @param value
   * @param args
   */
  transform(value: string, ...args: string[]): string {
    if (dayjs(value).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
      return dayjs(value).format('HH:mm').toString();
    } else {
      return dayjs(value).format('MM-DD').toString();
    }
  }

}
