import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  form: any = {
    id: null,
    title: '',
    author: '',
    price: '',
    publisher: '',
    message: ''
  };

  fileToUpload: any = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.form.id = params['id'];
      if (this.form.id) {
        this.display();
      }
    });
  }

  ngOnInit(): void {}

  display() {
    this.http.get(`http://localhost:8081/Book/get/${this.form.id}`).subscribe((res: any) => {
      this.form = res.data || {};
      this.form.message = '';
    });
  }

  save() {
    this.http.post('http://localhost:8081/Book/save', this.form).subscribe((res: any) => {
      this.form.message = res.result?.message || 'Saved successfully';
      if (this.fileToUpload) {
        this.uploadFile();
      }
    });
  }

  onFileSelect(event: any) {
    this.fileToUpload = event.target.files.item(0);
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);

    this.http.post(`http://localhost:8081/Book/uploadCover/${this.form.id}`, formData).subscribe(
      (res: any) => {
        console.log('File uploaded:', res);
      },
      error => {
        console.error('Upload failed', error);
      }
    );
  }
}
