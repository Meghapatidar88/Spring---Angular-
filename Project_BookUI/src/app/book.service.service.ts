// src/app/book.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8081/Book/";

  save(form: any) {
    return this.http.post(this.url + "save", form);
  }

  search(form: any, pageNo: number) {
    return this.http.post(this.url + "search/" + pageNo, form);
  }

  get(id: number) {
    return this.http.get(this.url + "get/" + id);
  }

  delete(id: number) {
    return this.http.get(this.url + "delete/" + id);
  }

  uploadCover(id: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(this.url + "cover/" + id, formData);
  }
}
