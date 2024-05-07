import Papa from 'papaparse';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { uploadImageOnS3 } from './upload-file-on-s3';

import { accordionMapping } from '../components/utils/constants';

export const DownloadFile = ({ csvExportContent, fileName }) => {
  let encodedUri = encodeURI(csvExportContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
}

const isImage = (tableData) => {
  for (let data of tableData) {
    if (data?.image && Object.keys(data?.image)?.length) return true;
  }
  return false;
}

function dataURLtoFile(dataUrl, fileName) {
  const arr = dataUrl?.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

const allEmptyValues = (arr) => arr?.every((value) => value === undefined);

const breakStringIntoChunks = (str, chunkLength) => {
  var chunks = [];
  for (var i = 0; i < str.length; i += chunkLength) {
    chunks.push(str.slice(i, i + chunkLength));
  }
  return chunks;
}

export const generatePDF = async ({ formData, imageUrl, gradesMapping, roofImage }) => {
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageHeight = pdf.internal.pageSize.getHeight();
  const { customerInformation, Images, inspectorInformation, comments } = formData || {};
  const images = Images?.data || {};
  const {
    email,
    jobSiteAddress,
    mailingAddress,
    name,
    numberOfRoofTypes,
    phone
  } = customerInformation?.data[0] || {};

  const {
    inspectorEmail,
    inspectorFirstName,
    inspectorInspectionDate,
    inspectorLastName,
    inspectorPhoneNo,
    inspectorPosition
  } = inspectorInformation?.data[0] || {};

  let currentX = 50;
  let currentY = 40;

  pdf.addImage(roofImage, 'JPEG', 70, currentY, 400, 150);
  currentY += 200;

  // Add images to PDF
  for (let i = 0; i < images?.length; i++) {
    if (currentY + 50 > pageHeight) {
      pdf.addPage();
      currentY = 50;
    }

    const parts = images[i]?.split(";");
    const extensionPart = parts[0]?.split("/")[1];
    const imageExtension = extensionPart.trim();

    try {
      pdf.addImage(images[i], imageExtension?.toUpperCase(), currentX, currentY, 200, 150);
    } catch (error) {
      console.error(`Error adding image ${i + 1}:`, error);
      // Handle the error here, such as logging it or displaying a placeholder image
    }

    currentX += 220;
    if ((i + 1) % 2 === 0) {
      currentX = 50;
      currentY += 170
    }
  }

  if (images?.length % 2 === 1) currentY += 170;

  if (currentY + 50 > pageHeight) {
    // If not, add a new page and reset currentY
    pdf.addPage();
    currentY = 50;
  }
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Customer Information: ', 40, currentY);
  pdf.setFont('helvetica', 'normal');
  currentY += 20;
  pdf.text('Name: ', 40, currentY);
  pdf.text(name || '', 90, currentY);
  pdf.text('Mailing Address: ', 250, currentY);
  pdf.text(mailingAddress || '', 350, currentY);
  currentY += 20;
  pdf.text('Phone: ', 40, currentY);
  pdf.text(phone || '', 90, currentY);
  pdf.text('Job site Address: ', 250, currentY);
  pdf.text(jobSiteAddress || '', 350, currentY);
  currentY += 20;
  pdf.text('Email: ', 40, currentY);
  pdf.text(email || '', 90, currentY);
  pdf.text('Number of roof type: ', 250, currentY);
  pdf.text(numberOfRoofTypes || '', 370, currentY);
  currentY += 30;

  if (currentY + 50 > pageHeight) {
    // If not, add a new page and reset currentY
    pdf.addPage();
    currentY = 50;
  }

  for (let data in formData) {
    if (['customerInformation', 'Images', 'inspectorInformation']?.includes(data)) continue;

    if (gradesMapping?.[data]) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${data} Grade ${gradesMapping?.[data]}: `, 40, currentY + 5);
      pdf.setFont('helvetica', 'normal');

      currentY += 20;
      if (gradesMapping?.[data] === "A") {
        pdf.text('Roof appears relatively new. Roof requires only simple debris removal, flashing inspection,', 40, currentY);
        currentY += 20;
        pdf.text('and touch up. Qualifies for a Total Roof Maintenance Agreement.', 40, currentY);
        currentY += 20;
      } else if (gradesMapping?.[data] === "B") {
        pdf.text('Roof is not in an aged condition. All flashings, membrane or shingle, parapet wall coverings, ', 40, currentY);
        currentY += 20;
        pdf.text('penetrations and equipment / skylight flashings are in good condition, require minor repair work,', 40, currentY);
        currentY += 20;
        pdf.text('and coating of flashings. Debris is not excessive. After recommended repair(s) are completed,', 40, currentY);
        currentY += 20;
        pdf.text('roof qualifies for the Total Roof Maintenance Agreement.', 40, currentY);
        currentY += 20;
      } else if (gradesMapping?.[data] === "C") {
        pdf.text('Roof is showing normal signs of age - wear and / or may have foot traffic wear. Some flashings', 40, currentY);
        currentY += 20;
        pdf.text('have leaked but are repairable. Roof membrane is showing signs of aging and excessive debris. ', 40, currentY);
        currentY += 20;
        pdf.text('Roof membrane is showing signs of aging and excessive debris. After recommended repair(s) are', 40, currentY);
        currentY += 20;
        pdf.text('completed, roof qualifies for the Total Roof Maintenance Agreement.', 40, currentY);
        currentY += 20;
      } else if (gradesMapping?.[data] === "D") {
        pdf.text('Roof is showing many areas of wear and has seam / lap problems. Previous repairs are evident', 40, currentY);
        currentY += 20;
        pdf.text('and flashing problems have occurred. Extensive work is needed. Once repaired, this roof may be ', 40, currentY);
        currentY += 20;
        pdf.text('maintained for a short time. This is typically the last opportunity to consider recovery or', 40, currentY);
        currentY += 20;
        pdf.text('restoration. May only qualify for a Total Roof Maintenance Plan if recommended repairs are completed.', 40, currentY);
        currentY += 20;
        pdf.text('Budgeting for replacement is encouraged. Moisture Survey is mandatory if warranty is desired.', 40, currentY);
        currentY += 20;
      } else if (gradesMapping?.[data] === "F") {
        pdf.text('Roof is showing excessive wear or problems and leaking may be occurring. Life extension of the ', 40, currentY);
        currentY += 20;
        pdf.text('roof system is difficult. There are system-wide seam, lap, and flashing failures. Inner-ply asphalt', 40, currentY);
        currentY += 20;
        pdf.text('in built up roof systems may be  completely lifeless and crumbling. Does not qualify for the ', 40, currentY);
        currentY += 20;
        pdf.text('Total Roof Maintenance Agreement.', 40, currentY);
        currentY += 20;
      }
      if (currentY + 50 > pageHeight) {
        pdf.addPage();
        currentY = 50;
      }
    }
    pdf.setFontSize(12);
    const tableGrade = accordionMapping?.find(x => x.name === data) || {};
    const headers = [[tableGrade?.TableNo, data, 'Status', 'Location', 'Corrective Action', 'Image', 'Actual Status']];

    let tableData = formData[data]?.data?.map(({
      itemNo,
      customText,
      status,
      location,
      correctiveAction,
      images: aa,
      actualStatus
    }) => {
      if ((itemNo === '' || itemNo === undefined) && (customText === '' || customText === undefined)) return undefined
      return [
        itemNo,
        customText,
        status,
        location || 'N/A',
        correctiveAction || 'N/A',
        'N/A',
        actualStatus
      ];
    });

    if (!allEmptyValues(tableData)) {
      pdf.autoTable({
        head: headers,
        body: tableData,
        startY: currentY, // Start position in y coordinate
        margin: { top: 20 },
        styles: { fontSize: 10, cellPadding: 8 },
        didDrawCell: (tableData) => {
          currentY += 5;
          if (tableData.section === 'body' && tableData.column.index === 5) {
            // console.log('Row Data:', data, tableData?.row?.index,);
            const img = formData[data]?.data[tableData?.row?.index]?.images
            if (img) {
              const parts = img[0]?.split(";");
              const extensionPart = parts[0]?.split("/")[1];
              const imageExtension = extensionPart.trim();
              pdf.addImage(img[0], imageExtension?.toUpperCase(), tableData.cell.x + 2, tableData.cell.y + 2, 50, 30)
            }
          }
        },
        columnStyles: {
          2: { halign: 'center' },
          3: { halign: 'center' },
          6: { halign: 'center' },
        },
      });
    }
    // Add the table to the PDF
    if (currentY + 50 > pageHeight) {
      // If not, add a new page and reset currentY
      pdf.addPage();
      currentY = 50;
    }
  }
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Comment: ', 40, currentY + 10);
  pdf.setFont('helvetica', 'normal');
  currentY += 15;
  const commentsChunk = breakStringIntoChunks(comments?.data?.[0]?.comment, 95);
  commentsChunk.forEach(chunk => {
    currentY += 15;
    pdf.text(chunk, 50, currentY);
    currentY += 15;
    if (currentY + 50 > pageHeight) {
      pdf.addPage();
      currentY = 50;
    }
  });
  currentY += 30;
  if (currentY + 50 > pageHeight) {
    pdf.addPage();
    currentY = 50;
  }
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Inspection Performed By: ', 40, currentY + 15);
  pdf.setFont('helvetica', 'normal');
  currentY += 30;
  pdf.text('Name: ', 40, currentY);
  pdf.text(inspectorFirstName || '', 90, currentY);
  currentY += 20;
  pdf.text('Position: ', 40, currentY);
  pdf.text(inspectorPosition || '', 100, currentY);
  currentY += 20;
  pdf.text('Phone: ', 40, currentY);
  pdf.text(inspectorPhoneNo || '', 90, currentY);
  currentY += 20;
  pdf.text('Email: ', 40, currentY);
  pdf.text(inspectorEmail || '', 90, currentY);
  currentY += 20;
  pdf.text('Inspection Date: ', 40, currentY);
  pdf.text(inspectorInspectionDate || '', 140, currentY);
  currentY += 30;

  // // Get PDF data URL
  const pdfDataURL = pdf.output('datauristring');
  return pdfDataURL;
};

export const UploadMultiTableCsv = async ({ formData, imageUrl, gradesMapping }) => {
  const tables = [];
  if (imageUrl) tables.push({ heading: 'Image', data: [{ imageUrl }] });

  for (let data in formData) {
    const {
      data: tableData
    } = formData[data] || {};
    if (!tableData?.length) continue;
    const tableContent = [];

    if (data === 'Images') {
      let i = 1;
      for (let image of tableData) {
        try {
          const originalFile = await dataURLtoFile(image, `Image-${i}`);
          await uploadImageOnS3(originalFile);
          tableContent.push({ image: `${process.env.REACT_APP_S3_BUCKET_BASE_URL}/${originalFile?.name}-${moment().format('D-MMM-YY-h:mm')}` });
          i++;
        } catch (error) {
          return;
        }
      }
    } else {
      for (let d of tableData) {
        const { images, imagesNames, ...rest } = d || {};
        try {
          if (images?.length) {
            const allImages = [];
            let i = 1;
            for (let image of images) {
              const originalFile = await dataURLtoFile(image, `Image-${i}`);
              await uploadImageOnS3(originalFile);
              allImages.push(`${process.env.REACT_APP_S3_BUCKET_BASE_URL}/${originalFile?.name}-${moment().format('D-MMM-YY-h:mm')}`);
              i++;
            }
            const newObj = { ...rest };
            allImages.forEach((img, i) => {
              newObj[`image${i + 1}`] = img;
            })
            tableContent.push(newObj);
          } else {
            tableContent.push({ ...rest });
          }
        } catch (error) {
          return;
        }
      }
    }
    tables.push({ heading: data, data: tableContent });
  }

  const csvData = tables.map(table => {
    const csv = [];
    csv.push([`${table.heading}    Grade: ${gradesMapping[table.heading] || 'A'}`]);
    csv.push(Object.keys(table.data[0])); // Adding column headers
    table.data.forEach(row => {
      csv.push(Object.values(row));
    });
    return Papa.unparse(csv);
  }).join('\r\n');
  return csvData;
}