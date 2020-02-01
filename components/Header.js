import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
    return (
        <Menu style={{ marginTop: "1rem" }}>
            <Link route="/">
                <a className="item">Budget Chain</a>
            </Link>

            <Link route="/manager">
                <a className="item">Manager Panel</a>
            </Link>

            <Link route="/club">
                <a className="item">Club Panel</a>
            </Link>
        </Menu>
    );
};
