import { ResumePage } from "@/components/resume-page";
import { getResume } from "@/sanity/sanity";
import Loading from "../loading";

export const metadata = {
  title: "Resume - Amadi-Sheriff Delight",
  description:
    "Download my resume or view my professional experience and qualifications.",
};

export default async function Resume() {
  const resumeDataPromise = getResume();

  // Optionally, you can show a loading state while waiting for the data
  const resumeData = await resumeDataPromise;
  if (!resumeData) {
    return <Loading />;
  }
  return <ResumePage resumeData={resumeData} />;
}
