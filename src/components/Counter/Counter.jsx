import { useSelector, useDispatch } from "react-redux"
import { increment, dencrement, incrementByAmount } from "../../features/counter/CounterSlice"
import { useState } from "react";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const amountChanging = (e) => { setAmount(e.target.value); }

  const save = (e) => {
    e.preventDefault();

    if(amount){
        dispatch(incrementByAmount(Number(amount)));
    }
  }
  
    return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(dencrement())}>-</button>

      <input type="number" onChange={(e) => amountChanging(e)}/>
      <button type="button" onClick={(e) => save(e)}>increment by amount</button>
      </div>
  )
}

export default Counter
