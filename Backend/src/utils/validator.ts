export const isEmail = (mail:string):boolean => {
    try {
        const email:string = mail.trim()
        if (typeof email !== "string") return false;
        if (email.charAt(0) === "." || email.charAt(0) === "_") return false;
        function isValidSymbols(email:string):boolean {
            const regex = /[^a-zA-Z0-9._%+-@]/;
            if (regex.test(email)) {
                return false;
            } else {
                return true;
            }
        }
        function isValiedEmail(email:string):boolean {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const isContain = regex.test(email)
            if (!isContain) {
                return false
            } else {
                return true;
            }
        }
        if (isValidSymbols(email) && isValiedEmail(email)) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}



export const isPhoneNumber = (number:number):boolean => {
    try {
        const arr:string[] = number.toString(10).split('');
        const countOfNumber = (arr:string[]):boolean => {
            let count = 0
            for (let i = 0; i < arr.length; i++) {
                count = 0
                for (let j = 0; j < arr.length; j++) {
                    if (arr[i] === arr[j]) {
                        if (i > j) {
                            break
                        }
                        count++
                    }
                }
                if (count >= 5) return false
            }
            return true
        }

        const startWith = (arr:string[]):boolean => {
            if (parseInt(arr[0]) <= 5) return false
            return true
        }
        const checkLength = (arr:string[]):boolean => {
            if (arr.length != 10) return false
            return true
        }
        const containsOnlyNumbers = (arr:string[]) => {
            for (let i = 0; i < arr.length; i++) {
                if (isNaN(parseInt(arr[i]))) {
                    return false;
                }
            }
            return true;
        }

        if (countOfNumber(arr) && startWith(arr) && checkLength(arr) && containsOnlyNumbers(arr)) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

export function isStrongPassword(password:string):boolean {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])\S{8,}$/;
    return regex.test(password);
}

