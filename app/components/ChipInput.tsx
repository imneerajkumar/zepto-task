"use client";
import React, { useState, useEffect, useRef } from "react";

interface IList {
  id: number;
  name: string;
  email: string;
}

const ChipInput = ({ itemList }: any) => {
  const [items, setItems] = useState<IList[]>(itemList);
  const [input, setInput] = useState<string>("");
  const [chips, setChips] = useState<IList[]>([]);
  const [filteredItems, setFilteredItems] = useState<IList[]>([]);
  const [highlightedChip, setHighlightedChip] = useState<IList | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const addChip = (chip: IList) => {
    setChips([...chips, chip]);
    setItems((items) => items.filter((item: IList) => item.name != chip.name));
    setFilteredItems([]);
    setInput("");
    setHighlightedChip(undefined);
  };

  const filterItems = (value: string) => {
    return items.filter((item: IList) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  const removeChip = (chip: IList) => {
    setChips(chips.filter((item) => item.id !== chip.id));
    setItems([chip, ...items]);
    setFilteredItems([]);
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInput(value);
    setFilteredItems(filterItems(value));
  };

  const handleKeyDown = (e: any) => {
    if (
      e.key === "Backspace" &&
      input === "" &&
      chips.length > 0 &&
      !highlightedChip
    ) {
      setHighlightedChip(chips[chips.length - 1]);
    } else if (
      e.key === "Backspace" &&
      input === "" &&
      chips.length > 0 &&
      highlightedChip
    ) {
      removeChip(highlightedChip);
      setHighlightedChip(undefined);
    }
  };

  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="chip-input">
      <div className="chip-container">
        {chips.map(
          (chip: IList) =>
            chip && (
              <div
                key={chip.id}
                className={`chip ${
                  highlightedChip?.name === chip.name ? "highlighted" : ""
                }`}
              >
                <div className="chip-name">
                  <img src="https://placehold.co/15x15" alt="" />
                  <p>{chip.name}</p>
                </div>
                <span className="chip-close" onClick={() => removeChip(chip)}>
                  x
                </span>
              </div>
            )
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onFocus={() => setFilteredItems(items)}
          onKeyDown={handleKeyDown}
          placeholder={"Search..."}
        />
        <div className="item-list">
          {filteredItems.map((item: IList) => (
            <div key={item.id} onClick={() => addChip(item)}>
              <div className="item-name">
                <img src="https://placehold.co/30x30" alt="" />
                <p>{item.name}</p>
              </div>
              <p>{item.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChipInput;
