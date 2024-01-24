import dayjs from 'dayjs';
import nodemailer from 'nodemailer';
import db from '../models';
import { generateDoctorEmail, generatePatientEmail } from './generate-mail';
import { ESurgeryStatus } from '../constants';

export const updateActualDate = async (surgeryList) => {
  for (const surgery of surgeryList) {
    const { expectedStartDate, expectedEndDate, id } = surgery;

    // const startDateInPast = dayjs(expectedStartDate).isBefore(dayjs());
    // if (startDateInPast) {
    //   await db.Surgery.update(
    //     { actualStartDate: expectedStartDate },
    //     { where: { id } }
    //   );
    // }

    const endDateInPast = dayjs(expectedEndDate).isBefore(dayjs());
    if (endDateInPast) {
      await db.Surgery.update(
        { status: ESurgeryStatus.DONE, isChecked: true },
        { where: { id } }
      );
    }
  }
};

export const sendInformations = async (surgeryList, settingInfo) => {
  try {
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      //   service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    for (const surgery of surgeryList) {
      const {
        id,
        actualStartDate,
        informedPatient,
        informedDoctor,
        doctorData,
        patientData,
        surgeryTypeData,
        roomData,
      } = surgery;
      const minutesDifference = dayjs(actualStartDate).diff(dayjs(), 'minutes');

      console.log({ informedPatient, informedDoctor });

      if (
        settingInfo?.patientNotification === true &&
        !informedPatient &&
        minutesDifference <= settingInfo?.patientNotiBefore &&
        patientData.email === 'duyhacde@gmail.com'
      ) {
        const mailOptions = {
          from: 'Bệnh viện Bạch Mai',
          to: patientData.email,
          subject: 'Thông báo phẫu thuật',
          html: generatePatientEmail(
            patientData.name,
            actualStartDate,
            doctorData.name,
            surgeryTypeData.name,
            roomData.name
          ),
        };

        await transporter.sendMail(mailOptions);
        console.log(
          `Email sent to patient ${patientData.email} successfully ${id}`
        );
        await db.Surgery.update({ informedPatient: true }, { where: { id } });
      }

      if (
        settingInfo?.doctorNotification === true &&
        !informedDoctor &&
        minutesDifference <= settingInfo?.doctorNotiBefore &&
        patientData.email === 'duyhacde@gmail.com'
      ) {
        const mailOptions = {
          from: 'Bệnh viện Bạch Mai',
          to: patientData.email,
          subject: 'Thông báo Phẫu thuật',
          html: generateDoctorEmail(
            patientData.name,
            actualStartDate,
            doctorData.name,
            surgeryTypeData.name,
            roomData.name
          ),
        };

        await transporter.sendMail(mailOptions);
        console.log(
          `Email sent to doctor ${patientData.email} successfully ${id}`
        );
        await db.Surgery.update({ informedDoctor: true }, { where: { id } });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkAndRunJob = async () => {
  const surgeryData = await db.Surgery.findAndCountAll({
    where: {
      status: 'Đã xếp lịch',
    },
    include: [
      {
        model: db.Room,
        as: 'roomData',
        attributes: ['id', 'name'],
      },
      {
        model: db.Doctor,
        as: 'doctorData',
        attributes: ['id', 'name', 'email'],
      },
      {
        model: db.Patient,
        as: 'patientData',
        attributes: ['id', 'name', 'email'],
      },
      {
        model: db.SurgeryType,
        as: 'surgeryTypeData',
        attributes: ['id', 'name', 'expectedTime'],
      },
    ],
  });

  const settingData = await db.Setting.findAndCountAll();

  //   console.log(settingData.rows);
  updateActualDate(surgeryData.rows);
  sendInformations(surgeryData.rows, settingData.rows[0]);
};
