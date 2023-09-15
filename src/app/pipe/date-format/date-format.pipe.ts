import { Pipe, PipeTransform } from '@angular/core';
import { ethers } from 'ethers';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: string | Date, format: string = 'yyyy-MM-dd HH:mm:ss'): string {
        if (!value) return '';
        // Convert the timestamp to a Date object
        const date = new Date(Number(value) * 1000); // Multiply by 1000 to convert to milliseconds

        // Format the date as a readable string
        const formattedDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date
            .getUTCDate()
            .toString()
            .padStart(2, '0')} ${date
            .getUTCHours()
            .toString()
            .padStart(2, '0')}:${date
            .getUTCMinutes()
            .toString()
            .padStart(2, '0')}:${date
            .getUTCSeconds()
            .toString()
            .padStart(2, '0')} UTC`;

        return formattedDate;
    }
}
