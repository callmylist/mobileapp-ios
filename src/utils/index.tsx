import Toast from 'react-native-root-toast';

class Utils {
    static validateEmail(email: string) {
        return new RegExp(
            /^['_A-Za-z0-9-\+]+(\.['_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/i,
        ).test(email);
    }
    static validatePhoneNumber(phone: string) {
        return new RegExp(
            '^(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\\s*\\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]\\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?$',
        ).test(phone);
    }

    static presentToast(message: string) {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            animation: true,
        });
    }

    static formatDate(dateString: string) {
        var date = new Date(Date.parse(dateString));
        return (
            date.getMonth() +
            1 +
            '/' +
            date.getDate() +
            '/' +
            date.getFullYear() +
            ' ' +
            (date.getHours() % 12) +
            ':' +
            date.getMinutes() +
            ':' +
            date.getSeconds() +
            (date.getHours() > 12 ? 'PM' : 'AM')
        );
    }

    static convertTime12toString(time: any) {
        if (time.includes('AM') || time.includes('PM')) {
            let components = time.split(' ');
            let value = components[0]
                .split(':')
                .map((digit: any) => Number(digit));

            if (components[1] == 'PM') {
                value[0] += 12;
            }

            return value;
        } else {
            return time.split(':').map((value: any) => Number(value));
        }
    }

    static SetTime(hours: any, minutes: any) {
        if (hours < 10) {
            hours = '0' + hours;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        let time = hours + ':' + minutes;

        return time;
    }
}

export default Utils;
