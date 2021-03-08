import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, map, take } from 'rxjs/operators';
/** Angular Materials */
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
/** Custom Classes */
import { Arrival } from '../../models/arrival';
import { SourceService } from '../../services/source.service';
import { VegetablesService } from '../../services/vegetables.service';

/** 
 * The Banner Component 
 * See {@link Arrival} and {@link VegetablesService} for details about the data
 */
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  /** array of Arrival */
  source: Arrival[];
  /** array of vegetables from VegetablesService */
  vegetables: string[];
  /** filtered data from vegetables */
  filteredVegetables: Observable<string[]>;
  /** values for get request */
  sort: string; 
  page: number; 
  perPage:number;

  /**
   *  FormBuilder, FormControl for search form
   */
  control = new FormControl();
  search = this.fb.group({
    control : this.control
  });

  /** displayedColumns and dataSource for table of Arrivals */
  displayedColumns: string[] = ['load_date','origin','to','destination','vehicle_size','distance' ];
  dataSource: MatTableDataSource<Arrival>;

  /**
   * Constructor
   * @param {FormBuilder} fb FormBuilder
   * @param {SourceService} sourceService SourceService
   * @param {VegetablesService} vegService VegetablesService
   */
  constructor(private fb: FormBuilder, 
              private sourceService: SourceService,
              private vegService: VegetablesService) { }
  
  /**
   * OnInit
   * run getVeg(), getArrivals() and inst filter
   */
  ngOnInit() {
    this.sort = 'desc'; 
    this.page = 1; 
    this.perPage = 5;
    this.getVeg();
    this.filteredVegetables = this.control.valueChanges.pipe(
      //startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      //take(5),
      map(value => this._filter(value))
    );
    this.getArrivals();
  }

  /**
   * get array of vegetables from VegetablesService
   * @returns {vegetables} array
   */
  getVeg() {
    this.vegetables = this.vegService.dataVeg();
  }

  /**
   * func for filtering data of vegetables in search form
   * source https://material.angular.io/components/autocomplete/
   */
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.vegetables.filter(vegetables => this._normalizeValue(vegetables).includes(filterValue));
  }

  /**
   * func for normalise data in search form
   * source https://material.angular.io/components/autocomplete/
   */
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  /**
   * func for show result of selection
   */
  public select(e) {
    console.log('selected', e);
  }

  /**
   * func for show result from search
   */
  searchResult(): void {
    console.log('result of search', this.search.value.control);
    this.clearForm();
  }

  /**
   * func for clear search form
   */
  clearForm() {
    this.search.setValue({control: ''});
  }

  
  /**
   * get array of arrivals from SourceService
   * @returns {dataSource}
   */
  getArrivals(){
    this.sourceService.getArrivals(this.sort, this.page, this.perPage)
      .subscribe(
        (data) => { this.source = data;
                    this.dataSource = new MatTableDataSource(this.source);
                    console.log( this.dataSource ); 
                  },
        (error) => { console.log(error) },
        () => { console.log(this.source); }
      )
  }

}
