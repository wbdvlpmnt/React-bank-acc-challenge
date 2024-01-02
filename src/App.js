import "./styles.css";
import { useReducer } from "react";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state

Add'l notes:
- only action to open account
- on open credit 500 
- all different actions
- One active loan at a time
- close account no loan and balance is 0
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (state.isActive === false && action.type !== "openAccount") {
    return { ...state };
  }
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: 500, isActive: true, isLoanRequested: false };
    case "deposit":
      return { ...state, balance: state.balance + 150 };
    case "withdraw":
      if (state.balance > 0) {
        return { ...state, balance: state.balance - 50 };
      }
      return { ...state };
    case "requestLoan":
      if (!state.isLoanRequested) {
        return {
          ...state,
          balance: state.balance + 5000,
          isLoanRequested: true,
        };
      }
      return { ...state };
    case "payLoan":
      if (state.isLoanRequested) {
        return {
          ...state,
          balance: state.balance - 5000,
          isLoanRequested: false,
        };
      }
      return { ...state };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [{ balance, loan, isActive, isLoanRequested }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function handleOpenAccount() {
    console.log("open account");
    dispatch({ type: "openAccount" });
  }

  function handleDeposit() {
    console.log("deposit");
    dispatch({ type: "deposit" });
  }

  function handleWithdraw() {
    console.log("withdraw");
    dispatch({ type: "withdraw" });
  }

  function handleRequestLoan() {
    console.log("requestLoan");
    dispatch({ type: "requestLoan" });
  }

  function handlePayLoan() {
    console.log("requestLoan");
    dispatch({ type: "payLoan" });
  }

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={handleOpenAccount} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={handleDeposit} disabled={!isActive || !isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={handleWithdraw} disabled={balance === 0 || !isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={handleRequestLoan}
          disabled={isLoanRequested || !isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={handlePayLoan}
          disabled={!isLoanRequested || !isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
