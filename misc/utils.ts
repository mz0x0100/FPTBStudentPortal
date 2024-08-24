import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type HomeDataType = {
  profileImage: string;
  regNo: string;
  appNo: string;
  name: string;
  dob: string;
  phone: string;
  address: string;
  programme: string;
  currentClass: string;
  department: string;
  school: string;
  email: string;
};
const cheerio = require('react-native-cheerio');
export function extractHomeDataFromHtml(html: string): HomeDataType {
  const $ = cheerio.load(html);

  const profileImage = $('img[alt]').attr('src') as string;
  const regNo = $('td:contains("Registration Number:")').next().text();
  const appNo = $('td:contains("Application Number:")').next().text();
  const name = $('td:contains("Full Name:")').next().text();
  const dob = $('td:contains("Date of Birth:")').next().text();
  const phone = $('td:contains("Phone Number:")').next().text();
  const address = $('td:contains("Residential Address:")').next().text();
  const programme = $('td:contains("Programme:")').next().text();
  const currentClass = $('td:contains("Current Class:")').next().text();
  const department = $('td:contains("Department:")').next().text();
  const school = $('td:contains("School:")').next().text();
  const email = $('td:contains("Institution Email:")').next().text();

  return {
    profileImage,
    regNo,
    appNo,
    name,
    dob,
    phone,
    address,
    programme,
    currentClass,
    department,
    school,
    email,
  };
}

type PersonalDetails = {
  registrationNumber: string;
  applicationNumber: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  residentialAddress: string;
  profileImage: string;
};

type AcademicDetails = {
  programme: string;
  currentClass: string;
  department: string;
  school: string;
  institutionEmail: string;
};

type ExtractedData = {
  personalDetails: PersonalDetails;
  academicDetails: AcademicDetails;
};

export function extractDetailsFromHtml(htmlContent: string): ExtractedData {
  const $ = cheerio.load(htmlContent);

  // Extract personal details
  const personalDetails: PersonalDetails = {
    registrationNumber: $('td:contains("Registration Number:")').next().text(),
    applicationNumber: $('td:contains("Application Number:")').next().text(),
    fullName: $('td:contains("Full Name:")').next().text(),
    dateOfBirth: $('td:contains("Date of Birth:")').next().text(),
    phoneNumber: $('td:contains("Phone Number:")').next().text(),
    residentialAddress: $('td:contains("Residential Address:")').next().text(),
    profileImage: $('img[alt]').attr('src') || '',
  };

  // Extract academic details
  const academicDetails: AcademicDetails = {
    programme: $('td:contains("Programme:")').next().text(),
    currentClass: $('td:contains("Current Class:")').next().text(),
    department: $('td:contains("Department:")').next().text(),
    school: $('td:contains("School:")').next().text(),
    institutionEmail: $('td:contains("Institution Email:")').next().text(),
  };

  return {
    personalDetails,
    academicDetails,
  };
}

export const doLogin = async (
  regNo: string,
  password: string,
  onSuccess: (data: any) => void,
  onFailed: () => void
) => {
  await api
    .post(
      "/registration/",
      `regnum=${regNo}&password=${password}&form_submitted=login`
    )
    .then(async (res) => {
      // console.log(res);
      if (res.data.includes("Incorrect Login Credentials")) {
        onFailed();
      } else if (
        res.data.includes(
          '<a href="https://portal.fptb.edu.ng/registration/doLogin/0" style="margin:5px; width:150px !important;" class="btn large btn-danger">Log Out</a>'
        )
      ) {
        onSuccess(res.data);
        await AsyncStorage.setItem(
          "loginCred",
          JSON.stringify({ regNo: regNo, password: password })
        );
      }
    });
};

export const doLogout = async (
  onLogout: () => void,
) => {
  await api
    .get("/registration/doLogin/0")
    .then(async (res) => {
        onLogout();
        await AsyncStorage.removeItem("loginCred");
    });
};
export interface CourseResult {
  courseCode: string;
  courseTitle: string;
  courseUnit: string;
  grade: string;
  remark: string;
}

export interface SemesterResult {
  title: string;
  results: CourseResult[];
  gpa: string;
  cgpa: string;
  remark: string;
}

export interface ResultsPageData {
  [key: string]: SemesterResult[];
}

