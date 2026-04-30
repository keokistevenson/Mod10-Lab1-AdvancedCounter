import { useState, useEffect } from "react"


function AdvancedCounter() {

    // Use useState to manage the current count, history array, and any other necessary local state.
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState<number[]>([0]);

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
        console.log(count);
    }, [count]);

    // Pay close attention to the dependency arrays in your useEffect hooks to control when they re-run.


    // Ensure all useEffect hooks that set up subscriptions or event listeners have proper cleanup functions.


    return (
        <div>
            <p> Counter</p>
            <h1>Current Count: {count}</h1>
            <button onClick={handleDecrement}>Decrement</button>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleReset}>Reset</button>

        </div>
    );
}


export default AdvancedCounter;
