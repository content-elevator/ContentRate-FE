import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  register(user: User) {
    const username = user.username;
    const password = user.password;
    const password_confirmation = user.password_confirmation;
    // tslint:disable-next-line:variable-name
    const first_name = user.first_name;
    // tslint:disable-next-line:variable-name
    const last_name = user.last_name;
    const email = user.email;
    console.log('registering user:' + last_name + ', ' + first_name);
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${this.baseUrl}/userApi/v1/sign_up`, {user: {email, first_name, last_name, username, password, password_confirmation}});
  }

}
