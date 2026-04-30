import { useState, useEffect } from "react"


function AdvancedCounter() {

    // Use useState to manage the current count, history array, and any other necessary local state.
    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem("AdvancedCounterApp");

        if (savedCount === null) {
            return 0;
        }

        return Number(savedCount);
    });


    const [history, setHistory] = useState<number[]>([]);
    const [step, setStep] = useState<number>(1);

    const handleIncrement = () => {
        setCount(count => count + step);
    }

    const handleDecrement = () => {
        setCount(count => count - step);
    }

    const handleReset = () => {
        setCount(0);
    }

    const handleStepInput = (e) => {

        let stepValue = Number(e.target.value);
        // Step can't be less than 1.
        if (stepValue < 1) {
            stepValue = 1;
        }
        setStep(stepValue);
    }




    // Use useEffect for side effects like auto-saving and adding/removing keyboard event listeners.

    // One useEffect per function (as with any typical method--one function)
    // DISPLAY HISTORY
    useEffect(() => {
        // when count changes, add count to history
        console.log("Array, we are counting on you:", count);
        // setHistory(currentArray => [...currentArray, count]);  // prevHistory is confusing when there is no real "previous" history.

        // Counteract React's Strict Mode Development issue: Runs twice
        setHistory(currentArray => {

            // Checks value  before adding it again to prevent duplicates caused by strict mode when page first loads.
            if (currentArray[currentArray.length - 1] === count) {
                return currentArray;
            }

            return [...currentArray, count];
        });
        // console.log(history);
    }, [count]);


    // SAVE IN LOCALSTORAGE
    useEffect(() => {
        console.log("LocalStorage we are counting on you:", count);

        //  Will React's development safe mode try to save this twice?
        localStorage.setItem("AdvancedCounterApp", String(count));

    }, [count]);



    // Pay close attention to the dependency arrays in your useEffect hooks to control when they re-run.


    // Ensure all useEffect hooks that set up subscriptions or event listeners have proper cleanup functions.


    return (
        <div>
            <header> Counter</header>
            <h1>Current Count: {count}</h1>
            <section className="buttons">
                <button onClick={handleDecrement}>Decrement</button>
                <button onClick={handleIncrement}>Increment</button>
                <button onClick={handleReset}>Reset</button>
            </section>

            <section>Step Value: <input type="number" value={step} onChange={handleStepInput} /></section>

            <section id="history">
                <p>Count History:</p>
                <ul className="history-list">
                    {history.map((value, index) => (<li key={index}>{value}</li>))}
                </ul>
            </section>

            <p>Use ArrowUp to increment and ArrowDown to decrement.</p>

        </div>
    );
}


export default AdvancedCounter;
