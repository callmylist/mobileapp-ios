import Toast from 'react-native-root-toast';

class Utils {
    static validateEmail(email: string) {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
    }
    static validatePhoneNumber(phone: string) {
        return new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(phone);
    }

    static presentToast(message: string) {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            animation: true
        })
    }

    static formatDate(dateString: string) {
        var date = new Date(Date.parse(dateString));
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + (date.getHours() % 12) + ":" + date.getMinutes() + ":" + date.getSeconds() + (date.getHours() > 12 ? 'PM' : 'AM')
    }
}

export default Utils;