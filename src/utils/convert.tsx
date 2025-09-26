import * as shamsi from 'shamsi-date-converter';

class Convert {
	static convertDateTimeToInputDateValue(dateTime: string = new Date().toString()): string {
		const date = new Date(dateTime),
			year = date.getFullYear(),
			month = date.getMonth(),
			day = date.getDate();

		const customYear = year,
			customMonth = month.toString().length === 1 ? `0${month + 1}` : month + 1,
			customDay = day.toString().length === 1 ? `0${day}` : day;

		return `${customYear}-${customMonth}-${customDay === '00' ? '01' : customDay}`;
	}
	static convertoLowerCase(value?: string): string {
		if (value != undefined) {
			const st = value.toLowerCase();
			const str = st.charAt(0).toUpperCase();
			return str + st.replaceAll('_', ' ').substring(1);
		}
		return '';
	}
	static convertTimeToTimeSpan(time: string): string {
		if (time != '' && time != undefined && time.length > 0) {
			const [hours, minutes] = time.split(':');
			return `PT${hours}H${minutes}M`;
		} else return '';
	}

	static uppercaseFirstLetterOfText(text: string): string {
		return text
			.toLowerCase()
			.split('')
			.map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
			.join('');
	}

	static convertTimeSpanToTime(timeSpan: string): string {
		// Example
		// PT22H10M -> 22:10
		// PT22H -> 22:00
		//PT52M -> 00:52
		if (timeSpan != null && timeSpan != undefined) {
			const hours = timeSpan.split('H');
			if (hours.length == 1) {
				return '00:' + timeSpan.replace('PT', '').replace('M', '');
			} else {
				const customTimeSpan = timeSpan
					.replace('PT', '')
					.replace('M', '')
					.split('H')
					.filter((i) => i !== '');

				if (!timeSpan.length) return '';

				if (customTimeSpan.length === 1) {
					customTimeSpan.push('00');
				}

				return customTimeSpan.map((item) => (item.length === 1 ? `0${item}` : item)).join(':');
			}
		} else return '';
	}

	static convertMiladitoshamsi(date: string): string {
		if (date !== '' && date !== undefined) return shamsi.gregorianToJalali(date).join('/');
		else return '';
	}
	static convertShamsitomiladi(date: string): any {
		if (date !== '' && date !== undefined) {
			try {
				const dateall = date.split('/');
				const yy = dateall[0].replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (a: string): any {
					return a.charCodeAt(0) & 0xf;
				});
				const mm = dateall[1].replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (a: string): any {
					return a.charCodeAt(0) & 0xf;
				});
				const dd = dateall[2].replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (a: string): any {
					return a.charCodeAt(0) & 0xf;
				});
				return shamsi.jalaliToGregorian(Number(yy), Number(mm) as any, Number(dd) as any).join('/');
			} catch {
				return date;
			}
		} else return '';
	}
	static convertQueryDataToArray(data: any, isFetching: boolean, type: string, option = 'name', value = 'id') {
		if (isFetching) return 'loading';
		if (!Array.isArray(data)) return [];
		return data.map((item) => ({
			option: item[option],
			value: item[value],
		}));
	}
	static separate(Number: string) {
		Number += '';
		Number = Number.replace(',', '');
		const x = Number.split('.');
		let y = x[0];
		const z = x.length > 1 ? '.' + x[1] : '';
		const rgx = /(\d+)(\d{3})/;
		while (rgx.test(y)) y = y.replace(rgx, '$1' + ',' + '$2');
		return y + z;
	}
}

export default Convert;
