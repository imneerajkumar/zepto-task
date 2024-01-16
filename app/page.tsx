import "./page.css";
import ChipInput from "./components/ChipInput";

export default function Home() {
  const itemList = [
    { id: 1, name: "Nick Giannopoulos", email: "NickGiannopoulos@gmail.com" },
    { id: 2, name: "John Doe", email: "John Doe@gmail.com" },
    { id: 3, name: "Jane Smiths", email: "Janesmithgmail.com" },
    { id: 4, name: "Alice Johnson", email: "AliceJohnson@gmail.com" },
    { id: 5, name: "Bob Brown", email: "BobBrown@gmail.com" },
    { id: 6, name: "Narayana Gamer", email: "NarayanaGamer@gmail.com" },
    { id: 7, name: "Anita Gros", email: "AnitaGros@gmail.com" },
    { id: 8, name: "Marina August", email: "MarinaAugust@gmail.com" },
  ];

  return (
    <div className="App">
      <h2>Search Users</h2>
      <ChipInput itemList={itemList} />
    </div>
  );
}
