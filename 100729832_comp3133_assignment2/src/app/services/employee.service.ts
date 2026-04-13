import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_EMPLOYEES_QUERY,
  GET_EMPLOYEE_QUERY,
  CREATE_EMPLOYEE_MUTATION,
  UPDATE_EMPLOYEE_MUTATION,
  DELETE_EMPLOYEE_MUTATION,
  SEARCH_EMPLOYEES_QUERY
} from '../graphql/graphql.operations';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apollo: Apollo) {}

  getEmployees() {
    return this.apollo.watchQuery({
      query: GET_EMPLOYEES_QUERY
    }).valueChanges;
  }

  getEmployee(id: string) {
    return this.apollo.watchQuery({
      query: GET_EMPLOYEE_QUERY,
      variables: { id }
    }).valueChanges;
  }

  createEmployee(input: any) {
    return this.apollo.mutate({
      mutation: CREATE_EMPLOYEE_MUTATION,
      variables: { input },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }]
    });
  }

  updateEmployee(id: string, input: any) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE_MUTATION,
      variables: { id, input },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }]
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE_MUTATION,
      variables: { id },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }]
    });
  }

  searchEmployees(department?: string, position?: string) {
    return this.apollo.watchQuery({
      query: SEARCH_EMPLOYEES_QUERY,
      variables: { department, position }
    }).valueChanges;
  }
}