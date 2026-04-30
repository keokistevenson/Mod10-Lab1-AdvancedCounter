import { useState, useEffect } from "react"


function AdvancedCounter() {

    // Use useState to manage the current count, history array, and any other necessary local state.
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState<number[]>([]);

    const handleIncrement = () => {
        setCount(count => count + 1);
    }

    const handleDecrement = () => {
        setCount(count => count - 1);
    }

    const handleReset = () => {
        setCount(0);
    }




    // Use useEffect for side effects like auto-saving and adding/removing keyboard event listeners.

    useEffect(() => {
        // when count changes, add count to history
        console.log("This is my count:", count);
        // setHistory(currentArray => [...currentArray, count]);  // prevHistory is confusing when there is no real "previous" history.

        // Counteract React's Strict Mode Development issue: Runs twice
        setHistory(currentArray => {

            // Checks value  before adding it again to prevent duplicates caused by strict mode when page first loads.
            if (currentArray[currentArray.length - 1] === count) {
                return currentArray;
            }

            return [...currentArray, count];
        });


        console.log(history);
    }, [count]);

    // Pay close attention to the dependency arrays in your useEffect hooks to control when they re-run.


    // Ensure all useEffect hooks that set up subscriptions or event listeners have proper cleanup functions.


    return (
        <div>
            <header> Counter</header>
            <h1>Current Count: {count}</h1>
            <button onClick={handleDecrement}>Decrement</button>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleReset}>Reset</button>

            <p><strong>Count History:</strong></p>
            <ul className="history-list">
                {history.map((value, index) => (<li key={index}>{value}</li>))}
            </ul>

            <p>Use ArrowUp to increment and ArrowDown to decrement.</p>

        </div>
    );
}


export default AdvancedCounter;
