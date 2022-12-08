import axios from './Axios'

// Auth services

export const loginService = data => {
  return axios.post('login/access-token', data)
}

export const signupService = data => {
  return axios.post('register_company_admin', data)
}

export const changePasswordService = data => {
  return axios.post('change_password', data)
}

export const sendOtpService = data => {
  return axios.post('send_otp', data)
}

export const verifyOtpService = data => {
  return axios.post('verify_otp', data)
}

export const updateProfileService = data => {
  return axios.put('company_admin/update_company_admin', data)
}

// Admin dashboard service

export const dashboardService = () => {
  return axios.post('dashboard/dashboard')
}

export const viewProfileService = () => {
  return axios.post('dashboard/view_profile')
}

// Admin vehicle services

export const createVehicleService = data => {
  return axios.post('vehicle/create_vehicle', data)
}

export const listVehicleService = (data, page) => {
  return axios.post(`vehicle/list_vehicle?page=${page}&size=10`, data)
}

export const vehicleChangeStatusService = data => {
  return axios.post('vehicle/change_status', data)
}

export const deleteVehicleService = data => {
  return axios.post('vehicle/delete_vehicle', data)
}

export const updatevehicleService = data => {
  return axios.put('vehicle/update_vehicle', data)
}

export const changeVehiclePermissionService = data => {
  return axios.post('vehicle/vehicle_permissions', data)
}

export const operatorMappingListService = () => {
  return axios.post('operator/operator_dropdown')
}

export const operatorVehicleMappingService = data => {
  return axios.post('operator_vehicle_mapping/operator_vehicle_mapping', data)
}

// Admin opeartor services

export const createOperatorService = data => {
  return axios.post('operator/create_operator', data)
}

export const listOperatorService = (data, page) => {
  return axios.post(`operator/list_operator?page=${page}&size=10`, data)
}

export const changeStatusService = data => {
  return axios.post('operator/change_status', data)
}

export const deleteOperatorService = data => {
  return axios.delete(`operator/delete_operator?operator_id=${data}`)
}

export const updateOperatorService = data => {
  return axios.put('operator/update_operator', data)
}

export const changePermissionService = data => {
  return axios.post('operator/change_permission', data)
}

// Admin device services

export const listDeviceService = (data, page) => {
  return axios.post(`device/list_device?page=${page}&size=10`, data)
}

export const createDeviceService = data => {
  return axios.post('device/create_customer_device', data)
}

export const deviceMappingListService = () => {
  return axios.post('device/device_dropdown')
}

export const deleteDeviceService = data => {
  return axios.delete(`device/delete_device?device_id=${data}`)
}

// Admin charge setting service

export const listVehicleChargeService = data => {
  return axios.post('charge_setting/list_vehicle_charge', data)
}

export const createVehicleChargeService = data => {
  return axios.post('charge_setting/create_vehicle_charge', data)
}

export const deleteVehicleChargeService = delete_id => {
  return axios.delete(
    `charge_setting/delete_vehicle_charge?charge_id=${delete_id}`
  )
}

// Operator

export const addOperatorWorkReportService = data => {
  return axios.post('operator_collection/add_operator_work_report', data)
}

export const fetchCustomerDetailsService = data => {
  return axios.post('operator_collection/fetch_customer_details', data)
}

export const listCustomerWorkReportService = data => {
  return axios.post(
    `operator_collection/list_operator_collection?page=1&size=10`
  )
}