export function extractResultsData(html: string): ResultsPageData {
  const $ = cheerio.load(html);
  const resultsPageData: ResultsPageData = {};

  $('.accordion-group').each((_, group) => {
    const semesterTitle = $(group).find('.accordion-heading a').text().trim();
    const semesterResults: SemesterResult = {
      title: semesterTitle,
      results: [],
      gpa: '',
      cgpa: '',
      remark: '',
    };

    $(group).find('table tbody tr').each((_, row) => {
      const courseCode = $(row).find('td').eq(0).text().trim();
      const courseTitle = $(row).find('td').eq(1).text().trim();
      const courseUnit = $(row).find('td').eq(2).text().trim();
      const grade = $(row).find('td').eq(3).text().trim();
      const remark = $(row).find('td').eq(4).text().trim();

      semesterResults.results.push({
        courseCode,
        courseTitle,
        courseUnit,
        grade,
        remark,
      });
    });

    // Extract GPA, CGPA, and Remark
    const gpa = $(group).find('p').eq(0).text().replace('GPA: ', '').trim();
    const cgpa = $(group).find('p').eq(1).text().replace('CGPA: ', '').trim();
    const remark = $(group).find('p').eq(2).text().replace('Remark: ', '').trim();

    semesterResults.gpa = gpa;
    semesterResults.cgpa = cgpa;
    semesterResults.remark = remark;

    // Use semester title (e.g., "First", "Second") as key if needed
    const semesterKey = semesterTitle.split(' ')[5] || 'Unknown Semester';
    if (!resultsPageData[semesterKey]) {
      resultsPageData[semesterKey] = [];
    }
    resultsPageData[semesterKey].push(semesterResults);
  });

  return resultsPageData;
}

export interface RegistrationDetails {
  regNumber: string;
  fullName: string;
  programme: string;
  department: string;
  school: string;
  institutionEmail: string;
  defaultPassword: string;
  imageUrl: string;
  notes: string;
}

export function extractRegistrationDetails(html: string): RegistrationDetails {
  const $ = cheerio.load(html);
  const registrationDetails: RegistrationDetails = {
    regNumber: '',
    fullName: '',
    programme: '',
    department: '',
    school: '',
    institutionEmail: '',
    defaultPassword: '',
    imageUrl: '',
    notes: '',
  };

  registrationDetails.regNumber = $('td:contains("Reg. Number:")').next().text().trim();
  registrationDetails.fullName = $('td:contains("Full Name:")').next().text().trim();
  registrationDetails.programme = $('td:contains("Programme:")').next().text().trim();
  registrationDetails.department = $('td:contains("Department:")').next().text().trim();
  registrationDetails.school = $('td:contains("School:")').next().text().trim();
  registrationDetails.institutionEmail = $('td:contains("Institution\'s Email:")').next().text().trim().split(' ')[0];
  registrationDetails.defaultPassword = $('small:contains("Default password is") b').text().trim();
  registrationDetails.imageUrl = $('.thumbnail img').attr('src') || '';
  registrationDetails.notes = $('p:contains("Your registration is not complete until you submit all your files at various required locations.")').text().trim();

  return registrationDetails;
}

export interface ReceiptSession {
  session: string;
}
export const extractReceiptSessions = (html: string): ReceiptSession[] => {

    const $ = cheerio.load(html);
    const sessions: ReceiptSession[] = [];

  $('select[name="pay_session"] option').each((_, option) => {
    sessions.push({session: $(option).attr('value') as string});
  });

  return sessions;                 
}

export interface ReceiptDetails {
  label: string;
  value: string;
}

export function extractReceiptDetails(html: string): ReceiptDetails[] {
  const $ = cheerio.load(html);
  const receiptDetails: ReceiptDetails[] = [];

  $('table.table tr').each((_, row) => {
    const label = $(row).find('td').eq(0).text().trim();
    const value = $(row).find('td').eq(1).text().trim();
    if (label && value) {
      receiptDetails.push({ label, value });
    }
  });

  return receiptDetails;
}

export interface CourseRegistrationData {
  academicSession: string;
  class: string;
  semester: string;
  courses: Course[];
  totalUnit: number;
}

export interface Course {
  code: string;
  title: string;
  type: string;
  unit: number;
}

export interface HostelAccommodationData {
  allocationAvailability: string;
  bookingStatus: string;
}

export const extractCourseReg = (html: string): CourseRegistrationData => {
  const $ = cheerio.load(html);
  
  const courseRegistration: CourseRegistrationData = {
    academicSession: $('table.table tr').eq(0).find('td').eq(1).text().trim(),
    class: $('table.table tr').eq(1).find('td').eq(1).text().trim(),
    semester: $('table.table tr').eq(2).find('td').eq(1).text().trim(),
    courses: [],
    totalUnit: parseInt($('table.table tr').last().find('td').eq(1).text().trim(), 10)
  };

  $('table.table tr').each((index, element) => {
    if (index > 2 && index < $('table.table tr').length - 1) {
      const columns = $(element).find('td');
      const course: Course = {
        code: columns.eq(1).text().trim(),
        title: columns.eq(2).text().trim(),
        type: columns.eq(3).text().trim(),
        unit: parseInt(columns.eq(4).text().trim(), 10)
      };
      courseRegistration.courses.push(course);
    }
  });

  return courseRegistration;
}

export const extractHostelData = (html: string): HostelAccommodationData => {

  const $ = cheerio.load(html);
  const hostelAccommodation: HostelAccommodationData = {
    allocationAvailability: $('#mainContent .span6').eq(0).find('.well').text().trim(),
    bookingStatus: $('#mainContent .span6').eq(1).text().replace(/Booking Status:/, '').trim()
  };

  return hostelAccommodation
}