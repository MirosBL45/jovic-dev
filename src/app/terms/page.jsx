// react/next stuff
import Link from "next/link";

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
    <main className={`${styles.container} layoutContainerAll`}>
      <header>
        {/* <h1>{contactData.headlineText}</h1> */}
        <h1>Terms of Service</h1>
      </header>
      <p>Last updated: March 16, 2026</p>
      <p>Welcome to the personal portfolio website of Miroslav Jović.</p>
      <p>By accessing this website, you agree to the following terms.</p>
      <h2>Use of the Website</h2>
      <p>
        This website is provided for informational and professional presentation
        purposes only.
      </p>
      <p>Visitors are permitted to:</p>
      <ul>
        <li>View portfolio projects</li>
        <li>Read articles or technical content</li>
        <li>Contact the site owner</li>
      </ul>
      <p>
        You agree not to use this website for any unlawful or malicious
        activity.
      </p>
      <h2>Intellectual Property</h2>
      <p>All content on this website, including but not limited to:</p>
      <ul>
        <li>Source code examples</li>
        <li>Design elements</li>
        <li>Text content</li>
        <li>Images and media</li>
      </ul>
      <p>
        is the intellectual property of Miroslav Jović unless otherwise stated.
      </p>
      <p>
        You may not reproduce, distribute, or use this content for commercial
        purposes without permission.
      </p>
      <h2>Project Demonstrations</h2>
      <p>
        Some projects presented on this website are demonstration or portfolio
        projects and may not represent full production systems.
      </p>
      <p>
        Code samples are provided for educational and illustrative purposes.
      </p>
      <h2>External Services</h2>
      <p>
        This website may include links to third-party services such as GitHub,
        LinkedIn, or other platforms.
      </p>
      <p>
        These services operate independently and have their own terms and
        policies.
      </p>
      <h2>Disclaimer</h2>
      <p>
        The information on this website is provided "as is" without warranties
        of any kind.
      </p>
      <p>
        While efforts are made to keep the content accurate and up to date, no
        guarantees are made regarding completeness or accuracy.
      </p>
      <h2>Changes to the Terms</h2>
      <p>
        These Terms of Service may be updated periodically. Continued use of the
        website after changes means you accept the updated terms.
      </p>
      <h2>Contact</h2>
      <p>
        If you have questions regarding these terms, you can{" "}
        <Link title={"Miroslav Jovic Frontend Developer"} href={"/contact"}>
          contact me
        </Link>
      </p>
    </main>
  );
}

export default Terms;
