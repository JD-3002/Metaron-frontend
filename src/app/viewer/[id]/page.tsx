import Link from "next/link";

import MatterportViewer from "@site/components/MatterportViewer";

type ViewerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// Usage example: navigate to /viewer/{modelId} to open a specific Matterport space.
const ViewerPage = async ({ params }: ViewerPageProps) => {
  const { id } = await params;
  const sdkKey = process.env.NEXT_PUBLIC_MATTERPORT_SDK_KEY;

  return (
    <main className="space-y-6 px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-white"
      >
        <span aria-hidden="true">{"\u2190"}</span> Back
      </Link>

      <MatterportViewer modelId={id} sdkKey={sdkKey ?? ""} />
    </main>
  );
};

export default ViewerPage;
