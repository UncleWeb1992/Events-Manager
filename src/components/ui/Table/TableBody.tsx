import { FC } from "react";
import styles from "./Table.module.scss";
import { IEvents } from "@/types/types";
import classNames from "classnames";
import { useAppSelector } from "../../../hooks/redux";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { ReactComponent as CompletedIcon } from "../../../assets/icons/completed.svg";

interface TableBodyProps {
  data: IEvents[];
  uodateEvent: (event: IEvents) => void;
  setDeletedEvent: (event: IEvents) => void;
}

const TableBody: FC<TableBodyProps> = ({
  data,
  uodateEvent,
  setDeletedEvent,
}) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <tbody>
      {data.map((event) => (
        <tr
          className={classNames({
            [styles.completed]: event.status === "Выполнен",
          })}
          key={event.id}
        >
          {Object.values(event).map((val, i) => (
            <td key={i.toString()}>{val}</td>
          ))}
          {user.role === "ADMIN" && (
            <td className={styles.actions}>
              {event.status === "Новый" && (
                <CompletedIcon
                  onClick={uodateEvent.bind(null, event)}
                  style={{ marginRight: 5 }}
                  className={styles.icon}
                />
              )}
              <DeleteIcon
                onClick={setDeletedEvent.bind(null, event)}
                className={styles.icon}
              />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
