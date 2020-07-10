import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentInMonthFromProviderDTO';
import IFindAllAppointmentInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllAppointmentInMonthFromProvider(
    date: IFindAllAppointmentInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllAppointmentInDayFromProvider(
    date: IFindAllAppointmentInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
