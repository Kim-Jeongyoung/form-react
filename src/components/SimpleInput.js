import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);
    console.log(enteredName);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM

    setEnteredName(""); //reset entered value
  };
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {!enteredNameIsValid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

// 1.state 가져오기
// 2. initial value를 ''으로 해 주기
// 3. nameInputChangeHandler를 써서 입력한 값을 가져오기
//    즉 event가 trigger 될 때 값
//   every keystroke이 fire 될 때 enteredName state가 update된다.
// 4. input에 onChange 써서 바인드 시켜주기
// 5. formSubmissionHandler 만들기. form이 submit 될 때 trigger됨
// 6. onSubmit이랑 bind 해 줌
// 7. form 안에 있는  button으로 form이 submit되면 http request를
// 서버로 보냄 => 브라우저 & JS default behavior
