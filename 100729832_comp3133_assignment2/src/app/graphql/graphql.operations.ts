import { gql } from 'apollo-angular';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      id
      email
    }
  }
`;

export const GET_EMPLOYEES_QUERY = gql`
  query GetEmployees {
    employees {
      id
      firstName
      lastName
      email
      department
      position
      profilePicture
    }
  }
`;

export const GET_EMPLOYEE_QUERY = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      email
      department
      position
      profilePicture
    }
  }
`;

export const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export const SEARCH_EMPLOYEES_QUERY = gql`
  query SearchEmployees($department: String, $position: String) {
    employeesByFilter(department: $department, position: $position) {
      id
      firstName
      lastName
      email
      department
      position
    }
  }
`;