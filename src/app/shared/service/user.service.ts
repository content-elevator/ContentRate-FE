import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {  }

  register(user: User) {
    const username = user.username;
    const password = user.password;
    const password_confirmation = user.password_confirmation;
    // tslint:disable-next-line:variable-name
    const first_name = user.first_name;
    // tslint:disable-next-line:variable-name
    const last_name = user.last_name;
    const email = user.email;

    // tslint:disable-next-line:max-line-length
    return this.http.post(`${this.baseUrl}/userApi/v1/sign_up`, {user: {email, first_name, last_name, username, password, password_confirmation}});
  }

  update(user: User) {
    const username = user.username;
    // const password = user.password;
    // const password_confirmation = user.password_confirmation;
    // tslint:disable-next-line:variable-name
    const first_name = user.first_name;
    // tslint:disable-next-line:variable-name
    const last_name = user.last_name;
    const email = user.email;

    return this.http.put(`${this.baseUrl}/userApi/v1/update`,
      {user: {email, first_name, last_name, username}});
  }

  // tslint:disable-next-line:variable-name
  updatePassword(old_password: string, password: string, password_confirmation: string) {
    return this.http.put(`${this.baseUrl}/userApi/v1/update/password`,
      {old_password, user: {password, password_confirmation}});
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/userApi/v1/my_user`);
  }

  deleteUser() {
    return this.http.delete(`${this.baseUrl}/userApi/v1/delete`);
  }

}
