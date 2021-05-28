import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HCPProvider } from '@mhs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private http: HttpClient) {

  }
  public GetReceiptBook(empID) {
    return this.http.get('HCF/GetReceiptBook?empID=' + empID);
  }

  public InsertUpReceiptBook(data) {
    return this.http.post('HCF/InsertUpReceiptBook', data);
  }

  public GetHCProvider(_hosID: number, _accountID: any): Observable<HCPProvider> {
    return this.http.get(`HCP/GetHCProviderInfor?HosID=${_hosID}&AccountID=${_accountID}`).
      pipe(
        map((rec: Array<HCPProvider>) => {
          return rec[0]
        })
      );
  }
}