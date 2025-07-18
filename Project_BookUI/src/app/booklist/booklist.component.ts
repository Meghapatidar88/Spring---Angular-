import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service.service';


@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent {

  form: any = {
  list: [],
  search: {
    title: '',
    author: ''
  },
  delete: {},
  pageNo: 0,
  message: '',
  preload: []
}

  constructor(private http: HttpClient,private service: BookService, private router: Router) { }

  ngOnInit(): void {
    this.preload();
    this.search();
  }

  previous() {
    if (this.form.pageNo > 0) {
      this.form.pageNo--;
      this.search();
    }
  }

  next() {
    this.form.pageNo++;
    this.search();
  }

  search() {
  this.service.search(this.form.search, this.form.pageNo).subscribe((res: any) => {
    this.form.list = res.result.data;
    this.form.message = res.result.message;
  });
}

  // search() {
  //   this.http.post('http://localhost:8081/Book/search/' + this.form.pageNo, this.form.search)
  //     .subscribe((res: any) => {
  //       if (res.result?.message) {
  //         this.form.message = res.result.message;
  //       } else {
  //         this.form.message = '';
  //       }
  //       this.form.list = res.data || [];
  //     });
  // }

  edit(id: number) {
    this.router.navigateByUrl('/book/' + id);
  }

  onCheckboxChange(id: number) {
    this.form.delete.id = id;
  }

  delete() {
    this.http.get('http://localhost:8081/Book/delete/' + this.form.delete.id).subscribe((res: any) => {
      this.form.message = res.result?.message || 'Deleted successfully';
      this.search();
    });
  }

  preload() {
    this.http.post('http://localhost:8081/Book/preload', this.form.search).subscribe((res: any) => {
      this.form.preload = res.result?.rolelist || [];
      this.form.list = res.result?.data || [];
    });
  }
}
