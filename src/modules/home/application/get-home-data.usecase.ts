import { HomeEntity } from '../domain/home.entity';
import { PayloadHomeRepository } from '../infrastructure/payload-home.repository';

// Note: If using a real dependency injection framework, we would inject the repository interface here.
export async function getHomeDataUseCase(): Promise<HomeEntity> {
  const repository = new PayloadHomeRepository();
  return await repository.getHomeData();
}
