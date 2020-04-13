import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from 'rxjs';
import {User} from '../model/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  register(user: User) {
    const username = user.username;
    const password = user.password;
    // tslint:disable-next-line:variable-name
    const first_name = user.firstName;
    // tslint:disable-next-line:variable-name
    const last_name = user.lastName;
    const email = user.email
    return this.http.post(`${this.baseUrl}/user/register`, {username, password, profile:  {first_name, last_name, email}});
  }

}
