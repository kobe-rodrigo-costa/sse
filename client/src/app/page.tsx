"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const event = async () => {
    let currentid = localStorage.getItem("id");
    if (!currentid) {
      currentid = uuidv4();
      localStorage.setItem("id", currentid);
    }

    if (!listening) {
      const events = new EventSource(
        `http://localhost:3001/api/v1/events/${currentid}`
      );
      events.onmessage = (event) => {
        const mesage = JSON.parse(event.data);
        console.log(mesage);
        const { status } = mesage;
        setData((data) => [...data, status]);
      };

      setListening(true);
    }
  };
  useEffect(() => {
    event();
  }, []);

  return (
    <ul>
      {data.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  );
}
