import React, { useEffect, useRef} from "react";
import "./Expenses.css";
import ExpenseItem from "../components/ExpenseItem";
import { addingExpense } from "../store/ExpenseAction";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../store/Expense";

const Expenses = () => {
  
  const dispatch = useDispatch();
  const inputAmountRef = useRef();
  const inputDescRef = useRef();
  const inputCategoryRef = useRef();

  // const firstTime = useSelector((state) => state.expense.firstTime);
  const expenses = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalAmount);

  const deleteExpenseHandler = async (item) => {
    const updatedTotalAmount = Number(totalAmount) - Number(item.amount);
    const updatedExpenses = expenses.filter((expense) => {
      return expense.id !== item.id;
    });
    console.log("afterdeleted", updatedExpenses);
    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpenses,
        totalAmount: updatedTotalAmount,
      })
    );
    console.log(updatedTotalAmount);
  };

  const editExpenseHandler = (item) => {
    inputAmountRef.current.value = item.amount;
    inputDescRef.current.value = item.description;
    inputCategoryRef.current.value = item.category;
    const updatedTotalAmount = totalAmount - Number(item.amount);
    const updatedExpenses = expenses.filter((expense) => {
      return expense.id !== item.id;
    });

    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpenses,
        totalAmount: updatedTotalAmount,
      })
    );
    console.log(updatedTotalAmount);
  };

  const addExpenseHandler = async (event) => {
    event.preventDefault();
    const obj = {
      amount: inputAmountRef.current.value,
      description: inputDescRef.current.value,
      category: inputCategoryRef.current.value,
    };

    await dispatch(addingExpense(obj));

    inputAmountRef.current.value = "";
    inputDescRef.current.value = "";
    inputCategoryRef.current.value = "";

    // try {
    //   const res = await fetch(
    //     `https://expense-tracker-760b4-default-rtdb.firebaseio.com/expense-tracker.json`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(obj),
    //     }
    //   );

    //   const data = await res.json();

    //   if (res.ok) {
    //     alert("Expense added Successfully");
    //     inputAmountRef.current.value = "";
    //     inputDescRef.current.value = "";
    //     inputCategoryRef.current.value = "";
    //     await fetchExpenses();
    //   } else {
    //     throw data.error;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await fetch(
          `https://expense-tracker-760b4-default-rtdb.firebaseio.com/expense-tracker.json`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          let updatedtotalAmount = 0;
          const newdata = [];
          for (let key in data) {
            newdata.push({ id: key, ...data[key] });
            updatedtotalAmount += Number(data[key].amount);
          }
          dispatch(
            expenseAction.replaceExpenses({
              expenses: newdata,
              totalAmount: updatedtotalAmount,
            })
          );
        } else {
          throw data.error;
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchExpenses();
  }, [dispatch, addExpenseHandler]);

  return (
    <div>
      <div>
        <form onSubmit={addExpenseHandler} className="form-expenses">
          <label htmlFor="amount">Amount</label>
          <input ref={inputAmountRef} type="number" id="amount" />

          <label htmlFor="desc">Description</label>
          <textarea
            // style={{
            //   display: "block",
            //   width: 100 + "%",
            //   padding: 3 + "px",
            //   margin: 5 + "px" + " " + 0 + " " + 5 + "px" + " " + 0,
            //   boxSizing: "border-box",
            // }}
            type="text"
            id="desc"
            rows="3"
            ref={inputDescRef}
          ></textarea>
          <label htmlFor="category">Choose a car:</label>
          <select
            ref={inputCategoryRef}
            id="category"
            //   style={{
            //     display: "block",
            //     width: 100 + "%",
            //     padding: 3 + "px",
            //     margin: 5 + "px" + " " + 0 + " " + 5 + "px" + " " + 0,
            //     boxSizing: "border-box",
            //   }}
          >
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Rent">Rent</option>
            <option value="Others">Others</option>
          </select>
          <button type="submit">Add Expense</button>
        </form>
      </div>
      <div className="expenses-list">
        {expenses.map((expense) => (
          <ExpenseItem
            id={expense.id}
            item={expense}
            deleteItem={deleteExpenseHandler}
            editItem={editExpenseHandler}
          />
        ))}

        <div>
          <b>Total Amount </b> {totalAmount}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
