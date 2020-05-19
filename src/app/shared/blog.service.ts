import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Blog } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  selectedBlog: Blog;
  blogs: Blog[];
  readonly baseURL = 'http://localhost:3000/blogs';

  constructor(private http: HttpClient) { }

  postBlog(blog: Blog) {
    return this.http.post(this.baseURL, blog);
  }

  getBlogList() {
    return this.http.get(this.baseURL);
  }

  putBlog(blog: Blog) {
    return this.http.put(this.baseURL + `/${blog._id}`, blog);
  }

  deleteBlog(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
