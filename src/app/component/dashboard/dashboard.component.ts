import { ApplicationRef, ChangeDetectorRef, Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { Book } from '../../../models/book';
import { CurrentlyBorrowed } from '../../../models/currently_borrowed';
import { AddBookComponent } from './add-book/add-book.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    HeaderComponent,
    BookCardComponent,
    CommonModule,
    AddBookComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private cdr: ChangeDetectorRef, private appRef: ApplicationRef) {}

  recommendations: Book[] = [
    {
      title: 'The Year After You',
      author: 'Nina De Pass',
      image: 'https://clipart-library.com/2018/book-clipart-11.png',
    },
    {
      title: 'The Loneliest Girl In The Universe',
      author: 'Lauren James',
      image: 'https://clipart-library.com/2018/book-clipart-11.png',
    },
  ];

  addNewBook(book: Book) {
    console.log('📘 Adding new book:', book);

    // Immutable update to prevent Angular change detection loop
    this.recommendations = [...this.recommendations, { ...book }];

    // Force Angular to detect changes properly
    this.cdr.detectChanges();
    this.appRef.tick();

    console.log('✅ Book added successfully:', this.recommendations);
  }

  currentlyReading: CurrentlyBorrowed[] = [
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      progress: 65,
      image: 'https://clipart-library.com/2018/book-clipart-11.png',
    },
  ];

  isSidebarCollapsed = false;

  onSidebarToggle(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}
