import '@/styles/pages/ProjectDetails.css'

import { LANGUAGES } from "@/lib/languages";
import { PROJECTS } from "@/lib/projects";
import ProjectDetails from "@/components/projectdetails/ProjectDetails";

export function generateStaticParams() {
  return LANGUAGES.flatMap((lang) =>
    PROJECTS.map((id) => ({
      lang,
      id,
    }))
  );
}

export default function Page() {
  return <ProjectDetails />
};