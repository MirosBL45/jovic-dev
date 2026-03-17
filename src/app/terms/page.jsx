// react/next stuff
import Link from "next/link";

// data
import { termsDataText } from "@/utils/allData/terms";

// style
import styles from "./page.module.css";

// Static metadata
export const metadata = {
  title: "Terms Jović Miroslav | Frontend Developer",
  description:
    "Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development",
  twitter: {
    title: "Terms Jović Miroslav | Frontend Developer",
    description:
      "Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development",
  },
  openGraph: {
    title: "Terms Jović Miroslav | Frontend Developer",
    description:
      "Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development",
  },
};

function Terms() {
  return (
    <main className={styles.container}>
      <header>
        <h1>{termsDataText.headlineText}</h1>
        <h2>{termsDataText.descriptionText}</h2>
      </header>

      <p>{termsDataText.lastUpdated}</p>
      <p>{termsDataText.introText}</p>

      {termsDataText.sections.map((section) => (
        <section key={section.id}>
          <h2>{section.title}</h2>

          {section.text && <span>{section.text}</span>}

          {section.list && (
            <ul>
              {section.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {section.afterText && <p>{section.afterText}</p>}

          {section.isContact && (
            <Link href="/contact" title="Miroslav Jović Frontend Developer">
              contact me.
            </Link>
          )}
        </section>
      ))}
    </main>
  );
}

export default Terms;
