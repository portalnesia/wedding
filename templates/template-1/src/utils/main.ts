import dayjs from 'dayjs'
import utcOffset from 'dayjs/plugin/utc'
import 'dayjs/locale/id'

dayjs.extend(utcOffset);

export function getDayJs(date?: string | number | Date | dayjs.Dayjs,defaultNow=false) {
    let datetime: dayjs.Dayjs;
    let dt = date;
    if(typeof date === 'undefined') return dayjs();
    if(typeof date === 'string') {
        const parse = Number(date);
        if(!Number.isNaN(parse)) {
            if(parse.toString().length === 10 || parse.toString().length === 13) dt = parse;
        }
    }
    if(typeof dt === 'number' && dt.toString().length === 10) {
        datetime = dayjs.unix(dt);
    } else {
        datetime = dayjs(dt);
    }
    if(!datetime.isValid()) {
        if(defaultNow) return dayjs();
        throw new Error('Invalid date');
    }
    return datetime;
}

export function range_format(from: string | number | Date | dayjs.Dayjs,to?: string | number | Date | dayjs.Dayjs) {
    const d1 = getDayJs(from).utcOffset(7)
    const d2 = to ? getDayJs(to).utcOffset(7) : undefined
    const waktu1 = d1.format('HH:mm');
    const waktu2 = d2?.format('HH:mm');

    return waktu2 ? `${waktu1} - ${waktu2} WIB` : `${waktu1} WIB - Selesai`
}

export function date_format(date: string | number | Date | dayjs.Dayjs) {
    const d = getDayJs(date).locale("id").utcOffset(7);
    return d.format("dddd, DD MMMM YYYY")
}