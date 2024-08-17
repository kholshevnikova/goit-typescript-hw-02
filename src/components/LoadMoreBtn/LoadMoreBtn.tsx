import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <div className={css.btnContainer}>
      <button type="button" onClick={onClick} className={css.btn}>
        Load more
      </button>
    </div>
  );
}
