const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

module.exports = {
  Query: {
    async login(_, { usernameOrEmail, password }) {
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      return { user, token };
    },

    async getAllEmployees(_, __, { user }) {
      if (!user) throw new Error('Unauthorized');
      return Employee.find();
    },

    async getEmployeeById(_, { eid }, { user }) {
      if (!user) throw new Error('Unauthorized');
      return Employee.findById(eid);
    },

    async searchEmployeesByDesignationOrDepartment(
      _,
      { designation, department },
      { user }
    ) {
      if (!user) throw new Error('Unauthorized');
      const filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;
      return Employee.find(filter);
    },
  },

  Mutation: {
    async signup(_, { input }) {
      const { username, email, password } = input;

      const existing = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existing) {
        throw new Error('Username or email already exists');
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashed });

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      return { user, token };
    },

    async addEmployee(_, { input }, { user }) {
      if (!user) throw new Error('Unauthorized');
      
      const employee = await Employee.create(input);
      return employee;
    },

    async updateEmployeeById(_, { eid, input }, { user }) {
      if (!user) throw new Error('Unauthorized');
      const employee = await Employee.findByIdAndUpdate(
        eid,
        { $set: input },
        { new: true, runValidators: true }
      );
      if (!employee) throw new Error('Employee not found');
      return employee;
    },

    async deleteEmployeeById(_, { eid }, { user }) {
      if (!user) throw new Error('Unauthorized');
      const res = await Employee.findByIdAndDelete(eid);
      if (!res) throw new Error('Employee not found');
      return true;
    },
  },
};