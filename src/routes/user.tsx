import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { useState, useEffect } from "hono/jsx";

export const app = new Hono();

const Users: FC = () => {
  const [click, setClick] = useState(0);
  const users = [
    {
      name: "Delene Gilbert",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore eos exercitationem veniam.",
    },
    {
      name: "Delene Gilbert",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore eos exercitationem veniam.",
    },
    {
      name: "Delene Gilbert",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore eos exercitationem veniam.",
    },
  ];
  return (
    <div className="">
      <h1 className="">Hello users</h1>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sed iure,
        reprehenderit quo quidem nobis culpa nam consectetur sapiente
        laudantium, architecto aut illo laboriosam reiciendis ab error?
      </p>
      <ul>
        {users.map((user) => (
          <li className="">
            <h3>{user.name}</h3>
            <p>{user.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

app.get("/", (c) => {
  return c.html(<Users />);
});
