import { ESurgeryStatus } from '../constants';
import db from '../models';
import dayjs from 'dayjs';

function analyticSurgeryStatus(surgeryData) {
  let pendingCount = 0;
  let scheduledCount = 0;
  let doneCount = 0;
  let changedCount = 0;

  (surgeryData || []).forEach((surgery) => {
    switch (surgery.status) {
      case ESurgeryStatus.PENDING:
        pendingCount++;
        break;
      case ESurgeryStatus.SCHEDULED:
        scheduledCount++;
        break;
      default: {
        doneCount++;
        if (
          String(surgery?.expectedStartDate) !=
            String(surgery?.actualStartDate) ||
          String(surgery?.expectedEndDate) != String(surgery?.actualEndDate)
        ) {
          changedCount++;
        }
      }
    }
  });

  return {
    pendingCount,
    scheduledCount,
    doneCount,
    changedCount,
  };
}

function analyticSurgeryTypes(surgeryData) {
  const surgeryTypeCount = {};

  surgeryData.forEach((surgery) => {
    const surgeryType = surgery?.surgeryTypeData?.name || 'a';

    if (surgeryTypeCount[surgeryType]) {
      surgeryTypeCount[surgeryType]++;
    } else {
      surgeryTypeCount[surgeryType] = 1;
    }
  });

  const result = Object.keys(surgeryTypeCount).map((category) => ({
    category,
    value: surgeryTypeCount[category],
  }));

  return result;
}

function analyticWorkingTimeDoctor(surgeryData) {
  const doctorTotalTime = {};

  surgeryData.forEach((surgery) => {
    const doctorName = surgery?.doctorData?.name || '';
    const expectedTime = surgery?.expectedTime || 0;
    const status = surgery?.status || '';

    if (status === ESurgeryStatus.DONE) {
      if (doctorTotalTime[doctorName]) {
        doctorTotalTime[doctorName] += Number(expectedTime);
      } else {
        doctorTotalTime[doctorName] = Number(expectedTime);
      }
    }
  });

  const result = Object.keys(doctorTotalTime).map((doctorName) => ({
    name: doctorName,
    value: doctorTotalTime[doctorName],
  }));

  return result;
}

function analyzeSurgerySchedules(surgeryData, limit) {
  const limitDates = generateLimitDates(limit);
  const scheduledChart = Array.from({ length: limit }).map((_, index) => ({
    value: 0,
    date: limitDates[index],
  }));
  const changedChart = Array.from({ length: limit }).map((_, index) => ({
    value: 0,
    date: limitDates[index],
  }));

  surgeryData.forEach((surgery) => {
    if (surgery.status === ESurgeryStatus.DONE) {
      const isChanged =
        String(surgery?.expectedStartDate) !==
          String(surgery?.actualStartDate) ||
        String(surgery?.expectedEndDate) !== String(surgery?.actualEndDate);

      const surgeryDate = dayjs(String(surgery?.actualStartDate)).format(
        'YYYY-MM-DD'
      );

      const index = limitDates.indexOf(surgeryDate);
      if (index !== -1) {
        if (isChanged) {
          changedChart[index].value++;
          scheduledChart[index].value++;
        } else {
          scheduledChart[index].value++;
        }
      }
    }
  });

  return { scheduledChart, changedChart };
}

function generateLimitDates(limit) {
  const currentDate = dayjs();
  const limitDates = Array.from({ length: limit }).map((_, index) =>
    currentDate.subtract(index, 'day').format('YYYY-MM-DD')
  );
  return limitDates.reverse();
}

export const getStatistic = ({ limit }) =>
  new Promise(async (resolve, reject) => {
    try {
      const surgeryData = await db.Surgery.findAll({
        include: [
          {
            model: db.Doctor,
            as: 'doctorData',
            attributes: ['id', 'name', 'email', 'color'],
          },
          {
            model: db.SurgeryType,
            as: 'surgeryTypeData',
            attributes: ['id', 'name', 'expectedTime'],
          },
        ],
      });

      resolve({
        err: surgeryData ? 0 : 1,
        messsage: surgeryData ? 'Get data successfully' : 'Get data failed',
        data: {
          analyticSurgeryChart: analyzeSurgerySchedules(
            surgeryData,
            limit || 7
          ),
          analyticSurgeryStatus: analyticSurgeryStatus(surgeryData),
          analyticSurgeryType: analyticSurgeryTypes(surgeryData),
          analyticWorkingTimeDoctor: analyticWorkingTimeDoctor(surgeryData),
        },
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
