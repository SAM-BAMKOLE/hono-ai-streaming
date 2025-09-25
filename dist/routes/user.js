import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { Hono } from "hono";
import { useState, useEffect } from "hono/jsx";
export const app = new Hono();
const Users = () => {
    const [click, setClick] = useState(0);
    const users = [
        {
            name: "Delene Gilbert",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore eos exercitationem veniam.",
        },
        {
            name: "Delene Gilbert",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore eos exercitationem veniam.",
        },
        {
            name: "Delene Gilbert",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore eos exercitationem veniam.",
        },
    ];
    return (_jsxs("div", { className: "", children: [_jsx("h1", { className: "", children: "Hello users" }), _jsx("p", { className: "", children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sed iure, reprehenderit quo quidem nobis culpa nam consectetur sapiente laudantium, architecto aut illo laboriosam reiciendis ab error?" }), _jsx("ul", { children: users.map((user) => (_jsxs("li", { className: "", children: [_jsx("h3", { children: user.name }), _jsx("p", { children: user.description })] }))) })] }));
};
app.get("/", (c) => {
    return c.html(_jsx(Users, {}));
});
