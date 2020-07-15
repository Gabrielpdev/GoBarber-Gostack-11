import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(`providers-list:${user_id}`, users);

      console.log('a query foi feita');

      return users;
    }

    return users;
  }
}

export default ListProvidersService;
