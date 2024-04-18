# Montu System Design System

API:
Get appointment slots (with appointment_type)
1. Validate the request:
    - The requested day/week has a schedule
    - appointment_type is valid
    - This is to validate requests for users attempting to call via API amongst other things
2. Get the list of appointment_types, doctors and doctor_schedules
    - Cache these for 10 minutes, they should not change too often
3. Using the start_time on the appointment_type, determine the end_time
4. Using the time range, query the database for all existing appointments for the time range
5. With the list of appointments and list of doctors, determine where there are no times available for the appointment_type duration
6. Return data for display to show a table of days with unavailable slots filled

Appointment Booking:
1. Validate the request:
    - The appointment times are valid in regards to the schedule
    - The appointment time is within the available schedule start_time and end_time
2. Repeat steps 3 and 4 from the above list
3. With the existing appointments that fall within the range, determine the doctors that dont have an appointment in the range
4. Choose a doctor from that list and create an appointment
    - Might need to think about choosing the doctor randomly, dont want doctors with names starting with letters earlier in the alphabet to always fill up first
5. Add the appointment to the database
    - Would need to look into how to have a unique index to validate that even at database insert time, the request is valid
6. Return to the user
7. Send appointment to a queue/eventbridge
8. Listen from the eventbridge in notification services
    - Error handling/DLQ process on service
9. Schedule reminder notifications

================================================
================================================

DATABASE:
Will need doctors, patients, appointments, appointment types and a schedule for the clinic.

The difficult part to think about is how the schedule will work, my initial thought is that it will need to be populated with empty slots of 15 minutes each and each appointmen_type length will need to be divisible by 15.
These appointment times can be generated on a schedule, and generated each night so that the clinic can only have appointments scheduled a variable amount of weeks ahead of time with the schedule automatically keeping up the slot generation.

The appointment table will reference the doctor, patient and the particular schedule IDs.
Ideally the appointments can be of variable length based on the appointment_type 

To check which doctor has an appointment available, when the booking comes in will need to run a validation check to see if any doctor has the specific

On second thought, having slots generated is too complcates, can just have appointment length stored on the appointment_type, the schedule can be for the days the clinic is available.
Will need to validate the doctors availability based on date lookups which is not ideal though.
ElasticSearch or another optimised database for appointment time-based lookups?

doctor:
{
    id: string,
    name: string
    active: boolean,
    created_at: date,
    updated_at: date,
    removed_at: date
}

patient:
{
    id: string,
    created_at: date,
    updated_at: date,
    personal details...
}

schedule:
{
    id: string,
    day: date,
    active: boolean
    start_time: datetime,
    end_time: datetime
}

doctor_schedule:
{
    id: string,
    day: date,
    start_time: datetime,
    end_time: datetime
}

appointment_type:
{
    id: string,
    name: string,
    length_minutes: number
}

appointment:
{
    id: string,
    doctor_id: doctor.id,
    patient_id: patient.id
    appointment_type: appointment_type.id,
    start_time: datetime,
    end_time: datetime
}
