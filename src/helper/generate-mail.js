import dayjs from 'dayjs';

export const generatePatientEmail = (
  patientName,
  surgeryDate,
  doctor,
  surgeryType,
  operatingRoom
) => {
  const startDate = new Date(surgeryDate);
  startDate.setUTCHours(startDate.getUTCHours() - 7);

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thông báo Phẫu thuật</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            color: black;
            margin: 0;
            padding: 0;
          }

          .im {
            color: black;
          }
    
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
    
          h1 {
            color: #007BFF;
          }
    
          p {
            line-height: 1.6;
          }
    
          .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            transition: background-color 0.3s;
          }
    
          .cta-button:hover {
            opacity: 0.9
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thông báo Phẫu thuật</h1>
          <p>Xin chào bệnh nhân <b>${patientName}</b>,</p>
          <p>Chúng tôi muốn thông báo đến bạn rằng thời gian phẫu thuật của bạn sắp đến.</p>
          <p>Chi tiết về ca phẫu thuật của bạn:</p>
          <ul>
            <li>Ngày giờ dự kiến: ${dayjs(startDate).format(
              'HH:mm:ss DD/MM/YYYY'
            )}</li>
            <li>Bác sĩ phẫu thuật: ${doctor}</li>
            <li>Loại phẫu thuật: ${surgeryType}</li>
            <li>Phòng phẫu thuật: ${operatingRoom}</li>
          </ul>
          <p>Vui lòng đảm bảo bạn đã chuẩn bị đầy đủ đồ cá nhân và đến bệnh viện ít nhất 1 tiếng trước thời gian trên để thực hiện các thủ tục chuẩn bị.</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ chúng tôi theo số điện thoại <b>19008888</b> hoặc email sau: benhvien@gmail.com.</p>
          <p>Cảm ơn bạn và chúc bạn có một cuộc phẫu thuật suôn sẻ!</p>
          <p>Trân trọng,</p>
          <a href="https://www.facebook.com/" class="cta-button">Truy cập trang web bệnh viện</a>
        </div>
      </body>
      </html>
    `;
};

export const generateDoctorEmail = (
  patientName,
  surgeryDate,
  doctor,
  surgeryType,
  operatingRoom
) => {
  const startDate = new Date(surgeryDate);
  startDate.setUTCHours(startDate.getUTCHours() - 7);

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thông báo Phẫu thuật</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            color: black;
            margin: 0;
            padding: 0;
          }

          .im {
            color: black !important;
          }
    
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
    
          h1 {
            color: #007BFF;
          }
    
          p {
            line-height: 1.6;
          }
    
          .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            transition: background-color 0.3s;
          }
    
          .cta-button:hover {
            opacity: 0.9
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thông báo Phẫu thuật</h1>
          <p>Xin chào bác sĩ <b>${doctor}</b>,</p>
          <p>Chúng tôi muốn thông báo đến bạn rằng sắp đến thời gian phẫu thuật mà bạn phải thực hiện</p>
          <p>Chi tiết về ca phẫu thuật:</p>
          <ul>
            <li>Ngày giờ dự kiến: ${dayjs(startDate).format(
              'HH:mm:ss DD/MM/YYYY'
            )}</li>
            <li>Bệnh nhân: ${patientName}</li>
            <li>Loại phẫu thuật: ${surgeryType}</li>
            <li>Phòng phẫu thuật: ${operatingRoom}</li>
          </ul>
          <p>Vui lòng đảm bảo bạn có mặt bệnh viện ít nhất 30 phút trước thời gian trên để chuẩn bị dụng cụ phẫu thuật và các thủ tục cần thiết.</p>
          <p>Cảm ơn bạn và chúc bạn có một ngày làm việc hiệu quả!</p>
          <p>Trân trọng,</p>
          <a href="https://www.facebook.com/" class="cta-button">Xem chi tiết lịch phẫu thuật</a>
        </div>
      </body>
      </html>
    `;
};
