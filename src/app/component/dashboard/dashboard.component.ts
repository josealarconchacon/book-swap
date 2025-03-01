import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { CommonModule } from '@angular/common';

export interface BookRecommendation {
  title: string;
  author: string;
  image: string;
}

export interface CurrentlyBorrowed {
  title: string;
  author: string;
  progress: number; // Progress in percentage
  image: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, HeaderComponent, BookCardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  recommendations: BookRecommendation[] = [
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
    {
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      image: 'https://clipart-library.com/2018/book-clipart-11.png',
    },
    {
      title: 'Where the Crawdads Sing',
      author: 'Delia Owens',
      image: 'https://clipart-library.com/2018/book-clipart-11.png',
    },
  ];

  currentlyReading: CurrentlyBorrowed[] = [
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      progress: 65,
      image: 'assets/book5.jpg',
    },
  ];

  isSidebarCollapsed = false;

  onSidebarToggle(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}
