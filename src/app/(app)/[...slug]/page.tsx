import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { notFound } from "next/navigation";
import { PuckPageRender } from "@/components/payload/PuckPageRender";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: path } },
  });

  const page = pages.docs[0];
  if (!page || !page.puckData) return notFound();

  return <PuckPageRender data={page.puckData} />;
}
