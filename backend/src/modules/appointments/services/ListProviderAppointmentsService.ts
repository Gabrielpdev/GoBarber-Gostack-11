import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import Appointments from '../infra/typeorm/entities/Appointments';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointments[]> {
    const keyCache = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointments[]>(
      keyCache,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllAppointmentInDayFromProvider(
        {
          provider_id,
          day,
          month,
          year,
        },
      );

      this.cacheProvider.save(keyCache, appointments);
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
