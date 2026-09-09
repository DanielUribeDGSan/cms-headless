import { Render } from "@puckeditor/core";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { puckConfig } from "@/puck.config";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: path } },
  });

  const page = pages.docs[0];
  if (!page || !page.puck) return notFound();

  // The puck plugin stores the JSON data in a field named 'puck'
  const puckData = typeof page.puck === 'string' ? JSON.parse(page.puck) : page.puck;

  return <Render config={puckConfig as any} data={puckData} />;
}
