import { useState, useEffect } from "react"


function AdvancedCounter() {

    // Use useState to manage the current count, history array, and any other necessary local state.
    const [history, setHistory] = useState<number[]>([]);
    const [step, setStep] = useState<number>(1);
    const [saveStatus, setSaveStatus] = useState<string>("");

    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem("AdvancedCounterApp");

        if (savedCount === null) {
            return 0;
        }

        return Number(savedCount);
    });


    const handleIncrement = () => {
        console.log("increment");
        setCount(count => count + step);
    }

    const handleDecrement = () => {
        console.log("decrement");
        setCount(count => count - step);
    }


    const handleReset = () => {
        // Reset everything
        setCount(0);
        setHistory([0]);
        setStep(1);

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

        setSaveStatus("Saving to Local Storage ...");
        //  Will React's development safe mode try to save this twice?
        const timerId = setTimeout(() => {
            localStorage.setItem("AdvancedCounterApp", String(count));
            setSaveStatus("Changes saved.");
        }, 1000);

        return () => clearTimeout(timerId);
    }, [count]);


    // Add Event Listener
    useEffect(() => {
        console.log("Add Listener for Key Press Added Only Once");

        const handleKeyPress = (e: KeyboardEvent) => {
            // console.log("First: ", e.key);

            // Check to see if Key Press is Arrow UP or Arrow DOWN
            if (e.key === "ArrowUp") {
                //console.log(e.key);
                handleIncrement();
            }

            if (e.key === "ArrowDown") {
                handleDecrement();
            }
        };


        // Any key down
        document.addEventListener("keydown", handleKeyPress);

        // Clean Up!
        return () => document.removeEventListener("keydown", handleKeyPress);;
    }, [step]);


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
            <section><p aria-live="polite">{saveStatus}</p></section>

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
