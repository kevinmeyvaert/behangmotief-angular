import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="handleFormSubmit()" (reset)="handleReset()">
      <input
        id="search"
        type="text"
        placeholder="Search..."
        formControlName="search"
      />
      <button type="submit">Search</button>
      <button type="reset">Reset</button>
    </form>
  `,
})
export class SearchFormComponent {
  @Output() submitSearchResultEvent = new EventEmitter<string>();

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  handleFormSubmit() {
    this.submitSearchResultEvent.emit(this.searchForm.value.search ?? '');
  }

  handleReset() {
    this.submitSearchResultEvent.emit('');
  }
}
