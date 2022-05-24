const numberBtns = document.querySelectorAll('[data-number]');
const opBtns = document.querySelectorAll('[data-op]');
const equalBtn = document.querySelector('[data-equal]');
const deleteBtn = document.querySelector('[data-del]');
const clearBtn = document.querySelector('[data-all-clear]');
const prevOperandText = document.querySelector('[data-prev-op]');
const currOperandText = document.querySelector('[data-current-op]');
const container = document.querySelector('.container');
const tiltEffectSettings = {
    max: 15,
    perspective: 1000,
};
class Calculator {
    constructor(prevOperandText, currOperandText) {
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.clear();
    }

    clear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.op = undefined;
    }

    //xem lại xem xóa trong calculator thường
    //có đúng xóa từ cuối không
    //đúng rồi :)) ngáo vlin
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNum(number) {
        if (number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOp(op) {
        if (this.currOperand === "") return;
        if (this.prevOperand !== "") {
            this.compute();
        };
        this.op = op;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let result;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.op) {
            case `+`:
                result = prev + curr;
                break;
            case `-`:
                result = prev - curr;
                break;
            case `*`:
                result = prev * curr;
                break;
            case `/`:
                result = prev / curr;
                break;
            default:
                return;
        }
        this.currOperand = result;
        this.op = undefined;
        this.prevOperand = '';
    }

    getDisplayNum(num) {
        const stringNum = num.toString();
        const integerChars = parseFloat(stringNum.split('.')[0]);
        const decimalChars = stringNum.split('.')[1];
        let integerDisplay;
        if (isNaN(integerChars)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerChars.toLocaleString('vn', {
                maximumFractionDigits: 0
            });
        }
        if (decimalChars != null) {
            return `${integerDisplay}.${decimalChars}`;
        } else {
            return integerDisplay;
        }
    }

    update() {
        this.currOperandText.innerText = this.getDisplayNum(this.currOperand);
        if (this.op != null) {
            this.prevOperandText.innerText = `${this.prevOperand} ${this.op}`;
        } else {
            this.prevOperandText.innerText = '';
        }
    }

}

const calculator = new Calculator(prevOperandText, currOperandText);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.update();
    });
});
opBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText);
        calculator.update();
    });
});
equalBtn.addEventListener('click', () => {
    calculator.compute();
    console.log('plus');
    calculator.update();
});
clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
});
deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
});

container.addEventListener('mousemove', calMouseMove);
container.addEventListener('mouseleave', calMouseLeave);

function calMouseMove(e) {
    const calWidth = container.offsetWidth;
    const calHeight = container.offsetHeight;
    const centerX = container.offsetLeft + calWidth / 2;
    const centerY = container.offsetTop + calHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateX = ((+1) * tiltEffectSettings.max * mouseY / (calHeight / 2)).toFixed(2);
    const rotateY = ((-1) * tiltEffectSettings.max * mouseX / (calWidth / 2)).toFixed(2);
    container.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function calMouseLeave(e) {
    container.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg)`;
}
