import moment from 'moment';

export class DateFormatValueConverter {
   toView(value) {
        return moment(value).format('Do MMMM YYYY, h:mm');
   }
}