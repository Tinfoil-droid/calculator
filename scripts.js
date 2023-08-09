const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculatorKeys')
const display = calculator.querySelector('.calculatorDisplay')


keys.addEventListener('click', event => {
    if (!event.target.closest('button')) return; //if a user clicks on the grid gap, it selects the calculatorKeys div, instead of a specific button. This line prevents this.

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const type = key.dataset.type
    const previousKeyType = calculator.dataset.previousKeyType
    
    if (type === 'number') {
        if (displayValue === '0') {
            display.textContent = keyValue
        } else if (previousKeyType === 'operator') 
        {
            display.textContent = keyValue
        } else {
            display.textContent = displayValue + keyValue
        }
    }
    
    if (type === 'operator') {
        console.log(key)   
    }

    if (type === 'equal') {
        //perform a calculation
    }

    calculator.dataset.previousKeyType = type
});