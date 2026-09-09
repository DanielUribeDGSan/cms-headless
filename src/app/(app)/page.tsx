import { getThemeConfig } from "@/themes";
import { getHomeDataUseCase } from "@/modules/home/application/get-home-data.usecase";
import { LiveHomePage } from "@/modules/home/ui/components/live-home-page";
import { headers } from "next/headers";

export default async function Home() {
  const ThemeHomePage = getThemeConfig().HomePage;
  
  // Fetch data from Payload CMS via Clean Architecture Use Case
  const data = await getHomeDataUseCase();
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? 'localhost:3000';
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';
  
  return <LiveHomePage initialData={data} serverURL={`${protocol}://${host}`} View={ThemeHomePage} />;
}
