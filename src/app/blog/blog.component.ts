import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blog.service';
import { NgForm } from '@angular/forms';
import { Blog } from '../shared/blog.model';

declare var M: any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {

  constructor(public blogService: BlogService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshBlogList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.blogService.selectedBlog = {
      _id: "",
      title: "",
      title_desc: "",
      body: "",
      createdBy: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.blogService.postBlog(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshBlogList();
        window.location.reload();
        M.toast({ html: 'Posted successfully', classes: 'rounded' });
      });
    }
    else {
      this.blogService.putBlog(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshBlogList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshBlogList() {
    this.blogService.getBlogList().subscribe((res) => {
      this.blogService.blogs = res as Blog[];
    });
  }

  onEdit(blog: Blog) {
    this.blogService.selectedBlog = blog;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.blogService.deleteBlog(_id).subscribe((res) => {
        this.refreshBlogList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
}
