import { gql } from 'apollo-angular';

export const LOGIN_QUERY = gql`
  query Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_EMPLOYEES_QUERY = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

export const GET_EMPLOYEE_QUERY = gql`
  query GetEmployeeById($eid: ID!) {
    getEmployeeById(eid: $eid) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

export const ADD_EMPLOYEE_MUTATION = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      id
      first_name
      last_name
      email
    }
  }
`;

export const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee($eid: ID!, $input: EmployeeInput!) {
    updateEmployeeById(eid: $eid, input: $input) {
      id
      first_name
      last_name
      email
    }
  }
`;

export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployee($eid: ID!) {
    deleteEmployeeById(eid: $eid)
  }
`;

export const SEARCH_EMPLOYEES_QUERY = gql`
  query SearchEmployees($designation: String, $department: String) {
    searchEmployeesByDesignationOrDepartment(
      designation: $designation
      department: $department
    ) {
      id
      first_name
      last_name
      email
      designation
      department
    }
  }
`;