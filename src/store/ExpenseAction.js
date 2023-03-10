import { expenseAction } from "./Expense";

export const addingExpense = (expenseItem) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://expense-tracker-760b4-default-rtdb.firebaseio.com/expense-tracker.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseItem),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Expense added Successfully");
        //   inputAmountRef.current.value = "";
        //   inputDescRef.current.value = "";
        //   inputCategoryRef.current.value = "";
        //   await fetchExpenses();
        const newData = {
          ...expenseItem,
        };
        dispatch(
          expenseAction.addExpense({
            expenses: newData,
            totalAmount: newData.amount,
          })
        );
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error);
    }
  };
};
