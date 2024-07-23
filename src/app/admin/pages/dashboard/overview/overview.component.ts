import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private cate: CategoryService,
    private router: Router
  ) { }

  categoryList: any;

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.cate.listCategories().subscribe((res: any) => {
      if (res) {
        this.categoryList = res.category;
      }
    }, (err) => {
      console.log('Api error');
    });
  }
  productPage(c?: any) {
    this.router.navigateByUrl(`/admin/products/inventory/${c._id}`);
  }

}
