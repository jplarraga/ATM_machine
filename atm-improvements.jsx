
const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};


const Greetings = ({onClick, hasName, onChange}) => {

  return(
    <label className="label huge">
    <h1>Hi! Please enter your name:</h1>
    <input id="name-input" type="text" width="200" onChange={onChange}></input>
    <input type="submit" width="200" value="Submit" id="submit-input" disabled={!hasName} onClick={onClick}></input>
    </label>
 
  );
};

const Account = () => {

  const [nameMode, setNameMode] = React.useState(true);
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  //here the first part
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [hasName, setHasName] = React.useState(false);
  const [createForm, setCreateForm] =React.useState("");
  const [nickName, setNickName] = React.useState("");

  const{Container} = ReactBootstrap;
  const{Form} = ReactBootstrap;

  let status = `Your Account Balance is $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);


  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);

    if(deposit < 0) {
     setDeposit(0);
    } else { 
      setDeposit(Number(event.target.value));
    }

    setValidTransaction(false);

    if(event.target.value <= 0 ){
      return
    } 

    if(atmMode === "Cash Back" && event.target.value > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true)
    }

  };

  const handleName = (event) => {
    setHasName(true);
    if(event.target.value === "") setHasName(false);
    if(event.target.value != "") setNickName(event.target.value);
  }

  const onSubmitName = (event) =>{
    setNameMode("");
    setCreateForm(true);
  }

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    if(event.target.value === "Deposit"){
      setIsDeposit(true)
      } else if (event.target.value === "Cash Back"){
        setIsDeposit(false);
      }
  };

  return (

    <Container>
      <form onSubmit={handleSubmit}>
        {nameMode && <Greetings onChange={handleName} hasName={hasName} onClick={onSubmitName}></Greetings>}
        
        {createForm && <h2 id="total">{nickName}! {status}</h2>}
        {createForm && <label id="total">PLEASE SELECT AN ACTION TO CONTINUE </label>}
        {createForm && <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select total">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
          </select>}


        {atmMode && <ATMDeposit isValid={validTransaction} onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>}
      </form>
    </Container>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
