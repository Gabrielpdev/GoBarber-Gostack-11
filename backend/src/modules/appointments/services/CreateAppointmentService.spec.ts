import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createrAppointment: CreateAppointmentService;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createrAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createrAppointment.execute({
      date: new Date(),
      provider_id: '123',
      user_id: 'user',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createrAppointment.execute({
      date: appointmentDate,
      provider_id: '123',
      user_id: 'user',
    });

    await expect(
      createrAppointment.execute({
        date: appointmentDate,
        provider_id: '123',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
