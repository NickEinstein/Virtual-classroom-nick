// import Http from "../services/httpService";
// import Cookies from "js-cookie";

// const empId = localStorage.getItem("userId");
// const querry = localStorage.getItem("");

// export const DashboardModuleCount = () => {
//   const empId = localStorage.getItem("userId");
//   return Http.get(`/PortalDashBoard/GetDashboardModuleManagerCount`, {
//     params: {
//       empId,
//     },
//   });
// };

// export const EmployeeModules = () => {
//   const empId = localStorage.getItem("userId");
//   return Http.get(`/PortalDashBoard/GetEmployeeModules`, {
//     params: {
//       empId,
//     },
//   });
// };

// export const UpdateEmployeeModules = (payload) => {
//   return Http.put(`/PortalDashBoard/PutEmployeeModules`, payload);
// };

// export const UpdateRequestItem = (payload) => {
//   return Http.put(`/PortalDashBoard/UpdateRequestItem`, payload);
// };

// export const GetModuleLink = (payload) => {
//   const empId = localStorage.getItem("userId");
//   return Http.put(`/PortalDashBoard/GetModuleLink?userId=${empId}`, payload);
// };

// export const DashboardMainStatistics = () => {
//   const empId = localStorage.getItem("userId");
//   return Http.get(`/PortalDashBoard/GetDashboardMainStatistics`, {
//     params: {
//       empId,
//     },
//   });
// };



// export const DashboardMdaRequestCount = () => {
//   const empId = localStorage.getItem("userId");
//   return Http.get(`/PortalDashBoard/GetDashboardMdaRequestCount`, {
//     params: {
//       empId,
//     },
//   });
// };

// // export const RequestLogs = () => {
// //   const empId = localStorage.getItem("userId");
// //   return Http.get(`/PortalDashBoard/GetRequestLogs`, {
// //     params: {
// //       empId,
// //     },
// //   });
// // };

// export const RequestLogs = (payload, querry) => {
//   return Http.put(`/dashboardstats?querry=${querry}`,payload);
// };


// export const MDALogs = (payload) => {
//   return Http.get(`/mdastaff/${payload}`,);
// };
// // export const GetTotalPayPerMDA = (payload) => {
// //   // const empId = localStorage.getItem("userId");
// //   return Http.put(`/dashboardstats`, {
// //     params: {
// //       querry,
// //     },
    
// //   }, payload);
// // };