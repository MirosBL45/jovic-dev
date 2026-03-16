// react/next stuff
import Link from "next/link";

// data
import { privacyDataText } from "@/utils/allData/privacy";

// style
import styles from "./page.module.css";

// Static metadata
export const metadata = {
  title: "Privacy Policy Jović Miroslav | Frontend Developer",
  description:
    "Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development",
  twitter: {
    title: "Privacy Policy Jović Miroslav | Frontend Developer",
    description:
      "Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development",
  },
  openGraph: {
    title: "Privacy Policy Jović Miroslav | Frontend Developer",
    description:
      "Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development",
  },
};

function Privacy() {
  return (
    <main className={styles.container}>
      <header>
        <h1>{privacyDataText.headlineText}</h1>
        <h2>{privacyDataText.descriptionText}</h2>
      </header>

      <p>{privacyDataText.lastUpdated}</p>

      {privacyDataText.sections.map((section) => (
        <section key={section.id}>
          <h2>{section.title}</h2>

          {section.text && <span>{section.text}</span>}

          {section.afterText && <p>{section.afterText}</p>}

          {section.list && (
            <ul>
              {section.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {section.afterListText && <p>{section.afterListText}</p>}

          {section.isContact && (
            <Link title="Miroslav Jović Frontend Developer" href="/contact">
              contact me.
            </Link>
          )}
        </section>
      ))}
    </main>
  );
}

export default Privacy;
