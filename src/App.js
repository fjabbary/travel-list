
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <State />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away  💼</h1>
}

function Form() {
  return (
    <div className="add-form">
      <h3>Whato do you need for your 😍 trip?</h3>
    </div>
  )
}

function PackingList() {
  return (
    <div className="list">LIST</div>
  )
}

function State() {
  return <div>You have X items on your list,and you already packed X (X%)</div>

}