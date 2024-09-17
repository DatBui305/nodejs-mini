// employeecontroller.js
import Employee from '../models/Employee.js';
import app from '../app.js';

export const createEmployee = async (req, res) => {
  try {
    const { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId } = req.body;

    const employee = new Employee({
      employeeId,
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId
    });

    const savedEmployee = await employee.save();

    // Get the io instance from app
    const io = app.get('io');

    // Emit event to notify clients about the new employee
    io.emit('newEmployee', savedEmployee);

    return res.status(200).json({
      success: true,
      data: savedEmployee
    });
  } catch (error) {
    console.error({ success: false, error: error.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Similar changes for updateEmployee and deleteEmployee
export const updateEmployee = async (req, res) => {
  try {
    const { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId } = req.body;
    const employee = await Employee.findByIdAndUpdate(req.params.employeeId, {
      employeeId,
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId
    }, { new: true });

    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

    // Get the io instance from app
    const io = app.get('io');

    // Emit event to notify clients about the updated employee
    io.emit('updatedEmployee', employee);

    return res.json({ success: true, data: employee });
  } catch (error) {
    console.error({ success: false, error: error.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

    // Get the io instance from app
    const io = app.get('io');

    // Emit event to notify clients about the deleted employee
    io.emit('deletedEmployee', req.params.employeeId);

    return res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    console.error({ success: false, error: error.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
  

export const getEmployee = async (req, res, next) => {
    const employee = await Employee.findById(req.params.employeeId);
    return res.json({ success: true, data: employee });
};

export const getEmployees = async (req, res, next) => {
    const employees = await Employee.find();
    return res.json({ success: true, data: employees });
}

