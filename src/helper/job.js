import dayjs from 'dayjs';
import nodemailer from 'nodemailer';
import db from '../models';
import { generateDoctorEmail, generatePatientEmail } from './generate-mail';

export const updateActualDate = async (surgeryList) => {
  for (const surgery of surgeryList) {
    const { expectedStartDate, expectedEndDate, id } = surgery;

    const startDateInPast = dayjs(expectedStartDate).isBefore(dayjs());
    if (startDateInPast) {
      await db.Surgery.update(
        { actualStartDate: expectedStartDate },
        { where: { id } }
      );
    }

    const endDateInPast = dayjs(expectedEndDate).isBefore(dayjs());
    if (endDateInPast) {
      await db.Surgery.update(
        { actualEndDate: expectedEndDate, isChecked: true },
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
        expectedStartDate,
        doctorData,
        patientData,
        surgeryTypeData,
        roomData,
      } = surgery;
      const minutesDifference = dayjs(expectedStartDate).diff(
        dayjs(),
        'minutes'
      );

      if (
        settingInfo?.patientNotification === true &&
        minutesDifference <= settingInfo?.patientNotiBefore &&
        patientData.email === 'duyhacde@gmail.com'
      ) {
        const mailOptions = {
          from: 'Bệnh viện Bạch Mai',
          to: patientData.email,
          subject: 'Thông báo phẫu thuật',
          html: generatePatientEmail(
            patientData.name,
            expectedStartDate,
            doctorData.name,
            surgeryTypeData.name,
            roomData.name
          ),
        };

        await transporter.sendMail(mailOptions);
        console.log(
          `Email sent to patient ${patientData.email} successfully ${id}`
        );
      }

      if (
        settingInfo?.doctorNotification === true &&
        minutesDifference <= settingInfo?.doctorNotiBefore &&
        patientData.email === 'duyhacde@gmail.com'
      ) {
        const mailOptions = {
          from: 'Bệnh viện Bạch Mai',
          to: patientData.email,
          subject: 'Thông báo Phẫu thuật',
          html: generateDoctorEmail(
            patientData.name,
            expectedStartDate,
            doctorData.name,
            surgeryTypeData.name,
            roomData.name
          ),
        };

        await transporter.sendMail(mailOptions);
        console.log(
          `Email sent to doctor ${patientData.email} successfully ${id}`
        );
      }

      // if (minutesDifference > 0 && minutesDifference <= 30) {
      //   const transporter = nodemailer.createTransport({
      //     service: 'gmail',
      //     auth: {
      //       user: 'your_email@gmail.com',
      //       pass: 'your_email_password',
      //     },
      //   });

      //   const mailOptions = {
      //     from: 'your_email@gmail.com',
      //     to: [doctorData.email, patientData.email],
      //     subject: 'Thông báo phẫu thuật sắp diễn ra',
      //     text: `Phẫu thuật sắp diễn ra trong ${minutesDifference} phút.`,
      //   };

      //   // Gửi email
      //   await transporter.sendMail(mailOptions);
      // }
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
  // sendInformations(surgeryData.rows, settingData.rows[0]);
};
