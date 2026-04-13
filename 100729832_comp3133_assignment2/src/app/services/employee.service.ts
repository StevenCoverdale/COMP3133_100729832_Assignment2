import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_EMPLOYEES_QUERY,
  GET_EMPLOYEE_QUERY,
  ADD_EMPLOYEE_MUTATION,
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
      variables: { eid: id }
    }).valueChanges;
  }

  createEmployee(input: any) {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE_MUTATION,
      variables: { input },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }]
    });
  }

  updateEmployee(id: string, input: any) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE_MUTATION,
      variables: { eid: id, input },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }]
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE_MUTATION,
      variables: { eid: id },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }]
    });
  }

  searchEmployees(designation?: string, department?: string) {
    return this.apollo.watchQuery({
      query: SEARCH_EMPLOYEES_QUERY,
      variables: { designation, department }
    }).valueChanges;
  }
}