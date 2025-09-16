import css from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "NoteHub page not found",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "404 - Page not found",
    description: "Sorry, the page you are looking for does not exist",
    images: [
      {
        url: "https://seocom.agency/wp-content/uploads/2024/05/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1.jpg.webp",
        width: 1200,
        height: 630,
        alt: "Sorry, the page you are looking for does not exist",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
