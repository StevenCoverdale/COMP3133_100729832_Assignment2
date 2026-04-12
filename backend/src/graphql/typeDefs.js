const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
    created_at: Date
    updated_at: Date
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String
    created_at: Date
    updated_at: Date
  }

  type Query {
    login(usernameOrEmail: String!, password: String!): AuthPayload!
    getAllEmployees: [Employee!]!
    getEmployeeById(eid: ID!): Employee
    searchEmployeesByDesignationOrDepartment(
      designation: String
      department: String
    ): [Employee!]!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployeeById(eid: ID!, input: EmployeeInput!): Employee!
    deleteEmployeeById(eid: ID!): Boolean!
  }
`;