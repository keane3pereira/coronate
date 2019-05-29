import React, {useState} from "react";
import {Dialog} from "@reach/dialog";
import Icons from "../icons";
import {Link} from "@reach/router";
import NewPlayer from "../new-player";
import PropTypes from "prop-types";
import VisuallyHidden from "@reach/visually-hidden";
import styles from "./index.module.css";
import {useDocumentTitle} from "../../hooks";

export default function PlayerList({
    players,
    playersDispatch,
    optionsDispatch
}) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    useDocumentTitle("Players");
    const delPlayer = function (event, id) {
        event.preventDefault();
        const message = "Are you sure you want to delete "
            + players[id].firstName + " " + players[id].lastName + "?";
        if (window.confirm(message)) {
            playersDispatch({id, type: "DEL_ITEM"});
            optionsDispatch({id, type: "DEL_AVOID_SINGLE"});
        }
    };
    return (
        <div className="content-area">
            <div className="toolbar toolbar__left">
                <button onClick={() => setIsFormOpen(true)}>
                    <Icons.UserPlus /> Add a new player
                </button>
            </div>
            <table className={styles.table}>
                <caption>Player roster</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Matches</th>
                        <th><VisuallyHidden>Controls</VisuallyHidden></th>
                    </tr>
                </thead>
                <tbody>{Object.values(players).map((player) =>
                    <tr key={player.id}  className="buttons-on-hover">
                        <td className="table__player">
                            <Link to={player.id}>
                                {player.firstName} {player.lastName}
                            </Link>
                        </td>
                        <td className="table__number">{player.rating}</td>
                        <td className="table__number">{player.matchCount}</td>
                        <td>
                            <button
                                className="danger button-ghost"
                                onClick={(event) => delPlayer(event, player.id)}
                            >
                                <Icons.Trash />
                                <VisuallyHidden>
                                    Delete {player.firstName} {player.lastName}
                                </VisuallyHidden>
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <Dialog isOpen={isFormOpen}>
                <button
                    className="button-micro"
                    onClick={() => setIsFormOpen(false)}
                >
                    Close
                </button>
                <NewPlayer dispatch={playersDispatch} />
            </Dialog>
        </div>
    );
}
PlayerList.propTypes = {
    optionsDispatch: PropTypes.func.isRequired,
    players: PropTypes.object.isRequired,
    playersDispatch: PropTypes.func.isRequired
};