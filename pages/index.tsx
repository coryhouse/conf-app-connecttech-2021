import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../styles/Home.module.css";

type Talk = {
  title: string;
  abstract: string;
};

type Errors = {
  title: string | null;
  abstract: string | null;
};

const newTalk: Talk = {
  title: "",
  abstract: "",
};

type Status = "Idle" | "Submitted" | "Complete";

export default function Home() {
  const [status, setStatus] = useState<Status>("Idle");
  const [talk, setTalk] = useState(newTalk);
  const [talks, setTalks] = useState<Talk[]>([]);

  // Derived state
  const errors = validate();
  const isValid = Object.entries(errors).every(([, error]) => !error);

  function onChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTalk({ ...talk, [event.target.id]: event.target.value });
  }

  function validate() {
    const errors: Errors = {
      abstract: null,
      title: null,
    };
    if (!talk.title) errors.title = "Title is required.";
    if (!talk.abstract) errors.abstract = "Abstract is required.";
    return errors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop postback
    setStatus("Submitted");
    if (!isValid) return;
    // TODO: Actually save stuff.
    setTalks([...talks, talk]);
    setStatus("Complete");
    setTalk(newTalk); // Clear the form
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ConnectTech 2021</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Speak at ConnectTech!</h1>

        <section>
          <h2>Submitted Talks</h2>
          <ul>
            {talks.map((t) => (
              <li key={t.title}>{t.title}</li>
            ))}
          </ul>
        </section>

        <form onSubmit={handleSubmit}>
          <h2>Submit a talk</h2>
          <div>
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              id="title"
              value={talk.title}
              onChange={onChange}
            />
            {errors.title && status === "Submitted" && <p>{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="abstract">Abstract</label>
            <br />
            <textarea id="abstract" value={talk.abstract} onChange={onChange} />
            {errors.abstract && status === "Submitted" && (
              <p>{errors.abstract}</p>
            )}
          </div>
          <input type="submit" value="Submit talk" />
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
