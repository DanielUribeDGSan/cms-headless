import { getThemeConfig } from "@/themes";
import { getHomeDataUseCase } from "@/modules/home/application/get-home-data.usecase";

export default async function Home() {
  const ThemeHomePage = getThemeConfig().HomePage;
  
  // Fetch data from Payload CMS via Clean Architecture Use Case
  const data = await getHomeDataUseCase();
  
  return <ThemeHomePage data={data} />;
}
