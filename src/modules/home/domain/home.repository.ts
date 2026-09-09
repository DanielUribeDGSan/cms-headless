import { HomeEntity } from './home.entity';

export interface IHomeRepository {
  getHomeData(): Promise<HomeEntity>;
}
