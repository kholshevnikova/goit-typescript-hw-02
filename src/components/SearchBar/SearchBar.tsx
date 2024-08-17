import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (topic: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const topic = (form.elements.namedItem("topic") as HTMLInputElement).value.trim();

    if (topic === "") {
      // alert("Error");
      toast.error("Please enter a search term");

      return;
    }
    onSearch(topic);
    form.reset();
  };
  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="topic"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
