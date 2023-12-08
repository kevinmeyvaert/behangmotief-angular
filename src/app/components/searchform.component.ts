import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  styles: `
  .search {
    padding: 1rem;
    .form-field {
      width: 100%;
    }
  }
  `,
  template: `
    <form
      [formGroup]="searchForm"
      (ngSubmit)="handleFormSubmit()"
      (reset)="handleReset()"
      class="search"
    >
      <mat-form-field class="form-field">
        <mat-label>Search</mat-label>
        <input matInput type="text" formControlName="search" />
        @if (this.searchForm.value.search) {
        <button matSuffix mat-icon-button aria-label="Clear" type="reset">
          <mat-icon>close</mat-icon>
        </button>
        }
        <mat-hint>
          <strong>Find photos based on artists, venues and events</strong>
        </mat-hint>
      </mat-form-field>
    </form>
  `,
})
export class SearchFormComponent {
  @Output() submitSearchResultEvent = new EventEmitter<string>();

  searchChangesSubscription: Subscription;

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  ngOnInit() {
    this.searchChangesSubscription = this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.handleFormSubmit();
      });
  }

  ngOnDestroy() {
    this.searchChangesSubscription.unsubscribe();
  }

  handleFormSubmit() {
    this.submitSearchResultEvent.emit(this.searchForm.value.search ?? '');
  }

  handleReset() {
    this.submitSearchResultEvent.emit('');
  }
}
