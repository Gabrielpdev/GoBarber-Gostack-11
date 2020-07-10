import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentInMonthFromProviderDTO';
import IFindAllAppointmentInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentInDayFromProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findAllAppointmentInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllAppointmentInMonthFromProviderDTO): Promise<Appointment[]> {
    const findAppointment = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return findAppointment;
  }

  public async findAllAppointmentInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllAppointmentInDayFromProviderDTO): Promise<Appointment[]> {
    const findAppointment = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
