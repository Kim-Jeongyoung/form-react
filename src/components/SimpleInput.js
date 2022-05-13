import { useEffect, useState, useRef } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name Input is valid!");
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true); // 폼이 submit되면 항상 user가 submit했다고 본다.

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

  // user가 입력을 했으나 valid 한 것이 아닐 경우
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // user가 이름을 input에 쓰는지 안 쓰는지에 따라서
  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {/* user가 이름을 쓰지 않으면 에러 메세지 보여주기 */}
        {nameInputIsInvalid && (
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
