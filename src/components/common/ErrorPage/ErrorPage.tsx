import classNames from "classnames";
import cls from "./ErrorPage.module.scss";
import { Button } from "../Button";
import { FC } from "react";

interface ErrorPageProps {
  className?: string;
}

const ErrorPage: FC = ({ className }: ErrorPageProps) => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(cls.ErrorPage, className)}>
      <p>Произошла непредвиденная ошибка</p>
      <Button text="Обновить страницу" onClick={reloadPage} />
    </div>
  );
};

export default ErrorPage;
