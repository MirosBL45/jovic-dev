// components
import { notFound } from "next/navigation";
import ProjectsCard from "@/components/UIComponents/Cards/ProjectsCard";
import JustLinks from "./JustLinks";
import ScrollButton from "@/components/UIComponents/ScrollButton/ScrollButton";

// data
import { itemsPortfolio } from "@/utils/allData/mainPortfolio";

// style
import styles from "./page.module.css";

// Static metadata
export const metadata = {
  title: "Portfolio of Jović Miroslav | Frontend Developer",
};

function getData(categoryObject) {
  const data = itemsPortfolio[categoryObject];

  if (data) {
    return data;
  }

  return notFound();
}

async function Category({ params }) {
  const { category } = await params;
  const data = getData(category);

  return (
    <>
      <JustLinks />
      <header>
        <h2 className={styles.catTitle}>{category}</h2>
      </header>
      <ProjectsCard projects={data} />
      {/* <ScrollButton /> */}
    </>
  );
}

export default Category;
