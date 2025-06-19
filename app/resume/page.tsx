import { ResumePage } from "@/components/resume-page";
import { getResume } from "@/sanity/sanity";
import Loading from "../loading";
import ClientOnly from "@/components/client-wrapper";

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
  return (
    <ClientOnly>
      <ResumePage resumeData={resumeData} />
    </ClientOnly>
  );
}
