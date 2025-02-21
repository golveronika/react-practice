import React, { PropsWithChildren, useState } from "react";
import NoteForm from "../components/NoteForm";


export interface dataItem {
  id: string;
  userName: string;
  action: "note" | "call" | "meeting" | "beer" | "coffee";
  mention: string;
  description: string;
  date: string;
}

const initialData: dataItem[] = [
  {
    id: "1",
    userName: "johndoe",
    action: "note",
    mention: "John Doe",
    description: "This is a note",
    date: "2022-01-01",
  },
  {
    id: "2",
    userName: "johndoe",
    action: "call",
    mention: "John Doe",
    description: "This is a call",
    date: "2022-01-01",
  },
  {
    id: "3",
    userName: "johndoe",
    action: "meeting",
    mention: "John Doe",
    description: "This is a meeting",
    date: "2022-01-01",
  },
];

const userName = "Veronika";
const mention = "Milton Waddams";

const HomePage = () => {
  const [data, setData] = useState(initialData);

  const addNewItem = (item: Pick<dataItem, "action" | "description">) => {
    console.log(item);
    const newItem: dataItem = {
      id: new Date().getTime().toString(),
      userName: userName,
      ...item,
      mention: mention,
      date: new Date().toISOString(),
    };

    setData((prevData) => [...prevData, newItem]);
  };

  return (
    <div className="page-wrapper">
      <NoteForm onSubmit={addNewItem} />
      <div className="line-wrapper">
        {data
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((item) => {
            return (
              <div className="line-item" key={item.id}>
                <div className="item-user">
                  {item.userName === userName ? "you" : item.userName}
                </div>
                <div className="item-action">{item.action}</div>
                <div className="item-mention">{item.mention}</div>
                <div className="item-description">{item.description}</div>
                <div className="item-date">{item.date}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
